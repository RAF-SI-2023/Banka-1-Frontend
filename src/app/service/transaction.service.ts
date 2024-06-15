import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,  HttpParams} from "@angular/common/http";
import {
  BankAccount,
  Customer,
  NewTransactionDto,
  TransactionBasics,
  TransactionDetails,
  TransactionDto,
  User
} from '../model/model';

import {Router} from "@angular/router";
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private transationBasics: TransactionBasics | undefined;
  private transactionDetails: TransactionDetails|undefined;
  private user: Customer|undefined;

  constructor( private http: HttpClient, private router: Router) { }

  private apiUrl = environment.userService;



  public setTransactionBasics(transationBasics: TransactionBasics): void {
    this.transationBasics = transationBasics;
    console.log('Transaction basics: ', this.transationBasics);
  }
  public setTranscationUser(transactionUser:Customer):void{
    this.user=transactionUser;
    console.log("Transaction user: ", this.user)
  }

  public setTransactionDetails(transactionDetails: TransactionDetails): void {
    this.transactionDetails = transactionDetails;
    console.log('Transaction details: ', this.transactionDetails);
  }

  public getTransactionDetails():TransactionDetails|undefined{
    return this.transactionDetails
  }

  public getTransactionBasics(): TransactionBasics | undefined {
    return this.transationBasics;
  }

  public getTransactionUser(): Customer | undefined {
    console.log(this.user);
    return this.user;
  }

  createTransaction(transactionBasics: TransactionBasics): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });

    return this.http.post(`${this.apiUrl}/transfer`, transactionBasics, { headers, responseType: 'text' });
  }

  getCardTransactions(cardNum: string | undefined): Observable<TransactionDto[]> {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });

    const options = {headers: headers};

    let url = environment.userService + `/transaction/getCardTransactions/${cardNum}`;

    return this.http.get<TransactionDto[]>(url, options);
  }

  printTransaction(transactionDetails:TransactionDetails):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });
    return this.http.post<any>(`${this.apiUrl}/transaction/printTransaction`, transactionDetails, { headers });
  }

  getAccountTransactions(accountNumber: string): Observable<NewTransactionDto[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });
    return this.http.get<NewTransactionDto[]>(`${this.apiUrl}/transactions/${accountNumber}`, { headers });
  }





}
