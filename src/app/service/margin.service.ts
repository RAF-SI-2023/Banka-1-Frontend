import { Injectable } from '@angular/core';
import {ExchangeRate, Margin, MarginTransactionDetails} from "../model/model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {firstValueFrom, Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MarginService {
  private apiUrl = environment.userService;

  constructor(private httpClient: HttpClient) { }

  getAllMargins(): Observable<Margin[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });
    console.log(headers);

    const options = { headers: headers };
    let url = environment.userService + `/margin/all`;

    return this.httpClient.get<Margin[]>(url, options);
  }

  getCustomerMargins(): Observable<Margin[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });
    console.log(headers);

    const options = { headers: headers };
    let url = environment.userService + `/margin/all`;

    return this.httpClient.get<Margin[]>(url, options);
  }

  depositMoney(margin: Margin, marginCall: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });

    return this.httpClient.put<boolean>(`${this.apiUrl}/margin/deposit/${margin.id}`, marginCall, {headers});
  }

  getAllMarginTransactions(id: number): Observable<MarginTransactionDetails[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });
    console.log(headers);

    const options = { headers: headers };
    let url = environment.userService + `/margin/transaction/${id}`;

    return this.httpClient.get<MarginTransactionDetails[]>(url, options);
  }

}
