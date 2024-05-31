import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import {Account, BankAccountDto} from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor( private http: HttpClient, private router: Router) { }

  private apiUrl = environment.userService;


  getCustomerAccounts(customerId: number): Observable<Account[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });

    return this.http.get<Account[]>(`${this.apiUrl}/account/getCustomer/${customerId}`, { headers });
  }

  getAccount(accountNumber: string){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });
    return this.http.get<BankAccountDto>(`${this.apiUrl}/account/${accountNumber}`, { headers });

  }

}
