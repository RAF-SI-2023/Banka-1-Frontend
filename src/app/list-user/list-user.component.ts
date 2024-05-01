import { Component, OnInit } from '@angular/core';
import {User, Permissions, Limit} from '../model/model';
import { UserService } from '../service/employee.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {PopupService} from "../service/popup.service";
import {FormsModule} from "@angular/forms";
import { PermissionPopUpComponent } from '../permissions-popup/permission-pop-up/permission-pop-up.component';
import { MatDialog } from '@angular/material/dialog';
import { PermissionsService } from '../service/permissions.service';
import {TableComponentModule} from "../welcome/redesign/TableComponent";
import {OrangeButtonModule} from "../welcome/redesign/OrangeButton";
import { TransformPermissionsPipeModule} from "./TransformPermissionsPipe";
import {TransformUsersPipeModule} from "./TransformUsersPipe";
import {LineTextFieldModule} from "../welcome/redesign/LineTextField";
import {TransparentTextFieldModule} from "../welcome/redesign/TransparentTextField";
import {WhiteTextFieldModule} from "../welcome/redesign/WhiteTextField";
import {TransformLimitsPipeModule} from "./TransformLimitsPipe";
import {HttpErrorResponse} from "@angular/common/http";
import { EditLimitPopUpComponent } from '../edit-limit-pop-up/edit-limit-pop-up.component';
import { ResetLimitPopupComponent } from '../reset-limit-popup/reset-limit-popup.component';
import {DropdownInputModule} from "../welcome/redesign/DropdownInput";

@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [CommonModule, FormsModule, TableComponentModule, OrangeButtonModule, TransformPermissionsPipeModule, TransformUsersPipeModule, LineTextFieldModule, TransparentTextFieldModule, WhiteTextFieldModule, TransformLimitsPipeModule, DropdownInputModule],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css'
})
export class ListUserComponent implements OnInit{

  public users: User[] = [];
  public limits: Limit[] = [];
  public position:string ='';
  public firstName:string='';
  public lastName:string='';
  public email:string='';
  public searchEmail:string='';
  selectedTab: string = "users";
  hasPermission?: boolean = false;
  public p:string | null='';

  headersLimits = ['Email','Id', 'Limit', 'Used Limit', 'Needs Approve'];
  headersUsers = ['NAME', 'EMAIL', 'JMBG', 'POSITION', 'PHONE NUMBER'];
  rowsUsers = [
    { 'Header 1': 'Row 1', 'Header 2': 'Row 1', 'Header 3': 'Row 1', 'Header 4': 'Row 1', 'Header 5': 'Row 1','Header 6': 'Row 1', },
    { 'Header 1': 'Row 1', 'Header 2': 'Row 1', 'Header 3': 'Row 1', 'Header 4': 'Row 1', 'Header 5': 'Row 1','Header 6': 'Row 1', },
    { 'Header 1': 'Row 1', 'Header 2': 'Row 1', 'Header 3': 'Row 1', 'Header 4': 'Row 1', 'Header 5': 'Row 1','Header 6': 'Row 1', },
  ];

  headersPermissions = ['EMAIl'];
  rowsPermissions = [
    { 'Header 1': 'Row 1', 'Header 2': 'Row 1' },
    { 'Header 1': 'Row 1', 'Header 2': 'Row 1' },
    { 'Header 1': 'Row 1', 'Header 2': 'Row 1' },
  ];

  constructor(private userService: UserService, private router: Router,private popup:PopupService, private dialog: MatDialog, private apiService: PermissionsService) { }

  ngOnInit() {
    //get permission
    const permission = this.getPermission();
    //this.hasPermission = permission === 'modifyUser';
    this.hasPermission = this.canEditUser();

    //load data from database
    this.loadEmployeesFromDataBase();
    this.loadLimit();
    this.p = sessionStorage.getItem("role");
  }

  // TODO: REPLACE MOCKED WITH getLimits - see the function it is in same file as getLimitsMocked
  loadLimit() {
    this.userService.getLimits().subscribe(
      (limitsFromDB: Limit[]) => {
        this.limits = limitsFromDB;
      },
      (error: HttpErrorResponse) => {
        console.error('Error loading limits:', error);
      }
    );
  }

  getPermission(): string | null {
    return sessionStorage.getItem('permissions');
  }

