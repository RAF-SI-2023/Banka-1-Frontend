import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environment';
import { Observable, of } from 'rxjs';
import { User, Permissions } from '../model/model';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  constructor(private http: HttpClient) {}

  /** 
    Api call.

    userId - passed as parameter because it is a part of url.
    permissionsToModify - list of strings that will be added or removed from depending on flag.
    flag - if set to true adds and if set to false removes passed permissionsToModify from user.

    Api returns boolean.
   **/
  modifyUserPermissions(
    userId: number,
    permissionsToModify: string[],
    flag: boolean
  ) {
    let url = environment.baseUrl + `/employee/permission/${userId}`;

    const jsonData = {
      permissions: permissionsToModify,
      add: flag,
    };
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + sessionStorage.getItem('jwt'),
    });

    console.log('modifyUserPermissions api log:');
    console.log(url);
    console.log(jsonData);

    return this.http.post<boolean>(url, jsonData, { headers });

   
  }

  public getPermissions(): Observable<Permissions[]> {
    return this.http.get<Permissions[]>(`${environment.baseUrl}/permission/getAll`);
  }

  addUserPermissions(user: User) {
    let id = user.userId;
    const permissionsToModify: string[] = user.permissions.map(permission => permission.name);
    let url = environment.baseUrl + '/employee/';

    let userToSend = {
      userId: id,
      permissions: permissionsToModify,
      email: user.email
    };

    const jsonData = userToSend;

    console.log('addUserPermissions api log:');
    console.log(url);
    console.log(jsonData);

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });

    console.log(headers);

    return this.http.put<number>(url, jsonData, {headers});

  
  }
}
