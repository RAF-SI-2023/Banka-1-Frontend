import {Component, inject, ViewEncapsulation} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";
import {environment} from "../../environments/environment";
import {HttpHeaders, HttpParams} from "@angular/common/http";
import { HttpClient } from '@angular/common/http';
import {PopupService} from "../service/popup.service";


@Component({
  selector: 'app-set-password',
  standalone: true,
  imports: [
    FormsModule,
    NgOptimizedImage
  ],
  templateUrl: './set-password.component.html',
  styleUrl: './set-password.component.css',
  encapsulation: ViewEncapsulation.None
})
export class SetPasswordComponent {
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

  async sendToWelcome() {
    await this.router.navigate(['/login']);
  }

  confirmPassword() {
    if(this.password.length < 3 || this.confirmedPassword.length < 3) {
      this.popupService.openPopup("Error", "Password has to be longer than 3 characters!");
    } else {
      if (this.password === this.confirmedPassword) {
        var url;
        if(this.router.url.includes('employee'))
          url = `${environment.userService}/employee/activate/${this.token}`;
        else
          url = `${environment.userService}/customer/activate/${this.token}`;

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
