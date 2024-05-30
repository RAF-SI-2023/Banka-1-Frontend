import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {CreateOrderRequest, ListingType, OptionsDto, OrderType, User} from "../model/model";
import {environment} from "../../../environment";
import {number} from "zod";

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  constructor(private http: HttpClient) { }

  getOptions(): Observable<OptionsDto[]> {
    const jwt = sessionStorage.getItem("jwt");

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${jwt}`
      })
    };

    return this.http.get<OptionsDto[]>(environment.baseUrl + '/listing/get/options', httpOptions);
  }
}
