import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {ExchangeTransactionReport} from "../model/model";

@Injectable({
  providedIn: 'root'
})
export class ExchangeTransactionReportService {

  private apiUrl = environment.userService;

  constructor(private http: HttpClient) { }

  async getAllExchangeTransactionReports(): Promise<ExchangeTransactionReport[]> {
    const jwt = sessionStorage.getItem("jwt");

    if(!jwt) return [];

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });

    let resp;
    try {
      resp = (await firstValueFrom(
        this.http.get(environment.userService + "/", {headers})
      )) as ExchangeTransactionReport[];
    } catch (e) {
      return [];
    }
    return resp;
  }

}
