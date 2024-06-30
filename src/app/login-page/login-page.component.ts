import {Component, ViewChild} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from "../service/auth.service";
import { HttpClientModule } from '@angular/common/http';
import {PopupService} from "../service/popup.service";
import {PopupComponent} from "../popup/popup.component";
import {z} from "zod";
import {ValidationService} from "../service/validation.service";
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { UserService } from '../service/employee.service';
import { StorageService } from '../service/storage.service';
import {TransparentTextFieldModule} from "../welcome/redesign/TransparentTextField";
import {OrangeButtonModule} from "../welcome/redesign/OrangeButton";
import {NgIf} from "@angular/common";
import { CustomerService } from '../service/customer.service';
import errorMap from 'zod/lib/locales/en';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    TransparentTextFieldModule,
    OrangeButtonModule,
    NgIf
  ],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  isEmployee: boolean = false; // Initially set to 'true' to show "Employee"

  toggleRole() {
    this.isEmployee = !this.isEmployee; // Toggle between true and false
    console.log(this.isEmployee ? "employee page" :"customer page")
    sessionStorage.setItem('loginUserRole',this.isEmployee ? "employee" :"customer")
  }

  model: any = {};
  showErrorModal: boolean = false;

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private validator: ValidationService,
    private popupService: PopupService,
    private router: Router,
    private userService: UserService,
    private storageService: StorageService,
    private customerService: CustomerService,
  ) {
    sessionStorage.setItem('loginUserRole',"customer")
  }
  loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string()
  })



  onSubmit() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple regex for email validation
    if (!this.model.email || !this.model.password) {
      this.popupService.openPopup("Error", "Fields can't be empty")
      return;
    }


    if(this.isEmployee) {

      this.authService.loginEmployee(this.model.email, this.model.password).subscribe(
        (token) => {

          // Koristimo ovaj pristup da bi mogao da saceka jwt od beka pa da apdejtuje inicijale
          this.authService.setJwt(token.jwt)
          sessionStorage.setItem('jwt', token.jwt);
          sessionStorage.setItem('permissions', token.permissions);

          if (token.jwt !== null && token.jwt.length > 0) {
            this.userService.getEmployee(token.jwt).subscribe(
             response => {
               this.storageService.setRole(response.position.toString().toLowerCase());
               sessionStorage.setItem('loggedUserID', response.userId.toString());
               this.router.navigate(['/welcome']);
                console.log(response.position);
             }
           );
          }

        },
        error => {
          this.popupService.openPopup("Error", "Wrong email or password")
        });

      sessionStorage.setItem('isLegalPerson', String(false));

    } else {

      this.authService.loginCustomer(this.model.email, this.model.password).subscribe(
        (token) => {

          // Koristimo ovaj pristup da bi mogao da saceka jwt od beka pa da apdejtuje inicijale
          this.authService.setJwt(token.jwt)
          sessionStorage.setItem('jwt', token.jwt);
          sessionStorage.setItem('permissions', token.permissions);

          if (token.jwt !== null && token.jwt.length > 0) {
            this.customerService.getCustomer(token.jwt).subscribe(
             response => {
               this.storageService.setRole('customer');
               sessionStorage.setItem('loggedUserID', response.userId.toString());
               this.router.navigate(['/welcome']);

               sessionStorage.setItem('isLegalPerson', String(response.isLegalEntity));
               sessionStorage.setItem('legalPersonCompany', String(response.company));
               console.log(response.isLegalEntity.toString() + " DDDD")

             },
             error =>{
              console.log("Greska")
             }
           );
          } else {
            // sessionStorage.setItem('isLegalPerson', String(false));
          }

        },
        error => {
          this.popupService.openPopup("Error", "Wrong email or password")
        });
    }

  }



  navigateToResetPassword() {
    var pom = "";
    if(this.isEmployee)
      pom="employee"
    else
      pom="customer"
    this.router.navigate(['/reset-password/'+pom]);
  }

  navigateToActivateAccount() {
    this.router.navigate(['/activate-account']);
  }
}
