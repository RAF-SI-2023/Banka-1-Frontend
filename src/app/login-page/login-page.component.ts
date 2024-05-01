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
    // if (!emailRegex.test(this.model.email)) {
    //   this.popupService.openPopup("Error", "Invalid email format")
    //   return;
    // }

    if(this.isEmployee) {
      // Ruta auth/login/emplyee POST
      // kada se uloguje zaposleni u session storage se stavlja pod 'role' pozicija koja je dobijena u objektu
      this.authService.loginEmployee(this.model.email, this.model.password).subscribe(
        (token) => {

          // Koristimo ovaj pristup da bi mogao da saceka jwt od beka pa da apdejtuje inicijale
          this.authService.setJwt(token.jwt)
          sessionStorage.setItem('jwt', token.jwt);
          sessionStorage.setItem('permissions', token.permissions);

          if (token.jwt !== null && token.jwt.length > 0) {
            this.userService.getEmployee(token.jwt).subscribe(
             response => {
                //this.userInitials = response.firstName.charAt(0) + response.lastName.charAt(0);
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
    } else {
      // Ruta auth/login/customer POST
      // kada se uloguje costumer u session storage se stavlja pod 'role' customer
      console.log("USAO")
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
                console.log('customer');

             },
             error =>{
              console.log("Greska")
             }
           );
          }

        },
        error => {
          this.popupService.openPopup("Error", "Wrong email or password")
        });
    }
        // this.authService.login(this.model.email, this.model.password).subscribe(
        //   (token) => {

        //     // Koristimo ovaj pristup da bi mogao da saceka jwt od beka pa da apdejtuje inicijale
        //     this.authService.setJwt(token.jwt)
        //     sessionStorage.setItem('jwt', token.jwt);
        //     sessionStorage.setItem('permissions', token.permissions);
        //     this.setUserPropertiesInSessionStorage(token.jwt);

        //     if (token.jwt !== null && token.jwt.length > 0) {
        //       this.userService.getUser(token.jwt).subscribe(
        //        response => {
        //           //this.userInitials = response.firstName.charAt(0) + response.lastName.charAt(0);
        //          this.storageService.setRole(response.position.toString().toLowerCase());
        //          this.router.navigate(['/welcome']);
        //           console.log(response.position);
        //        }
        //      );
        //     }

        //   },
        //   error => {
        //     this.popupService.openPopup("Error", "Wrong email or password")
        //   });

  }



  navigateToResetPassword() {
    var pom = "";
    if(this.isEmployee)
      pom="employee"
    else
      pom="customer"
    this.router.navigate(['/reset-password/'+pom]);
  }
  //activate-account

  navigateToActivateAccount() {
    this.router.navigate(['/activate-account']);
  }
}
