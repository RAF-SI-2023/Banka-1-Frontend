import { Component, OnInit } from '@angular/core';
import { NgForOf } from "@angular/common";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ExchangeRate, TransformedExchangeRate } from "../model/model";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { OrangeButtonModule } from "../welcome/redesign/OrangeButton";
import { TableComponentModule } from "../welcome/redesign/TableComponent";
import { TransparentTextFieldModule } from "../welcome/redesign/TransparentTextField";

@Component({
  selector: 'app-exchange-rate',
  standalone: true,
  templateUrl: './exchange-rate.component.html',
  styleUrl: './exchange-rate.component.css',
  imports: [NgForOf,
    FormsModule, OrangeButtonModule, TableComponentModule, TransparentTextFieldModule]
})
export class ExchangeRateComponent implements OnInit {
  exchange: ExchangeRate[] = [];
  exchangeBackup: ExchangeRate[] = [];
  transformedExchangeRates: TransformedExchangeRate[] = [];
  buyingFilter: string = '';
  sellingFilter: string = '';
  headers = ['Selling symbol', 'Buying symbol', 'Selling Price', 'Buying Price'];
  _router: Router;
  searchString = ""
  this: any;
  constructor(private http: HttpClient, router: Router,) {
    this._router = router;
  }

  search() {
    this.transformedExchangeRates = this.transform(this.exchangeBackup);
    this.transformedExchangeRates = this.transformedExchangeRates.filter(value => {
      debugger;
      return value.baseCurrency.toLowerCase().includes(this.sellingFilter.toLowerCase())
        && value.quoteCurrency.toLowerCase().includes(this.buyingFilter.toLowerCase())
    });
  }
  transform(exchangeArray: ExchangeRate[]): any[] {
    const uniquePairs = new Map();

    exchangeArray.forEach(rate => {
      const symbols = [rate.baseCurrency, rate.quoteCurrency].sort();
      const pairKey = symbols.join('/');

      if (!uniquePairs.has(pairKey)) {
        uniquePairs.set(pairKey, {
          baseCurrency: symbols[0],
          quoteCurrency: symbols[1],
          buyingPrice: null,
          sellingPrice: null,
        });
      }
    });

    exchangeArray.forEach(rate => {
      const symbols = [rate.baseCurrency, rate.quoteCurrency].sort();
      const pairKey = symbols.join('/');
      const pair = uniquePairs.get(pairKey);

      if (rate.baseCurrency === symbols[0] && rate.quoteCurrency === symbols[1]) {
        pair.sellingPrice = rate.rate;
      } else {
        pair.buyingPrice = rate.rate;
      }
    });

    return Array.from(uniquePairs.values()).sort((a, b) => {
      return a.baseCurrency.localeCompare(b.baseCurrency) || a.quoteCurrency.localeCompare(b.quoteCurrency);
    });
  }

  ngOnInit() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });
    this.http.get<ExchangeRate[]>(environment.userService + '/transfer/exchangeRates', { headers })
      .subscribe(res => {
        this.exchangeBackup = this.exchange = res
        this.transformedExchangeRates = this.transform(this.exchangeBackup);
      });
  }
}
