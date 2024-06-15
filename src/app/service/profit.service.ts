import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Future, Profit, User} from '../model/model';
import {catchError, firstValueFrom, forkJoin, Observable, of} from 'rxjs';
import { environment } from '../../environments/environment';
import {StockListing} from "./stock.service";
import {map} from "rxjs/operators";
import {UserService} from "./employee.service";

@Injectable({
  providedIn: 'root'
})
export class ProfitService {
  private apiUrl = environment.userService;

  constructor(private httpClient: HttpClient, private userService: UserService) { }

  // getBankProfit():Observable<number>{
  //   return this.httpClient.get<number>(this.apiUrl+"/profit/getStockProfitBank", {
  //     headers: {
  //       'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
  //     }
  //   });
  // }

  // getAgentProfit(userId: number): Observable<number> {
  //   return this.httpClient.get<number>(this.apiUrl+`/profit/getStockProfitAgent/${userId}`, {
  //     headers: {
  //       'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
  //     }
  //   });
  // }

  getBankProfit():Observable<number>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });
    console.log(headers);

    const options = { headers: headers };
    let url = environment.userService + `/profit/getStockProfitBank`;

    return this.httpClient.get<number>(url, options);
  }

  getAgentProfit(userId: number): Observable<number> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });
    console.log(headers);

    const options = { headers: headers };
    let url = environment.userService + `/profit/getStockProfitAgent/${userId}`;

    return this.httpClient.get<number>(url, options);
  }

  public getEmployeesWithProfit(): Observable<Profit[]> {
    return this.userService.getEmployees().pipe(
      map(employees => {
        // Kreiramo niz Observable-a za svakog zaposlenog
        const profitRequests = employees.map(employee =>
          this.getAgentProfit(employee.userId).pipe(
            // Dodajemo vrednosti profita zaposlenom
            map(profit => ({
              name: employee.firstName + ' ' + employee.lastName,
              profit: profit || 0, // Ako profit nije dostupan, postavljamo na 0
              phoneNumber: employee.phoneNumber,
              email: employee.email
            })),
            catchError(error => {
              // U slučaju greške, vraćamo default vrednosti
              console.error(`Error loading profit for user ${employee.userId}:`, error);
              return of({
                name: employee.firstName + ' ' + employee.lastName,
                profit: 0, // Ako je greška, profit postavljamo na 0
                phoneNumber: employee.phoneNumber,
                email: employee.email
              });
            })
          )
        );
        // Kombinujemo sve Observable-e u jedan Observable
        return forkJoin(profitRequests);
      }),
      // Ravnomerno izravnavamo rezultat u jedan nivo Observable-a
      map(obsArray => obsArray as unknown as Profit[])
    );
  }

}
