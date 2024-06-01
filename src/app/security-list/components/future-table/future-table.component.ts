import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Future} from "../../../model/model";
import {environment} from "../../../../environments/environment";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {DatePipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-future-table',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    DatePipe
  ],
  templateUrl: './future-table.component.html',
  styleUrl: '../../security-list.component.css'
})
export class FutureTableComponent {
  futures: Future[] = [];
  futuresBackup: Future[] = [];
  _router: Router;
  searchString = '';
  constructor(private http: HttpClient, router: Router) {
    this._router = router;
  }

  ngOnInit(){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });
    this.http.get<Future[]>(environment.marketService + '/market/listing/get/futures', {headers})
      .subscribe(res => this.futuresBackup = this.futures = res.map(val => { val.settlementDate *= 1000; val.lastRefresh *= 1000; return val; }));
  }

  search() {
    this.futures = this.futuresBackup.filter(val => val.ticker.toLowerCase().includes(this.searchString.toLowerCase())
      || val.name.toLowerCase().includes(this.searchString.toLowerCase()));
  }

  navigateToFuture(listingId: any) {
    this._router.navigateByUrl(`/future/${listingId}`);
  }
}
