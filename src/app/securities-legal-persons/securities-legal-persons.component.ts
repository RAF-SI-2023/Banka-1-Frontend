import { Component } from '@angular/core';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {TableComponentModule} from "../welcome/redesign/TableComponent";
import {TransformForexPipe} from "../transform-forex.pipe";
import {TransformFuturePipe} from "../transform-future.pipe";
import {TransformOptionsPipe} from "../security-list/transform-options.pipe";
import {TransformSecurityPipe} from "../transform-security.pipe";
import {Forex, Future, ListingType, OptionsDto, OrderType, StockListing} from "../model/model";
import {Router} from "@angular/router";
import {SecurityService} from "../service/security.service";
import {OptionsService} from "../service/options.service";
import {OrderService} from "../service/order.service";
import {StockService} from "../service/stock.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {PopupService} from "../service/popup.service";
import {environment} from "../../environments/environment";
import {OrangeButtonModule} from "../welcome/redesign/OrangeButton";
import {FutureService} from "../service/future.service";

@Component({
  selector: 'app-securities-legal-persons',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    TableComponentModule,
    TransformFuturePipe,
    TransformOptionsPipe,
    TransformSecurityPipe,
    DatePipe,
    NgForOf,
    OrangeButtonModule,
  ],
  templateUrl: './securities-legal-persons.component.html',
  styleUrl: './securities-legal-persons.component.css'
})
export class SecuritiesLegalPersonsComponent {

  securities: StockListing[] = [];
  securitiesBackup: StockListing[] = [];
  selectedTab: string = 'stocks';
  symbol: string = '';

  futures: Future[] = [];
  futuresBackup: Future[] = [];
  _router: Router;

  forex: Forex[] = [];
  forexBackup: Forex[] = [];
  quoteCurrencyFilter: string = '';
  baseCurrencyFilter: string = '';

  options: any[] = [];

  isLegalPerson: boolean = false;

  constructor(
    private securityService: SecurityService,
    private futureService: FutureService,
    private optionsService: OptionsService,
    private orderService: OrderService,
    private stockService: StockService,
    private http: HttpClient,
    private popupService: PopupService,
    router: Router
  ) {
    this.isLegalPerson = sessionStorage.getItem('isLegalPerson') === 'true';

    if(!this.isLegalPerson){
      this.selectedTab = 'options'
    }
    this._router = router;
  }


  async ngOnInit() {
    await this.loadStocks();
    this.loadFutures();
    this.loadOptions()
  }

  async loadStocks(): Promise<void> {


    const stocks = await this.stockService.getStocks();

    console.log(stocks);

    this.securities = stocks;
    this.securitiesBackup = stocks;

    // this.stockMockData()
  }

  loadFutures(): void {
    this.futureService.getFutures().subscribe(response => {
      this.futures = this.futuresBackup = response.map(
        val => {
          val.settlementDate *= 1000;
          val.lastRefresh *= 1000;
          return val;
        }
      );
      console.log(response);
    });
  }




  loadOptions() {
    this.optionsService.getOptions().subscribe(response => {
      this.options = response;
    })
    // this.optionsDataMock()
  }


  setSelectedTab(tab: string) {
    console.log(tab);
    this.selectedTab = tab;
  }


  openBuyStockPopup(stockId: number, stockPrice: number): void{
    this.popupService.openBuyOrderPopup({id: stockId, type: ListingType.STOCK, price: stockPrice});
  }

  openBuyFuturePopup(futureId: number, futurePrice: number): void{
    this.popupService.openBuyOrderPopup({id: futureId, type: ListingType.FUTURE, price: futurePrice});
  }

  async buyOption(options: OptionsDto){
    let response = await this.orderService.buyOrderOptions(options.listingId.toString(), options.volume);
    if (response) {
      this.popupService.openCustomMessage({
        title: "Options",
        header: "Purchase Successful!",
        message: "Your stock option has been successfully bought."
      })
    } else {
      this.popupService.openCustomMessage({
        title: "Options",
        header: "Purchase Failed!",
        message: "You do not have sufficient funds to buy this stock option."
      })
    }
  }


  async refresh() {
    console.log('Refreshing');

    await this.refreshStocks();
    this.refreshFutures();
    this.refreshOptions()
  }

  async refreshStocks(): Promise<void> {

    const stocks = await this.stockService.getRefreshStocks();

    console.log(stocks);

    this.securities = stocks;
    this.securitiesBackup = stocks;

    // this.stockMockData()
  }

  refreshFutures(): void {
    this.futureService.getRefreshFutures().subscribe(response => {
      this.futures = this.futuresBackup = response.map(
        val => {
          val.settlementDate *= 1000;
          val.lastRefresh *= 1000;
          return val;
        }
      );
      console.log(response);
    });
  }


  refreshOptions() {
    this.optionsService.getRefreshOptions().subscribe(response => {
      this.options = response;
    })
    // this.optionsDataMock()
  }
}
