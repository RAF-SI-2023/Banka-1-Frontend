import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {firstValueFrom, Observable} from "rxjs";
import {Forex, ListingHistory, OptionsDto} from "../model/model";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForexService {

  constructor(private http: HttpClient) { }

  async getForexHistory(forexId: number, from: number | null = null, to: number | null = null) {
    const jwt = sessionStorage.getItem("jwt");

    if(!jwt) return [];

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });

    let query = "?";

    if(from !== null) {
      query += "timestampFrom=" + from;
    }

    if(to !== null) {
      if(query.length > 1) query += "&"
      query += "timestampTo=" + to;
    }

    let resp;

    try {
      resp = (await firstValueFrom(

        this.http.get(environment.marketService + `/market/listing/history/forex/${forexId}` + query, {headers})
      )) as ListingHistory[];
    } catch (e) {
      return [];
    }
    return resp;
  }

  async getForexById(forexId: number) : Promise<Forex | null>{
    const jwt = sessionStorage.getItem("jwt");

    if(!jwt) return null;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });
    let resp;
    try {
      resp = (await firstValueFrom(
        this.http.get(environment.marketService + `/market/listing/forex/${forexId}`, {headers})
      )) as Forex;
    } catch (e) {
      return null;
    }

    return resp;

  }

  getForexes(): Observable<Forex[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });

    return this.http.get<Forex[]>(environment.marketService + '/market/listing/get/forex', {headers});
  }
}
