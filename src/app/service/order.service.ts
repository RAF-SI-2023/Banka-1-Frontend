import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {firstValueFrom, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {StockListing} from "./stock.service";

import {
  CapitalProfitDto,
  DecideOrderResponse,
  OrderDto,
  SellingRequest,
  StatusRequest
} from "../model/model";

import {BankAccountDto, CreateOrderRequest, ListingType, Order, OrderType, User} from "../model/model";
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }




  fetchUserForLimit(id: string): Observable<User> {
    const jwt = sessionStorage.getItem("jwt");

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${jwt}`
      })
    };
    return this.http.get<User>(environment.userService + '/employee/' + id, httpOptions);
  }



  async getOrderHistory() {

    const jwt = sessionStorage.getItem("jwt");

    if(!jwt) return [];

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });

    let resp;
    try {
      resp = (await firstValueFrom(
        this.http.get(environment.userService + "/orders/getAll", {headers})
      )) as OrderDto[];
    } catch (e) {
      return [];
    }
    return resp;
  }
  async getAllOrdersHistory() {
    const jwt = sessionStorage.getItem("jwt");

    if(!jwt) return [];

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });

    let resp;
    try {
      resp = (await firstValueFrom(
        this.http.get(environment.userService + "/orders/supervisor/getAll", {headers})
      )) as OrderDto[];
    } catch (e) {
      return [];
    }
    return resp;
  }

  async getOrdersHistory() {
    const jwt = sessionStorage.getItem("jwt");

    if(!jwt) return [];

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });

    let resp;
    try {
      resp = (await firstValueFrom(
        this.http.get(environment.userService + "/orders/getAll", {headers})
      )) as OrderDto[];
    } catch (e) {
      return [];
    }
    return resp;
  }

  async getOrderRequests() {
    const jwt = sessionStorage.getItem("jwt");

    if(!jwt) return [];

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });

    let resp;
    try {
      resp = (await firstValueFrom(
        this.http.get("/assets/orderRequests.json")
      )) as OrderDto[];
    } catch (e) {
      return [];
    }
    return resp;
  }

  async getOrderSecurities() {
    const jwt = sessionStorage.getItem("jwt");

    if(!jwt) return [];

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });

    let resp;
    try {
      resp = (await firstValueFrom(
        this.http.get("/assets/orderSecurities.json")
      )) as OrderDto[];
    } catch (e) {
      return [];
    }
    return resp;
  }

  async approveOrder(orderId: number, request: StatusRequest): Promise<DecideOrderResponse> {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });


    try {
      return await firstValueFrom(
        this.http.put<DecideOrderResponse>(environment.userService + '/orders/decideOrder/' + orderId, {"status": "APPROVED"}, { headers })
      );
    } catch (error) {
      console.error('Error while approving order:', error);
      throw error;
    }
  }

  async denyOrder(orderId: number, request: StatusRequest): Promise<DecideOrderResponse>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });

    try {
      return await firstValueFrom(
        this.http.put<DecideOrderResponse>(environment.userService + '/orders/decideOrder/' + orderId, {"status": "DENIED"}, { headers })
      );
    } catch (error) {
      console.error('Error while denying order:', error);
      throw error;
    }

  }

  decideOrder(orderId: number, request: StatusRequest){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });

    return this.http.put<DecideOrderResponse>(environment.userService + '/orders/decideOrder/' + orderId, {"status": request}, {headers});
  }

  async buyOrder(orderType: OrderType, listingId: string, listingType: ListingType, contractSize: number, limitValue: number, stopValue: number, allOrNone: boolean) {
    const jwt = sessionStorage.getItem("jwt");

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${jwt}`
      })
    };

    const orderRequest: CreateOrderRequest = {
      orderType: orderType,
      listingId: listingId,
      listingType: listingType,
      contractSize: contractSize,
      limitValue: limitValue,
      stopValue: stopValue,
      allOrNone: allOrNone
    };
    console.log(orderRequest);

    try {
      const response = await this.http.post<boolean>(
        environment.userService + '/orders', orderRequest, httpOptions).toPromise();
      return response;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async sellOrder(orderType: OrderType, listingId: string, listingType: ListingType, contractSize: number, limitValue: number, stopValue: number, allOrNone: boolean) {
    const jwt = sessionStorage.getItem("jwt");

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${jwt}`
      })
    };

    const orderRequest: CreateOrderRequest = {
      orderType: orderType,
      listingId: listingId,
      listingType: listingType,
      contractSize: contractSize,
      limitValue: limitValue,
      stopValue: stopValue,
      allOrNone: allOrNone
    };
    console.log(orderRequest);

    try {
      const response = await this.http.post<boolean>(
        environment.userService + '/orders', orderRequest, httpOptions).toPromise();
      return response;
    } catch (error) {
      console.error(error);
      return false;
    }
  }



  getSecurityOrdersMock(): Observable<CapitalProfitDto[]> {
    return this.http.get<CapitalProfitDto[]>('assets/mocked_banking_data/orders-security-mocked.json')
      .pipe(
        map((data: CapitalProfitDto[]) => data.map(item => ({
          ...item,
          listingType: ListingType[item.listingType as keyof typeof ListingType] // Assuming listingType in JSON is a string that matches enum keys
        })))
      );
  }

  getSecurityOrders(): Observable<CapitalProfitDto[]> {
    const jwt = sessionStorage.getItem("jwt");

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${jwt}`
      })
    };

    return this.http.get<CapitalProfitDto[]>(environment.userService + '/account/capitals/listings', httpOptions)
      .pipe(
        map((data: CapitalProfitDto[]) => data.map(item => ({
          ...item,
          listingType: ListingType[item.listingType as keyof typeof ListingType] // Assuming listingType in JSON is a string that matches enum keys
        })))
      );
  }


  getPublicSecuritiesMock(): Observable<any> {
    const jwt = sessionStorage.getItem("jwt");

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${jwt}`
      })
    };
    return this.http.get<User>(environment.userService + '/publicSecurities', httpOptions);
  }

  changePublicValueMock(id: number, publicValue: number): Observable<any> {
    const jwt = sessionStorage.getItem("jwt");

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${jwt}`
      })
    };

    const body = {
      publicValue: publicValue
    }
    return this.http.put<User>(environment.userService + '/changePublicValue/' + id , body, httpOptions);
  }




}
