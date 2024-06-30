import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {firstValueFrom, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import { MyStockDto, MakeOfferDto,OtherBankStocks, ReceivedOffersDto, SendOffersDto } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class MultiOtcService {

  constructor(private httpClient: HttpClient) { }

  //Get all my stocks
  public getAllMyStocks(): Observable<MyStockDto[]> {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });
    console.log(headers);

    const options = { headers: headers };
    let url = environment.userService + `/api/v1/otcTrade/getOurStocks`;

    return this.httpClient.get<MyStockDto[]>(url, options); 
  }

  //Get all other bank stocks
  public getAllOtherBankStocks(): Observable<OtherBankStocks[]> {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });
    console.log(headers);

    const options = { headers: headers };
    let url = environment.userService + `/api/v1/otcTrade/getBanksStock`;

    return this.httpClient.get<OtherBankStocks[]>(url, options); 
  }

  //Make offer
  public makeOffer(makeOffer: MakeOfferDto): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });

    return this.httpClient.post(environment.userService + '/api/v1/otcTrade/makeOffer', {
      ticker: makeOffer.ticker,
      amount: makeOffer.amount,
      price: makeOffer.price
    },{
      headers: headers
    });
  }

  //Get received offers
  public getAllReceivedOffers(): Observable<ReceivedOffersDto[]> {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });
    console.log(headers);

    const options = { headers: headers };
    let url = environment.userService + `/api/v1/otcTrade/getOffers`;

    return this.httpClient.get<ReceivedOffersDto[]>(url, options); 
  }

  //Get send offers
  public getAllSendOffers(): Observable<SendOffersDto[]> {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });
    console.log(headers);

    const options = { headers: headers };
    let url = environment.userService + `/api/v1/otcTrade/getMyOffers`;

    return this.httpClient.get<SendOffersDto[]>(url, options); 
  }

}
