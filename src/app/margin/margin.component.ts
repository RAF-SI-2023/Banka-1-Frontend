import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {OrangeButtonModule} from "../welcome/redesign/OrangeButton";
import {ExchangeRate, Margin} from "../model/model";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {PopupService} from "../service/popup.service";
import {TableComponentMarginModule} from "../welcome/redesign/TableComponentMargin";
import {Router} from "@angular/router";
import {GrayButtonModule} from "../welcome/redesign/GrayButton";
import {MarginService} from "../service/margin.service";
import {TransformMarginAccountsPipe} from "../transform-margin-accounts.pipe";
import { CustomerService } from '../service/customer.service';

@Component({
  selector: 'app-margin',
  standalone: true,
  imports: [
    NgIf,
    OrangeButtonModule,
    GrayButtonModule,
    TableComponentMarginModule,
    TransformMarginAccountsPipe,
  ],
  templateUrl: './margin.component.html',
  styleUrl: './margin.component.css'
})
export class MarginComponent {
  headersMargins = [
    'Margin Account',
    'Currency',
    'Security',
    'Invested Funds',
    'Borrowed Funds',
    'Maintenance Margin',
    'Margin Call'
  ];
  selectedTab: string = 'margin_accounts';
  margins: Margin[] = [];
  backUpMargins: Margin[] = [];
  isAdmin: boolean = false;
  isEmployee: boolean = false;
  isCustomer: boolean = false;
  isSupervizor: boolean = false;
  accountNumbers: string[] = [];


  constructor(
    private http: HttpClient,
    private popup: PopupService,
    private router: Router,
    private marginService: MarginService,
    private customerService:CustomerService
  ) {}


  checkIsAdminOrEmployeeOrCustomer(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.isAdmin = sessionStorage.getItem('role') === 'admin';
      this.isEmployee = sessionStorage.getItem('role') === 'employee';
      this.isCustomer = sessionStorage.getItem('role') === 'customer';
      this.isSupervizor = sessionStorage.getItem('role') === 'supervizor';
  
      const jwt = sessionStorage.getItem('jwt');
  
      if (jwt !== null && jwt.length > 0 && this.isCustomer) {
        this.customerService.getCustomer2().subscribe(
          (response) => {
            if (response != null) {
              this.accountNumbers = response.accountIds.map(
                (account: any) => account.accountNumber
              );
              //console.log("Account Numbers: ", this.accountNumbers);
              //this.checkRequiredAccounts(response.userId);
            }
            resolve(); 
          },
          (e) => {
            reject(e); 
          }
        );
      } else {
        resolve(); 
      }
    });
  }
  
  async ngOnInit() {
    await this.checkIsAdminOrEmployeeOrCustomer();
    this.loadMargins();
  }
  
  async loadMargins() {
    if (this.isCustomer == false) {
      this.marginService.getAllMargins().subscribe(
        (margins: Margin[]) => {
          this.margins = this.backUpMargins = margins;
          console.log("Margins: ", this.margins);
        },
        (error: HttpErrorResponse) => {
          console.error('Error loading margins:', error);
        }
      );
    } else {
      this.marginService.getAllMargins().subscribe(
        (margins: Margin[]) => {
        this.margins = this.backUpMargins=margins.filter(margin => this.accountNumbers.includes(margin.bankAccountNumber));
         //this.margins = this.backUpMargins = margins;
          console.log("Margins: ", this.margins);
        },
        (error: HttpErrorResponse) => {
          console.error('Error loading margins:', error);
        }
      );
      console.log("Izdvojeni racuni:" +this.accountNumbers);
    }
  }

  setTab(tabName: string) {
    this.selectedTab = tabName;
  }

  navigateToDetails(accountNumber: string|undefined) {
    this.router.navigate(['/margin-transaction-details', accountNumber]);
    const margin = this.margins.find(m => m.bankAccountNumber === accountNumber);
    console.log('Margin found:', margin);

    if (margin) {
      const queryParams = {
        queryParams : {marginId: margin.id, accountNumber: accountNumber }
      }
      this.router.navigate(['/margin-transaction-details'], queryParams);

    } else {
      console.error('No margin found with the given account number.');
    }
  }

  openPopUp(row: any) {
    let selectedMargin: Margin | undefined = undefined;

    this.backUpMargins.forEach(account => {
      if (account.bankAccountNumber == row.marginAccount) {
        selectedMargin = account;
      }
    });

    // console.log("Selected margin:", selectedMargin);
    this.popup.openMarginCallPopup(selectedMargin);
  }
}
