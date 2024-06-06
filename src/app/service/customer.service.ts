import { Injectable } from '@angular/core';
import {firstValueFrom} from "rxjs";
import {
  CreateBankAccountRequest,
  CreateCustomerRequest,
  Customer,
  CustomerWithAccounts,
  EditCustomerRequest
} from '../model/model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  // Use this when you select a customer from the list and want to display his details
  private selectedCustomer: Customer | undefined;

  // Used when creating a new customer and bank account at the same time
  private customerForCreation: CreateCustomerRequest | undefined;

  // Used when editing a customer
  private customerForEdit: EditCustomerRequest | undefined;


  private apiUrl = environment.userService + '/customer';


  constructor(
    private http: HttpClient,
  ) { }

  getCustomer(jwt: string): Observable<Customer> {
    const url = `${this.apiUrl}/getCustomer`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${jwt}`
      })
    };
    return this.http.get<Customer>(url, httpOptions);
  }

  getCustomer2(): Observable<CustomerWithAccounts> {
    const jwt = sessionStorage.getItem('jwt');
    const url = `${this.apiUrl}/getCustomer`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${jwt}`
      })
    };
    return this.http.get<any>(url, httpOptions);
  }


  async initialActivation(email: string, accountNumber: string, phoneNumber: string) {
    const data =  {
      email,
      accountNumber,
      phoneNumber
    }
    let resp;
    try {
      resp = (await firstValueFrom(
        this.http.post(environment.userService + "/customer/initialActivation", data)
      )) as boolean;
    } catch (e) {
      return false;
    }
    return resp;
  }

  async finalActivation(token: string, password: string) {
    const data =  {
      password
    }
    let resp;
    try {
      resp = (await firstValueFrom(
        this.http.post(environment.userService + `/customer/activate/${token}`, data)
      )) as number;
    } catch (e) {
      return false;
    }
    return true;
  }

  public createCustomerAndBankAccount(customer: CreateCustomerRequest, bankAcc: CreateBankAccountRequest): Observable<boolean> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });
    return this.http.post<any>(`${this.apiUrl}/createNewCustomer`, {
      customer: customer,
      account: bankAcc,
      name: 1
    }, { headers });
  }
  public addCustomerBankAccount(customerId: number, bankAcc: CreateBankAccountRequest): Observable<boolean> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });
    return this.http.post<any>(`${environment.userService }/account/create`, {
      customerId: customerId,
      account: bankAcc
    }, { headers });
  }
  public getAllCustomers(): Observable<Customer[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });
    return this.http.get<Customer[]>(`${this.apiUrl}/getAll`, { headers });
  }

  public editCustomer(customer: CreateCustomerRequest): Observable<boolean> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });
    return this.http.put<any>(`${this.apiUrl}`, customer, { headers });
  }

  public  deleteCustomer(customerId: number): Observable<boolean> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });

    return this.http.delete<boolean>(`${this.apiUrl}/remove/${customerId}`, { headers});
  }

  public searchCustomer(email: string, firstName: string, lastName:string): Observable<any> {
    console.log('Search user: ', email, firstName, lastName);
    const params = new HttpParams().set('firstName', firstName).set('lastName', lastName).set('email',email);
    const jwt = sessionStorage.getItem('jwt');

    if (!jwt) {
      throw new Error('JWT not found in sessionStorage');
    }

    // Setting up the headers
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt
    });

    return this.http.get(this.apiUrl + '/search' , { headers, params });
  }


  public setSelectedCustomer(customer: Customer): void {
    this.selectedCustomer = customer;
    console.log('Selected customer: ', this.selectedCustomer);
  }

  public getSelectedCustomer(): Customer | undefined {
    return this.selectedCustomer;
  }

  public setCustomerForCreation(customer: CreateCustomerRequest|undefined): void {
    this.customerForCreation = customer;
  }

  public getCustomerForCreation(): CreateCustomerRequest | undefined {
    return this.customerForCreation;
  }

  public setCustomerForEdit(customer: EditCustomerRequest|undefined): void {
    this.customerForEdit = customer;
  }

  public getCustomerForEdit(): EditCustomerRequest | undefined {
    return this.customerForEdit;
  }
}
