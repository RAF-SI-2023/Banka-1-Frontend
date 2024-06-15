import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../model/model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private httpClient: HttpClient) { }

  getUsersCardsMocked(userId: number): Observable<Card[]> {
    return this.httpClient.get<Card[]>('/assets/cards-mocked.json');
  }

  getUsersCards(userId: number): Observable<Card[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });
    console.log(headers);

    const options = { headers: headers };
    let url = environment.userService + `/account/getAllCards/${userId}`;

    return this.httpClient.get<Card[]>(url, options);
  }

  getAllCards(userId: number): Observable<Card[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });

    const options = { headers: headers };
    let url = environment.userService + `/account/getAllCards/${userId}`;

    return this.httpClient.get<Card[]>(url, options);
  }

}
