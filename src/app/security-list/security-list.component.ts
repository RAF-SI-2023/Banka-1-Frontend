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
import { Forex, Future, StockListing } from '../model/model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { TransformFuturePipe } from '../transform-future.pipe';
import { TransformForexPipe } from '../transform-forex.pipe';

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

  forex: Forex[] = [];
  forexBackup: Forex[] = [];
  quoteCurrencyFilter: string = '';
  baseCurrencyFilter: string = '';

  constructor(
    private securityService: SecurityService,
    private stockService: StockService,
    private http: HttpClient,
    router: Router
  ) {
    this._router = router;
  }

  searchFutures() {
    this.futures = this.futuresBackup.filter(
      (val) =>
        val.ticker.toLowerCase().includes(this.symbol.toLowerCase())
    );
  }

  searchForex() {
    this.forex = this.forexBackup.filter((value) => {
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
        this.searchForex();
        break;
      case 'stocks':
        this.searchStocks();
    }
  }

  async ngOnInit() {
    this.loadSecurities();
    this.loadFutures();
    this.loadForex();
  }

  async loadSecurities(): Promise<void> {


    const stocks = await this.stockService.getStocks();

    console.log(stocks);

    this.securities = stocks;
    this.securitiesBackup = stocks;
  }

  loadForex(): void {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + sessionStorage.getItem('jwt'),
    });
    this.http
      this.http.get<Forex[]>(environment.marketService + '/market/listing/get/forex', {headers})
      .subscribe(
        (res) =>
          (this.forexBackup = this.forex =
            res.map((val) => {
              val.lastRefresh *= 1000;
              return val;
            }))
      );
  }

  loadFutures(): void {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + sessionStorage.getItem('jwt'),
    });
    this.http
      this.http.get<Future[]>(environment.marketService + '/market/listing/get/futures',{ headers })
      .subscribe(
        (res) =>
          (this.futuresBackup = this.futures =
            res.map((val) => {
              val.settlementDate *= 1000;
              val.lastRefresh *= 1000;
              return val;
            }))
      );
  }

  setSelectedTab(tab: string) {
    console.log(tab);
    this.selectedTab = tab;
  }

  navigateToFuture(listingId: any) {
    this._router.navigateByUrl(`/security/future/${listingId}`);
  }

  navigateToForex(forexId: number): void {
    this._router.navigateByUrl(`/security/forex/${forexId}`);
  }

  navigateToStock(stockId: number): void {
    console.log(stockId);
    this._router.navigateByUrl(`/security/stock/${stockId}`);
  }

}
