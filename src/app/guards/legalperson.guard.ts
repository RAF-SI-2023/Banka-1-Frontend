import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { JwtService } from "../service/jwt.service";

@Injectable({
  providedIn: 'root'
})
export class LegalPersonGuard implements CanActivate {

  constructor(
    private jwtService: JwtService,
    private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = sessionStorage.getItem("jwt");
    if (!token || !this.jwtService.isTokenFormatValid(token)) {
      return of(this.router.parseUrl('/login'));
    }

    const isLegalPerson = sessionStorage.getItem('isLegalPerson') === 'true';

    if (isLegalPerson) {
      return true;
    } else {
      this.router.navigate(['/welcome']);
      return false;
    }
  }
}
