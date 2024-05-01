import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {firstValueFrom, Observable} from "rxjs";
import {environment, environmentMarket} from "../../../environment";
import {StockListing} from "./stock.service";

import {CapitalProfitDto, DecideOrderResponse, OrderDto, SellingRequest, StatusRequest} from "../model/model";

import {BankAccountDto, CreateOrderRequest, ListingType, Order, OrderType, User} from "../model/model";
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }


//   async getAllOrdersHistory() {

  // fetchAccountData(id: string): Observable<number> {
  //   const jwt = sessionStorage.getItem("jwt");
  //
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Authorization': `Bearer ${jwt}`
  //     })
  //   };
  //   return this.http.get<BankAccountDto[]>(environment.baseUrl + '/account/getCustomer/' + id, httpOptions).pipe(
  //     map(accounts => accounts.reduce((sum, account) => sum + account.availableBalance, 0))
  //   );
  // }

  fetchUserForLimit(id: string): Observable<User> {
    const jwt = sessionStorage.getItem("jwt");

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${jwt}`
      })
    };
    return this.http.get<User>(environment.baseUrl + '/employee/' + id, httpOptions);
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
        this.http.get(environment.baseUrl + "/orders/getAll", {headers})
        //this.http.get("/assets/orderHistory.json")
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
        this.http.get(environment.baseUrl + "/orders/supervisor/getAll", {headers})
        //this.http.get("/assets/orderHistory.json")
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
        //this.http.get(environmentMarket.baseUrl + "api", {headers})
        this.http.get(environment.baseUrl + "/orders/getAll", {headers})

      // this.http.get("/assets/orderHistory.json")
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
        //this.http.get(environmentMarket.baseUrl + "api", {headers})
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
        //this.http.get(environmentMarket.baseUrl + "api", {headers})
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
        this.http.put<DecideOrderResponse>(environment.baseUrl + '/orders/decideOrder/' + orderId, {"status": "APPROVED"}, { headers })
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
        this.http.put<DecideOrderResponse>(environment.baseUrl + '/orders/decideOrder/' + orderId, {"status": "DENIED"}, { headers })
      );
    } catch (error) {
      console.error('Error while denying order:', error);
      throw error;
    }

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
        environment.baseUrl + '/orders', orderRequest, httpOptions).toPromise();
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
        environment.baseUrl + '/orders', orderRequest, httpOptions).toPromise();
      return response;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  getSecurityOrders(): Observable<CapitalProfitDto[]> {
    return this.http.get<CapitalProfitDto[]>('assets/mocked_banking_data/orders-security-mocked.json')
      .pipe(
        map((data: CapitalProfitDto[]) => data.map(item => ({
          ...item,
          listingType: ListingType[item.listingType as keyof typeof ListingType] // Assuming listingType in JSON is a string that matches enum keys
        })))
      );
  }

  getSecurityOrdersMocked(): Observable<CapitalProfitDto[]> {
    const jwt = sessionStorage.getItem("jwt");

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${jwt}`
      })
    };

    return this.http.get<CapitalProfitDto[]>(environment.baseUrl + 'capitals/listings', httpOptions)
      .pipe(
        map((data: CapitalProfitDto[]) => data.map(item => ({
          ...item,
          listingType: ListingType[item.listingType as keyof typeof ListingType] // Assuming listingType in JSON is a string that matches enum keys
        })))
      );
  }
  //
  // async sellOrder(orderId:number,sellingReq:SellingRequest): Promise<DecideOrderResponse> {
  //   const jwt = sessionStorage.getItem("jwt");
  //
  //   if (!jwt) return { success: false, message: 'JWT token not found' };
  //
  //   const headers = new HttpHeaders({
  //     Authorization: 'Bearer ' + sessionStorage.getItem('jwt')
  //   });
  //
  //   try {
  //     return await firstValueFrom(
  //       this.http.put<DecideOrderResponse>(`${environmentMarket.baseUrl}/orders`, sellingReq, { headers })
  //     );
  //   } catch (error) {
  //     console.error('Error while selling order:', error);
  //     throw error;
  //   }
  //
  // }

}
