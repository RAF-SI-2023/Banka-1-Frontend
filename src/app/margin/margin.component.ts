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

  constructor(
    private http: HttpClient,
    private popup: PopupService,
    private router: Router,
    private marginService: MarginService
  ) {}

  async ngOnInit() {
    this.loadMargins();
  }

  async loadMargins() {
    this.marginService.getAllMargins().subscribe(
      (margins: Margin[]) => {
        this.margins = this.backUpMargins = margins;
        console.log("Margins: ", this.margins);
      },
      (error: HttpErrorResponse) => {
        console.error('Error loading margins:', error);
      }
    );
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
