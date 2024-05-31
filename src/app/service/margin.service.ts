import { Injectable } from '@angular/core';
import {Margin} from "../model/model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MarginService {
  private apiUrl = environment.userService;

  constructor(private http: HttpClient) { }

  // TODO: Implement the following methods
  depositMoney(margin: Margin, marginCall: number) {
    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    // });
    //
    // const jsonData = {
    //   marginCall: marginCall
    // };
    //
    // return this.http.put<boolean>(`${this.apiUrl}/contract/deny/${margin.marginAccount}`, jsonData, {headers});
  }

  async getAllMargins(): Promise<Margin[]> {
    const jwt = sessionStorage.getItem("jwt");

    if(!jwt) return [];

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });

    let resp;
    try {
      resp = (await firstValueFrom(
        this.http.get(environment.userService + "/", {headers})
      )) as Margin[];
    } catch (e) {
      return [];
    }
    return resp;
  }
}
