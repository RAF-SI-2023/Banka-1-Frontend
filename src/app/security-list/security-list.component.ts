import { Component } from '@angular/core';
import { Security, SecurityService } from '../service/security.service';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ForexTableComponent } from './components/forex-table/forex-table.component';
import { StockService } from '../service/stock.service';
import { FormsModule } from '@angular/forms';
import { StockTableComponent } from './components/stock-table/stock-table.component';
import { FutureTableComponent } from './components/future-table/future-table.component';
import { TableComponentModule } from '../welcome/redesign/TableComponent';
import { TransformSecurityPipe } from '../transform-security.pipe';
import {Forex, Future, ListingType, OptionsDto, OrderType, StockListing} from '../model/model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { TransformFuturePipe } from '../transform-future.pipe';
import { TransformForexPipe } from '../transform-forex.pipe';
import {PopupService} from "../service/popup.service";
import {TransformOptionsPipe} from "./transform-options.pipe";
import {OptionsService} from "../service/options.service";
import {OrderService} from "../service/order.service";
import {ForexService} from "../service/forex.service";
import {FutureService} from "../service/future.service";

@Component({
  selector: 'app-security-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    StockTableComponent,
    ForexTableComponent,
    FutureTableComponent,
    TableComponentModule,
    TransformSecurityPipe,
    TransformFuturePipe,
    TransformForexPipe,
    TransformOptionsPipe
  ],
  templateUrl: './security-list.component.html',
  styleUrl: './security-list.component.css',
})
export class SecurityListComponent {
  securities: StockListing[] = [];
  securitiesBackup: StockListing[] = [];
  selectedTab: string = 'stocks';
  symbol: string = '';

  futures: Future[] = [];
  futuresBackup: Future[] = [];
  _router: Router;

  forexes: Forex[] = [];
  forexesBackup: Forex[] = [];
  quoteCurrencyFilter: string = '';
  baseCurrencyFilter: string = '';

  options: any[] = [];

  constructor(
    private stockService: StockService,
    private futureService: FutureService,
    private forexService: ForexService,
    private optionsService: OptionsService,
    private orderService: OrderService,
    private popupService: PopupService,
    router: Router
  ) {
    this.selectedTab = 'options'
    this._router = router;
  }

  async ngOnInit() {
    await this.loadStocks();
    this.loadFutures();
    this.loadForexes();
    this.loadOptions()
    console.log("Loaded everything")
  }

  searchFutures() {
    this.futures = this.futuresBackup.filter(
      (val) =>
        val.ticker.toLowerCase().includes(this.symbol.toLowerCase())
    );

  }

  searchForexes() {
    this.forexes = this.forexesBackup.filter((value) => {
      return (
        value.ticker.toLowerCase().includes(this.symbol.toLowerCase())
      );
    });
  }

  searchStocks() {
    if (this.symbol.length === 0) this.securities = this.securitiesBackup;
    this.securities = this.securities.filter((stock) => {
      return stock.ticker.toLowerCase().includes(this.symbol.toLowerCase());
    });
  }

  search() {
    switch (this.selectedTab) {
      case 'future':
        this.searchFutures();
        break;
      case 'forex':
        this.searchForexes();
        break;
      case 'stocks':
        this.searchStocks();
    }
  }

  refresh() {

    console.log("Refreshing");
    this.refreshStocks();
    this.refreshFutures();
    this.refreshForexes();
  }

  async buyOption(options: OptionsDto){
    let response = await this.orderService.buyOrder(OrderType.BUY, options.listingId.toString(), ListingType.OPTIONS, options.volume, 0, 0, false);
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

  async loadStocks(): Promise<void> {
    const stocks = await this.stockService.getStocks();
    this.securities = stocks;
    this.securitiesBackup = stocks;
    // console.log(this.securities)
  }

  async refreshStocks(): Promise<void> {
    const stocks = await this.stockService.getRefreshStocks();
    this.securities = stocks;
    this.securitiesBackup = stocks;
    // console.log(this.securities)
  }

  loadForexes(): void {
    this.forexService.getForexes().subscribe(forexes => {
      this.forexes = this.forexesBackup = forexes.map(forex => {
        forex.lastRefresh *= 1000;
        return forex;
      });
      // console.log("Forexes:" + this.forexes)
    });
  }

  refreshForexes(): void {
    this.forexService.getRefreshForexes().subscribe(forexes => {
      this.forexes = this.forexesBackup = forexes.map(forex => {
        forex.lastRefresh *= 1000;
        return forex;
      });
      // console.log("Forexes:" + this.forexes)
    });
  }
  loadFutures(): void {
    this.futureService.getFutures().subscribe(futures => {
      this.futures = this.futuresBackup = futures.map(future => {
        future.settlementDate *= 1000;
        future.lastRefresh *= 1000;
        return future;
      });
      // console.log("Futures:" + this.futures)
    });
  }

  refreshFutures(): void {
    this.futureService.getRefreshFutures().subscribe(futures => {
      this.futures = this.futuresBackup = futures.map(future => {
        future.settlementDate *= 1000;
        future.lastRefresh *= 1000;
        return future;
      });
      // console.log("Futures:" + this.futures)
    });
  }

  loadOptions() {
    this.optionsService.getOptions().subscribe(response => {
      this.options = response;
      // console.log("Options:" + this.options)
    })
  }

  navigateToFuture(listingId: any) {
    this._router.navigateByUrl(`/security/future/${listingId}`);
  }

  navigateToForex(forexId: number): void {
    this._router.navigateByUrl(`/security/forex/${forexId}`);
  }

  navigateToStock(stockId: number): void {
    this._router.navigateByUrl(`/security/stock/${stockId}`);
  }

  setSelectedTab(tab: string) {
    this.selectedTab = tab;
  }

}
