import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Permissions } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private apiUrl = environment.userService+"/permissions"; // Set your API endpoint here

  constructor(private http: HttpClient) {}

  public getAllPermissions(): Observable<Permissions[]>{
    return this.http.get<Permissions[]>(this.apiUrl, {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
      }
    });
  }

}
