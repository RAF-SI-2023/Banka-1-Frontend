import {
  Component,
  HostListener,
  OnChanges,
  ViewChild,
  SimpleChanges,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from './service/employee.service';
import { MatSidenav } from '@angular/material/sidenav';
import { PopupComponent } from './popup/popup.component';
import { PopupService } from './service/popup.service';

import { RouterLinkActive } from '@angular/router';

import { AuthService } from './service/auth.service';

import { Account, AccountType, Customer } from './model/model';
import { AccountService } from './service/account.service';

import { OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { catchError, filter, Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { StorageService } from './service/storage.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CustomerService } from './service/customer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('dropdown', [
      transition(':enter', [
        style({ height: '0', opacity: 0 }), // Start with no height and transparent
        animate('0.3s ease-out', style({ height: '*', opacity: 1 })), // Animate to auto height and full opacity
      ]),
      transition(':leave', [
        animate('0.2s ease-in', style({ height: '0', opacity: 0 })), // Animate back to no height and transparent
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  private routerSubscription!: Subscription;

  title = 'banka-frontend';

  @ViewChild('sidenav') sidenav: MatSidenav | undefined = undefined;

  activeItem: string = '';
  setActiveItem(item: string) {
    this.activeItem = this.activeItem === item ? '' : item; // This toggles the active item
  }

  userInitials: string = '';
  isAdmin: boolean = false;
  isEmployee: boolean = false;
  isCustomer: boolean = false;
  isSupervizor: boolean = false;
  isAgent: boolean = false;
  hasRequiredAccounts: boolean = false;
  loggedUserPosition: string = '';
  showPaymentsSubMenu: boolean = false;
  isLegalPerson: boolean = false;

  //Izbrisati kada bek odradi
  accounts: Account[] = [
    {
      accountNumber: '12345',
      accountType: AccountType.CURRENT,
      currencyName: 'EUR',
      maintenanceCost: 10.0,
      balance: 1000.0,
    },
    {
      accountNumber: '54321',
      accountType: AccountType.FOREIGN_CURRENCY,
      currencyName: 'USD',
      maintenanceCost: 15.0,
      balance: 5000.0,
    },
  ];

  //Izbrisati kada bek odradi
  testcheckRequiredAccounts() {
    const currentAccount = this.accounts.find(
      (acc) => acc.accountType === AccountType.CURRENT
    );
    const foreignCurrencyAccounts = this.accounts.filter(
      (acc) => acc.accountType === AccountType.FOREIGN_CURRENCY
    );
    if (
      (currentAccount && foreignCurrencyAccounts.length > 0) ||
      foreignCurrencyAccounts.length > 1
    ) {
      this.hasRequiredAccounts = true;
    }
  }

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private accountService: AccountService,
    private cdr: ChangeDetectorRef,
    private storageService: StorageService,
    private customerService: CustomerService
  ) {
    this.isLegalPerson = sessionStorage.getItem('isLegalPerson') === 'true';
    this.triggerEventForAlreadyLoadedPage();
    this.toggleSideNav();
    this.userInitials = '/';
  }

  ngOnInit() {
    this.isLegalPerson = sessionStorage.getItem('isLegalPerson') === 'true';
    console.log("isLegalPerson => " + sessionStorage.getItem('isLegalPerson'));

    this.checkIsAdminOrEmployeeOrCustomer();
    this.storageService.role$.subscribe((role) => {
      this.isAdmin = role === 'admin';
      this.isEmployee = role === 'employee';
      this.isCustomer = role === 'customer';
      this.isAgent = role === 'agent';
      this.isSupervizor = role === 'supervizor';
    });

    

    this.authService.getJwtObservable().subscribe((jwt) => {
      if (jwt) {
        const userRole = sessionStorage.getItem('loginUserRole');
    
        if (userRole === 'customer') {
          this.customerService.getCustomer(jwt).subscribe({
            next: (response) => {
              if (response != null) {
                this.userInitials = response.firstName.concat(' ', response.lastName);
              }
            },
            error: (e) => {
              this.userInitials = 'Luka Lazarevic';
            },
          });
        } else if (userRole === 'employee') {
          this.userService.getEmployee(jwt).subscribe({
            next: (response) => {
              if (response != null) {
                this.userInitials = response.firstName.concat(' ', response.lastName);
              }
            },
            error: (e) => {
              this.userInitials = 'Luka Lazarevic';
            },
          });
        } else {
          console.error('Unknown user role');
          this.userInitials = 'Luka Lazarevic';
        }
      }
    });
    



      // this.authService.getJwtObservable().subscribe((jwt) => {
      //   if (jwt) {     
      //     this.customerService.getCustomer(jwt).pipe(
      //       catchError((error) => {
      //         return this.userService.getEmployee(jwt);
      //       })
      //     ).subscribe({
      //       next: (response) => {
      //         if(response!=null){
      //           this.userInitials = response.firstName.concat(
      //             ' ',
      //             response.lastName
      //           );
      //         }
      //       },
      //       error: (e) => {
      //         this.userInitials = 'Luka Lazarevic';
      //       },
      //     });
      //   }
      // });
  }



  checkIsAdminOrEmployeeOrCustomer() {
    this.isAdmin = sessionStorage.getItem('role') === 'admin';
    this.isEmployee = sessionStorage.getItem('role') === 'employee';
    this.isCustomer = sessionStorage.getItem('role') === 'customer';
    this.isCustomer = sessionStorage.getItem('role') === 'customer';
    this.isAgent = sessionStorage.getItem('role') === 'agent';
    this.isSupervizor = sessionStorage.getItem('role') === 'supervizor';

    const jwt = sessionStorage.getItem('jwt');


    if (jwt !== null && jwt.length > 0) {
      if (this.isCustomer) {
        this.customerService.getCustomer(jwt).subscribe(
          (response) => {
            if(response!=null)
            this.checkRequiredAccounts(response.userId);
          },
          (e) => {
            this.userInitials = '/';
          }
        );
      }
    }
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  toggleSideNav() {
    if (this.sidenav?.opened) {
      this.sidenav.close();
    } else this.sidenav?.open();
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  userIsLoggedIn() {
    return !!sessionStorage.getItem('jwt');
  }

  checkIsAdmin(): boolean {
    this.checkIsAdminOrEmployeeOrCustomer();
    return this.isAdmin;
  }

  checkIsEmployee(): boolean {
    this.checkIsAdminOrEmployeeOrCustomer();
    return this.isEmployee;
  }

  checkIsCustomer(): boolean {
    this.checkIsAdminOrEmployeeOrCustomer();
    return this.isCustomer;
  }

  checkRequiredAccounts(customerId: number) {
    this.accountService.getCustomerAccounts(customerId).subscribe(
      (accounts: Account[]) => {
        const currentAccount = accounts.find(
          (acc) => acc.accountType === AccountType.CURRENT
        );
        const foreignCurrencyAccounts = accounts.filter(
          (acc) => acc.accountType === AccountType.FOREIGN_CURRENCY
        );
        if (
          (currentAccount && foreignCurrencyAccounts.length > 0) ||
          foreignCurrencyAccounts.length > 1
        ) {
          this.hasRequiredAccounts = true;
        }
      },
      (error: any) => {
        console.error('Error while fetching accounts: ', error);
      }
    );
  }

  togglePaymentsSubMenu() {
    this.showPaymentsSubMenu = !this.showPaymentsSubMenu;
  }

  checkIsCustomerAndBankAccounts(): boolean {
    return this.isCustomer && this.hasRequiredAccounts;
  }

  readUserPositionFromStorage() {
    let loggedUserPositionFromStorage = sessionStorage.getItem('userPosition');
    console.log('Logged user poss');
    console.log(loggedUserPositionFromStorage);

    if (loggedUserPositionFromStorage !== null) {
      this.loggedUserPosition = loggedUserPositionFromStorage;
    } else {
    }

    this.isLegalPerson = sessionStorage.getItem('isLegalPerson') === 'true';
  }

  /*
    When user is logged out, the app-component-html isn't distroyed and is being reused by Angular.
    Because of that neither the constructor or ngOnInit are called.
    So if you want to trigger something after logging in again call this method.
  */
  triggerEventForAlreadyLoadedPage() {
    this.routerSubscription = this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        this.readUserPositionFromStorage();
      });
  }
}
