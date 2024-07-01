import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {ExchangeTransactionReport, TransfersReportDto} from "../model/model";

@Injectable({
  providedIn: 'root'
})
export class ExchangeTransactionReportService {

  private apiUrl = environment.userService;

  constructor(private http: HttpClient) { }

  async getAllExchangeTransactionReports(): Promise<TransfersReportDto> {
    const jwt = sessionStorage.getItem("jwt");
  
    if (!jwt) return { profit: 0, transfers: [] };
  
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt
    });
  
    let resp;
    try {
      resp = await firstValueFrom(
        this.http.get<TransfersReportDto>(environment.userService + "/transfer/transferReport", { headers })
      );
    } catch (e) {
      return { profit: 0, transfers: [] };
    }
    return resp;
  }
 
}
