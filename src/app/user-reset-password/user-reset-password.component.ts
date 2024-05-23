import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {PopupService} from "../service/popup.service";
import {environment} from "../../../environment";
import {FormsModule} from "@angular/forms";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-user-reset-password',
  standalone: true,
  imports: [
    FormsModule,
    NgOptimizedImage
  ],
  templateUrl: './user-reset-password.component.html',
  styleUrl: './user-reset-password.component.css'
})
export class UserResetPasswordComponent {
  private route = inject(ActivatedRoute);
  passVisible: boolean = false;
  password: string = '';
  confirmedPassword: string = '';
  token: string = '';


  constructor(
    private http: HttpClient,
    private router: Router,
    private popupService: PopupService
  ) {
    this.token = this.route.snapshot.paramMap.get('token') || '';
  }

  async sendToLogin() {
    await this.router.navigate(['/login']);
  }

  confirmPassword() {
    if(this.password.length < 3 || this.confirmedPassword.length < 3) {
      this.popupService.openPopup("Error", "Password has to be longer than 3 characters!");
    } else {
      if (this.password === this.confirmedPassword) {

        var url;
        if(this.router.url.includes('employee'))
          url = `${environment.baseUrl}/employee/newpassword/${this.token}`;
        else
          url = `${environment.baseUrl}/customer/newpassword/${this.token}`;

        const body = { password: this.password };

        this.http.post<{ userId: number }>(url, body).subscribe({
          next: (response) => {
            this.router.navigate(['/login']);
          },
          error: (error) => {
            this.popupService.openPopup("Error", "Activation failed!");
          }
        });
      } else {
        this.popupService.openPopup("Error", "Passwords do not match!");
      }
    }
  }
}