  loadEmployeesFromDataBase(){
    this.userService.getEmployees().subscribe({
      next: (users: User[]) => {
        this.users = users;
        console.log(users[0])
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  setSelectedTab(tab: string) {
    console.log(tab)
    this.selectedTab = tab;
  }

  togglePopupAddUser() {
    this.popup.openAddUserPopup(this);
  }

  search(){
    this.userService.searchUser(this.position,this.email,this.firstName,this.lastName).subscribe({
      next: (users: User[]) => {
        this.users = users;

      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  editUser(user: User){
    this.userService.setUserToEdit(user);
    this.popup.openUpdateUserPopup(this);
    // this.router.navigate(['/user/update']);
  }

  deleteUser(user: User): void {
    console.log(user);
    const confirmResult = confirm('Are you sure you want to delete this user?');
     if (confirmResult) {
      this.userService.deleteUser(user.userId).subscribe({
        next: (response: boolean) => {
          if (response) {
            this.users = this.users.filter(u => u.userId !== user.userId);
          } else {
            console.error('Error deleting user: Response was false');
          }
        },
        error: (error: any) => {
          console.error('Error deleting user: ', error);
        }
      });
     }

  }

  /**
    Api call wrapper.

    user - User who's permissions are modified.
    permissions - added or modified permissions.
    flag - if set to true adds and if set to false removes modifeied permissions.
   **/
  modifyUserPermissions(user: User, permissions: Permissions[], flag: boolean){
    let userId = user.userId;
    let permissionsToModify: string[] = permissions.map(permission => permission.name);

    console.log("modifyUserPermissions wrapper log:");
    console.log(user);
    console.log(userId);
    console.log(permissionsToModify);
    console.log(flag);

    this.apiService.modifyUserPermissions(userId, permissionsToModify, flag).subscribe(
      (response: any) => {
        console.log('Success:', response);
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

  removePermission(user: any, index: number) {
    console.log("Removed perm: ");
    console.log(user.permissions[index]);
    let perm:Permissions = user.permissions[index];
    user.permissions.splice(index, 1);

    // TODO update permissions in database.
    const list: Permissions[] = [perm];
    this.modifyUserPermissions(user, list, false);
  }

  deleteAllPermissions(user: User){
    let list: Permissions[] = user.permissions;
    user.permissions = [];
    // TODO update permissions in database
    this.modifyUserPermissions(user, list, false);
  }

  filter(){
    if(this.searchEmail === '' || this.searchEmail === null) this.loadEmployeesFromDataBase();
    else this.users = this.users.filter(user => user.email === this.searchEmail)
  }

  /*
    Opens pop up dialog for edditing permission and when dialog is closed it handles result.
  */
  editUserPermissions(user: User){

    // We want to pass a copy and not direct reference of user to dialog
    // When dialog is closed we only want to apply changes if saved is pressed
    // This wont happen and any change will be saved if we pass argument by reference
    const userClone = JSON.parse(JSON.stringify(user));

    const dialogRef = this.dialog.open(PermissionPopUpComponent, {
      width: '1250px',
      height: 'auto',
      data: userClone, // Passing the user data
      disableClose: false // Prevents closing the dialog by clicking outside or pressing ESC
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      console.log('The dialog was closed');

      //TODO: two options:
      //a) refetch users
      //b) update the modified user using result
      this.loadEmployeesFromDataBase();
    });
  }

  canAddUser(){
    return sessionStorage.getItem('permissions')?.includes('addUser');
  }

  canEditUser(){
    return sessionStorage.getItem('permissions')?.includes('modifyUser');
  }

  canDeleteUser(){
    return sessionStorage.getItem('permissions')?.includes('deleteUser');
  }

  setPosition(position: any){
    this.position = position;
  }

 editLimit(originalLimit: Limit){
    console.log('Edit limit: ', originalLimit)

    const dialogRef = this.dialog.open(EditLimitPopUpComponent, {
      width: '50vw',
      height: 'auto',
      data: originalLimit, // Passing the displayed bank account
      disableClose: false // Prevents closing the dialog by clicking outside or pressing ESC
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      await this.delay();
      this.loadLimit();
    });

  }

  async delay(){
      await new Promise(resolve => setTimeout(resolve, 200)); // 5000 milliseconds = 5 seconds
  }

  async resetLimit(originalLimit: Limit) {
    console.log('Edit limit: ', originalLimit)

    const dialogRef = this.dialog.open(ResetLimitPopupComponent, {
      width: '50vw',
      height: 'auto',
      data: originalLimit, // Passing the displayed bank account
      disableClose: false // Prevents closing the dialog by clicking outside or pressing ESC
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      await this.delay();
      this.loadLimit();
    });

    this.loadLimit();
  }
}
