import { Component, inject } from '@angular/core';
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {PopupService} from "../service/popup.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  private route = inject(ActivatedRoute);
  emailSent: boolean = false;
  email: string = ''; // Add a property for the email
  position: string = '';
  constructor(
    private http: HttpClient,
    private popupService: PopupService,
    private router: Router
  ) {
    this.position = this.route.snapshot.paramMap.get('position') || '';
  }

  sendEmail(): void {
    const trimmedEmail = this.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple regex for email validation

    if (!trimmedEmail) {
      this.popupService.openPopup("Error", "Email field is empty");
      return;
    }

    if (!emailRegex.test(trimmedEmail)) {
      this.popupService.openPopup("Error", "Invalid email format");
      return;
    }

    console.log("Send email button pressed with email:", this.email);

    var url;
    if(this.position==='customer')
     url = `${environment.userService}/customer/reset/${(trimmedEmail)}`; // Use encodeURIComponent to ensure the email is properly encoded in the URL
    else
    url = `${environment.userService}/employee/reset/${encodeURIComponent(trimmedEmail)}`; // Use encodeURIComponent to ensure the email is properly encoded in the URL
   

    this.http.post(url, {}).subscribe({
      next: (response) => {
        if(response == false){
          this.popupService.openPopup("Error", "Account with email doesn't exist");
        } else {
          this.emailSent = true;
        }
      },
      error: (error) => {
        console.error("Failed to send email reset request:", error);
        this.popupService.openPopup("Error", "Failed to send email reset request");
      }
    });
  }

  okAction() {
    this.router.navigate(['/login']);
  }

  async sendToLogin() {
    await this.router.navigate(['/login']);
  }
}
