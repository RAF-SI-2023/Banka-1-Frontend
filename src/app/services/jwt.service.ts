import { Injectable } from '@angular/core';
import {Permission} from "../guards/permission.guard";

export interface UserData {
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  jmbg: string,
  position: string,
  phoneNumber: string,
  active: boolean,
  permissions: Permission[]
}

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  constructor() { }

  /**
   * Validates that it's a valid token and gets the user details from the body.
   * @param token
   */
  extractUserDataFromJWT(token: string): UserData {
    const jwtParts = token.split(".");
    if(jwtParts.length !== 3) {
      throw new Error("Invalid JWT token.");
    }

    return JSON.parse(atob(jwtParts[1])) as UserData;

  }
}
