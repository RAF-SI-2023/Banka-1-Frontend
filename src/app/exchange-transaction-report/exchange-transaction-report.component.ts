import { Component } from '@angular/core';
import {GrayButtonModule} from "../welcome/redesign/GrayButton";
import {NgIf} from "@angular/common";
import {OrangeButtonModule} from "../welcome/redesign/OrangeButton";
import {TableComponentMarginModule} from "../welcome/redesign/TableComponentMargin";
import {ExchangeTransactionReport, Margin} from "../model/model";
import {HttpClient} from "@angular/common/http";
import {MarginService} from "../service/margin.service";
import {TableComponentModule} from "../welcome/redesign/TableComponent";
import {ExchangeTransactionReportService} from "../service/exchange-transaction-report.service";

@Component({
  selector: 'app-exchange-transaction-report',
  standalone: true,
  imports: [
    NgIf,
    TableComponentModule
  ],
  templateUrl: './exchange-transaction-report.component.html',
  styleUrl: './exchange-transaction-report.component.css'
})
export class ExchangeTransactionReportComponent {
  headersETR = ['Outflow account', 'Inflow account', 'Amount', 'Previous currency', 'Exchanged to', 'Profit' ];
  selectedTab: string = 'exchangeTransactions';
  exchangedTransactions: ExchangeTransactionReport[] = [];

  constructor(private http: HttpClient, private etrService: ExchangeTransactionReportService) {}

  async ngOnInit() {
    this.loadExchangedTransactionReports();
  }

  async loadExchangedTransactionReports() {
    this.http.get<ExchangeTransactionReport[]>('/assets/mocked_banking_data/exchanged-transaction-reports-mocked.json').subscribe(data => {
      this.exchangedTransactions = data
      console.log("Exchanged Transaction Reports: ", this.exchangedTransactions);
    });

    // this.exchangedTransactions = await this.etrService.getAllExchangeTransactionReports();
  }

  setTab(tabName: string) {
    this.selectedTab = tabName;
  }

}
