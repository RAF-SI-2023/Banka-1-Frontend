import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf, Location} from "@angular/common";
import {MarginTransactionDetails} from "../model/model";
import {ActivatedRoute} from "@angular/router";
import {OrangeButtonModule} from "../welcome/redesign/OrangeButton";
import {TableComponentModule} from "../welcome/redesign/TableComponent";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-margin-transaction-details',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    OrangeButtonModule,
    TableComponentModule
  ],
  templateUrl: './margin-transaction-details.component.html',
  styleUrl: './margin-transaction-details.component.css'
})
export class MarginTransactionDetailsComponent implements OnInit {
  headersMargins = ['Order', 'Customer', 'Type', 'Investment', 'Date', 'Interest', 'Borrowed Money', 'Maintenance Margin'];
  selectedTab: string = 'transaction';
  accountNumber: string = '';
  public marginTransactions: MarginTransactionDetails[] = [];


  constructor(private route: ActivatedRoute, private http: HttpClient, private _location: Location) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.accountNumber = params.get('accountNumber')!;
    });
    this.loadMarginTransactionsDetails();

  }

  async loadMarginTransactionsDetails() {
    this.http.get<MarginTransactionDetails[]>('/assets/mocked_banking_data/margin-transactions-mocked.json').subscribe(data => {
      this.marginTransactions = data
      console.log('Margin Transactions:', this.marginTransactions);
    });

  }

  setTab(tabName: string) {
    this.selectedTab = tabName;
  }

  goBack(): void {
    console.log('Going back to margin page...');
    this._location.back();
  }

}
