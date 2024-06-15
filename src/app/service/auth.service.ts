import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private jwtSubject = new BehaviorSubject<string | null>(null);

  private loginUrl = environment.userService+"/auth/login"; // Set your API endpoint here

  constructor(private http: HttpClient) {
    const currentJwt = sessionStorage.getItem("jwt");
    this.jwtSubject.next(currentJwt);
  }
  //auth/login/emplyee POST
  loginEmployee(email: string, password: string): Observable<any> {
    return this.http.post(environment.userService+"/auth/login/employee", { email, password }).pipe(
      map((response: any) => {
        // Assuming the response contains the JWT token
        console.log(response)
        return response;

      })
    );
  }

  // Ruta auth/login/customer POST
  loginCustomer(email: string, password: string): Observable<any> {
    return this.http.post(environment.userService+"/auth/login/customer", { email, password }).pipe(
      map((response: any) => {
        // Assuming the response contains the JWT token
        console.log(response)
        return response;

      })
    );
  }


  login(email: string, password: string): Observable<any> {
    return this.http.post(environment.userService+"/auth/login", { email, password }).pipe(
      map((response: any) => {
        // Assuming the response contains the JWT token
        console.log(response)
        return response;

      })
    );
  }


  // Call this method when the JWT token is set
  setJwt(token: string): void {
    sessionStorage.setItem('jwt', token);
    this.jwtSubject.next(token);
  }

  // Components can subscribe to this observable to know when JWT is available
  getJwtObservable() {
    return this.jwtSubject.asObservable();
  }

  


}
