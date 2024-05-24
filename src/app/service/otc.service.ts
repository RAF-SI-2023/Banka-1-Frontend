import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {firstValueFrom, Observable} from "rxjs";
import {environment} from "../../../environment";
import {Contract} from "../model/model";

@Injectable({
  providedIn: 'root'
})
export class OtcService {
  private apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  async getAllContracts() {
    const jwt = sessionStorage.getItem("jwt");

    if(!jwt) return [];

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });

    let resp;
    try {
      resp = (await firstValueFrom(
        this.http.get(environment.baseUrl + "/contract/supervisor/getAllContracts", {headers})
      )) as Contract[];
    } catch (e) {
      return [];
    }
    return resp;
  }

  public denyOTC(contractId: number): Observable<boolean> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });

    const jsonData = {
      message: "Admin denied this contract."
    };

    return this.http.post<boolean>(`${this.apiUrl}/contract/deny/${contractId}`, jsonData, {headers});
  }

  public approveOTC(contractId: number): Observable<boolean> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });

    return this.http.post<boolean>(`${this.apiUrl}/contract/approve/${contractId}`, {headers});
  }

}
