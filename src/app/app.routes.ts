import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { SecurityListComponent } from './security-list/security-list.component';
import {permissionGuard} from "./guards/permission.guard";

/**
 * Each path object can have a data property (which is an object containing a permission property which is a list of
 * strings representing the name of the permissions a user can have) which defines the required permissions.
 *
 * Format:
 * {path: "/", component: ExampleComponent, canActivate: [permissionGuard], data: {permissions: ["PERMISSION_1", "PERMISSION_2"]}}
 *
 * If a route doesn't have a data property, it is assumed that no permissions are required and thus none are checked.
 *
 * Note: A user needs to have all required permissions to be able to access the route.
 */
export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  {
    path: 'user',
    children: [
      { path: 'add', component: AddUserComponent, canActivate: [permissionGuard], data: {permissions: ["TEST"]}},
      { path: 'update', component: UpdateUserComponent },
      { path: 'list', component: ListUserComponent },
      { path: 'set-password/:id', component: SetPasswordComponent },
    ],
  },
  {
    path: 'security',
    children: [{ path: 'all', component: SecurityListComponent }],
  },
];
