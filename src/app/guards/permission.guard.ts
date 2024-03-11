import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {JwtService, UserData} from "../services/jwt.service";

export interface Permission {
  permissionId: number,
  name: string,
  description: string,
}
/**
 * The guard checks if the user has sufficient permissions defined in the route.
 */
export const permissionGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const jwtService: JwtService = inject(JwtService);

  const jwt = localStorage.getItem("jwt");
  if (!jwt) {
    router.navigate(["login"]);
    return false;
  }

  const requiredPermissions = route.data["permissions"] as string[];
  if(!requiredPermissions) {
    return true
  }

  const userPermissions: Permission[] = jwtService.extractUserDataFromJWT(jwt).permissions;

  const userPermissionStrings: string[] = userPermissions.map((permission) => {
    return permission.name
  })
  return requiredPermissions.every(
    permission => userPermissionStrings.includes(permission)
  )
};
