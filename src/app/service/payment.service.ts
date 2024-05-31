import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BankAccount, CreatePaymentRequest } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  
  private apiUrl = environment.userService+"/payment"; // Set your API endpoint here

  private selectedBankAccount: BankAccount|undefined;
  
  constructor(private http: HttpClient) { }

  public createPayment(payment: CreatePaymentRequest) {
    return this.http.post<number>(`${this.apiUrl}`, payment,{
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
      }
    });
  }

  public initializePayment() {
    return this.http.post<number>(`${this.apiUrl}/sendCode`, null, {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
      }
    });  
  }

  public setSelectedBankAccount(bankAccount: BankAccount|undefined) {
    this.selectedBankAccount = bankAccount;
  }

  public getSelectedBankAccount(): BankAccount|undefined {
    return this.selectedBankAccount;
  }
}
