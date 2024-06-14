import { Component } from '@angular/core';
import { DatePipe, DecimalPipe, NgForOf, NgIf } from '@angular/common';
import { FilterByStatusPipeModule } from '../orders/FilterByStatusPipe';
import { OrangeButtonModule } from '../welcome/redesign/OrangeButton';
import { TableComponentModule } from '../welcome/redesign/TableComponent';
import { TransformSecuritiesPipeModule } from '../orders/TransformSecuritiesPipe';
import {
  Contract,
  OTC,
  OTCTab,
  PublicOffer,
  StockListing,
} from '../model/model';
import { OtcService } from '../service/otc.service';
import { StockService } from '../service/stock.service';
import { forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TableComponentStatusModule } from '../welcome/redesign/TableComponentStatus';
import { PopupService } from '../service/popup.service';
import {TransformStatusPipe, TransformStatusPipeModule} from "../otc-customer/TransformStatusPipe";
import {TransformContractsPipeModule} from "../otc-customer/TransformContractsPipe";
import {DropdownInputModule} from "../welcome/redesign/DropdownInput";
import {DropdownInputStatusModule} from "../welcome/redesign/DropDownInputStatus";

@Component({
  selector: 'app-otc',
  standalone: true,
  imports: [
    DatePipe,
    DecimalPipe,
    FilterByStatusPipeModule,
    NgForOf,
    NgIf,
    OrangeButtonModule,
    TableComponentModule,
    TransformSecuritiesPipeModule,
    TableComponentStatusModule,
    TransformStatusPipeModule,
    TransformContractsPipeModule,
    DropdownInputStatusModule
  ],
  templateUrl: './otc.component.html',
  styleUrl: './otc.component.css',
})
export class OtcComponent {
  headersOTCs = [
    'Buyer',
    'Seller',
    'Comment',
    'Created',
    'Realized',
    'Ticker',
    'Amount',
    'Price',
  ];
  selectedTab: string = 'overview';
  otcToContractIdMap: Map<OTC, number> = new Map();
  contracts: Contract[] = [];
  stocks: StockListing[] = [];
  otcs: OTC[] = [];
  publicOffers: PublicOffer[] = [];
  activeSell: OTC[] = [];
  activeBuy: OTC[] = []

  constructor(
    private otcService: OtcService,
    private stockService: StockService,
    private http: HttpClient,
    private popup: PopupService
  ) {}

  async ngOnInit() {
    this.loadOTCs();
  }

  async loadOTCs() {
    this.otcService.getAllSupervisorContracts().subscribe((contracts) => {
      this.contracts = contracts;
      console.log("Contracts in admin:", contracts);
    });
    // forkJoin({
    //   contracts: this.otcService.getAllSupervisorContracts(),
    //   stocks: this.stockService.getStocks()
    // }).subscribe(({ contracts, stocks }) => {
    //   this.contracts = contracts;
    //   this.stocks = stocks;
    //   this.otcs = this.mergeLists(contracts, stocks);
    //   console.log('Contracts:', contracts);
    //   console.log('Stocks:', stocks);
    //   console.log('OTCs:', this.otcs);
    // });
  }

  setTab(tabName: string) {
    this.selectedTab = tabName;
  }

  setStatus(contract: any, newStatus: any) {
    var contractId = contract.contractId;
    var oldStatus = TransformStatusPipe.prototype.transform(contract);

    if(newStatus === 'Approve')
      newStatus = 'Approved';
    else if(newStatus === 'Deny')
      newStatus = 'Denied';

    if (oldStatus === newStatus) {
      console.log('Novi status je isti kao trenutni. Nema potrebe za pozivom API-ja.');
      return;
    }

    if (contractId) {
      if (newStatus === 'Approved') {
        this.otcService.approveOTC(contractId).subscribe(
          (response) => {
            console.log('Response to successfully changing status:' + response);
            location.reload();
          },
          (error) => {
            console.error('Error updating status, this is response: ' + error);
          }
        );

      } else if(newStatus === 'Denied') {
        this.otcService.denyOTC(contractId).subscribe(
          (response) => {
            console.log('Response to successfully changing status:' + response);
            location.reload();
          },
          (error) => {
            console.error('Error updating status, this is response: ' + error);
          }
        );
      }
    } else {
      console.error('Contract ID not found for OTC', contract);
    }
  }

}
