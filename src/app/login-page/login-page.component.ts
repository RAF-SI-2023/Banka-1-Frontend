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
import { AdminStatusService } from '../service/admin-status.service';
import { AdminGuard } from '../guards/admin.guard';




@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  model: any = {};
  showErrorModal: boolean = false;

  constructor(
    private authService: AuthService,
    private adminGuard:AdminGuard,
    private adminSatusService:AdminStatusService,
    public dialog: MatDialog,
    private validator: ValidationService,
    private popupService: PopupService,
    private router: Router,
  ) {
    // const jwt = sessionStorage.getItem("jwt");
    //
    // if (jwt !== null && jwt.length > 0) {
    //   this.router.navigate(['/welcome']);
    // }
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
    // if (!emailRegex.test(email)) {
    //   this.popupService.openPopup("Error", "Invalid email format")
    //   return;
    // }

    this.authService.login(this.model.email, this.model.password).subscribe(
      (token) => {
        // Koristimo ovaj pristup da bi mogao da saceka jwt od beka pa da apdejtuje inicijale
        this.authService.setJwt(token.jwt)
        sessionStorage.setItem('permissions', token.permissions);
        this.adminGuard.userIsAdmin().subscribe(
          (isAdmin) => {
            this.adminSatusService.setIsAdmin(isAdmin);
            this.router.navigate(['/welcome']);
          },
          (error) => {
            console.error("Error occurred while checking admin status:", error);
            this.adminSatusService.setIsAdmin(false);
          });
      },
      error => {
        this.popupService.openPopup("Error", "Wrong email or password")
      });
  }
}
