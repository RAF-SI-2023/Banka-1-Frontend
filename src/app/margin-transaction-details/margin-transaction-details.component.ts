import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf, Location} from "@angular/common";
import {Margin, MarginTransactionDetails} from "../model/model";
import {ActivatedRoute} from "@angular/router";
import {OrangeButtonModule} from "../welcome/redesign/OrangeButton";
import {TableComponentModule} from "../welcome/redesign/TableComponent";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {MarginService} from "../service/margin.service";
import {TransformMarginDetailsPipe} from "../transform-margin-details.pipe";

@Component({
  selector: 'app-margin-transaction-details',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    OrangeButtonModule,
    TableComponentModule,
    TransformMarginDetailsPipe
  ],
  templateUrl: './margin-transaction-details.component.html',
  styleUrl: './margin-transaction-details.component.css'
})
export class MarginTransactionDetailsComponent implements OnInit {
  headersMargins = ['Order', 'Customer', 'Type', 'Investment', 'Date', 'Interest', 'Borrowed Money', 'Maintenance Margin'];
  selectedTab: string = 'margin-transaction';
  accountNumber: string = '';
  marginId: number = 0;
  public marginTransactions: MarginTransactionDetails[] = [];


  constructor(private route: ActivatedRoute, private marginService: MarginService, private _location: Location) { }

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.marginId = params['marginId'];
      this.accountNumber = params["accountNumber"];
    });
    this.loadMarginTransactionsDetails();
  }

  async loadMarginTransactionsDetails() {
    this.marginService.getAllMarginTransactions(this.marginId).subscribe(
      (marginTransactions: MarginTransactionDetails[]) => {
        this.marginTransactions = marginTransactions;
        console.log("Margins transaction details: ", this.marginTransactions);
      },
      (error: HttpErrorResponse) => {
        console.error('Error loading margins transaction details:', error);
      }
    );
  }

  setTab(tabName: string) {
    this.selectedTab = tabName;
  }

  goBack(): void {
    console.log('Going back to margin page...');
    this._location.back();
  }
}
