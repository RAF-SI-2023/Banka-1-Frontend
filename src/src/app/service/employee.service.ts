import {HttpClient, HttpHeaders,  HttpParams} from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserToEdit } from '../model/model';
import { environment } from "../../../environment";
import {PopupService} from "./popup.service";
import {Router} from "@angular/router";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.baseUrl;

  private userToEdit: User | undefined;

  private isAdminSubject = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.isAdminSubject.asObservable();
  private isEmployeeSubject = new BehaviorSubject<boolean>(false);
  isEmployee$ = this.isEmployeeSubject.asObservable();
  private isCustomerSubject = new BehaviorSubject<boolean>(false);
  isCustomer$ = this.isCustomerSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  public getEmployees(): Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl+"/employee/getAll", {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
      }
    });
  }

  public  deleteUser(userId: number): Observable<boolean> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });

    return this.http.delete<boolean>(`${this.apiUrl}/employee/remove/${userId}`, { headers});
    // Ovako pise da treba po fajlu koji je radjen sa endpointovima, ali ja kad sam preuzeo back
    // kod je napisan tako da se koristila putanja sa /delete
    //return this.http.delete<boolean>(`${this.apiUrl}/user/remove/${userId}`, { headers});

  }

  public addUser(userData: any): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });
    return this.http.post<any>(`${this.apiUrl}/employee/createEmployee`, userData, { headers });
  }

  public searchUser(position: string, email: string, firstName: string, lastName:string): Observable<any> {
    console.log('Search user: ', position, email, firstName, lastName);
    const params = new HttpParams().set('firstName', firstName).set('lastName', lastName).set('email',email).set('position',position);
    const jwt = sessionStorage.getItem('jwt');

    if (!jwt) {
      throw new Error('JWT not found in sessionStorage');
    }

    // Setting up the headers
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt
    });

    return this.http.get(this.apiUrl + '/employee/search' ,{ headers, params });
  }


  public getUserById(userId: number): Observable<User> {
    return this.http.get<User>(this.apiUrl + '/employee/' + userId,{
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
      }
    });
  }

  public updateUser(user: {
    userId: number;
    email: string
    password: string;
    firstName: string;
    lastName: string;
    jmbg: string;
    position: string;
    phoneNumber: string;
    isActive: boolean;
  }): Observable<any> {
    return this.http.put<User>(this.apiUrl + '/employee/', user,{
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
      }
    });
  }

  public setUserToEdit(user: User): void {
    this.userToEdit = user;
    console.log('User to edit: ', this.userToEdit);
  }

  public getUserToEdit(): User | undefined {
    return this.userToEdit;
  }

  getEmployee(jwt: string): Observable<User> {
    const url = `${this.apiUrl}/employee/getEmployee`;

  //getUser(jwt: string | null): Observable<{name: string, lastName: string}> {
   // let url = `${this.apiUrl}/user/getUser`;

    //ToDo: Da li treba autorizacija
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${sessionStorage.getItem("jwt")}`
    // });

//     if (!jwt) {
//       this.router.navigate(['/login']);
//     }


    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${jwt}`
      })
    };
    return this.http.get<any>(url, httpOptions);
  }


  updateUserState(position: string) {
    console.log("USAO");
    this.isAdminSubject.next(position.toLowerCase() === "admin");
    this.isEmployeeSubject.next(position.toLowerCase() === "employee");
    this.isCustomerSubject.next(position.toLowerCase() === "customer");
    let p = position.toLowerCase() === "admin";
    console.log("Prosao"+p);
  }
}
