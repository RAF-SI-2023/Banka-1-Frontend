import {Component, OnInit} from '@angular/core';
import {DatePipe, NgForOf} from "@angular/common";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Forex} from "../../../model/model";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-forex-table',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    DatePipe
  ],
  templateUrl: './forex-table.component.html',
  styleUrl: '../../security-list.component.css'
})
export class ForexTableComponent implements OnInit {
  forex: Forex[] = [];
  forexBackup: Forex[] = [];
  quoteCurrencyFilter: string = '';
  baseCurrencyFilter: string = '';
  _router: Router;
this: any;
  constructor(private http: HttpClient, router: Router) {
    this._router = router;
  }

  search() {
    this.forex = this.forexBackup.filter(value =>
    {
      return value.baseCurrency.toLowerCase().includes(this.baseCurrencyFilter.toLowerCase())
      && value.quoteCurrency.toLowerCase().includes(this.quoteCurrencyFilter.toLowerCase())
    });
  }

  ngOnInit(){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });
    this.http.get<Forex[]>(environment.marketService + '/market/listing/get/forex', {headers})
      .subscribe(res => this.forexBackup = this.forex = res.map(val => { val.lastRefresh *= 1000; return val; }));
  }

  navigateToForex(forexId: number): void {
    this._router.navigateByUrl(`/forex/${forexId}`);
  }

}
