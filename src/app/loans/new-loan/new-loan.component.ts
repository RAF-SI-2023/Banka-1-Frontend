import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {LoanType} from "../../model/model";
import {NgForOf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-loans',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './new-loan.component.html',
  styleUrl: './new-loan.component.css'
})
export class NewLoanComponent {

  readonly loanTypes = Object.values(LoanType);
  loanForm= new FormGroup({
    loanType: new FormControl('PERSONAL'),
    loanPurpose: new FormControl(''),
    // Monthly Income Currency isn't connected at the moment, because it's not on FE spec
    monthlyIncomeAmount: new FormControl(''),
    // Credit bureau Approval isn't connected at the moment, because it's not on BE request
    branchOffice: new FormControl(''),
    permanentEmployee: new FormControl(false),
    employmentPeriodYears: new FormControl(0),
    employmentPeriodMonths: new FormControl(0),
    loanTerm: new FormControl(12),
    phoneNumber: new FormControl(''),
    accountNumber: new FormControl('')
  });

  constructor(protected http: HttpClient) {
  }

  submit() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });
    let requestBody = this.getRequestBody()
    this.http.post(environment.marketService + '/loan/requests', requestBody, {headers}).subscribe(res => {
      console.log(res);
      }
    );
  }

  getRequestBody() {
    let form = this.loanForm.value as any;
    form.employmentPeriod = 12 * form.employmentPeriodYears + form.employmentPeriodMonths;
    delete form.employmentPeriodMonths;
    delete form.employmentPeriodYears;
    return form;
  }
}
