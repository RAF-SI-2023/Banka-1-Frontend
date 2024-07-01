import { Component } from '@angular/core';
import {GrayButtonModule} from "../welcome/redesign/GrayButton";
import {NgIf} from "@angular/common";
import {OrangeButtonModule} from "../welcome/redesign/OrangeButton";
import {TableComponentMarginModule} from "../welcome/redesign/TableComponentMargin";
import {ExchangeTransactionReport, Margin, TransferDto, TransfersReportDto} from "../model/model";
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
  headersETR = ['Inflow account','Outflow account','Amount', 'Date','Status','Exchanged to', 'Previous currency','Profit'];
  selectedTab: string = 'exchangeTransactions';
  exchangedTransactions: TransferDto[] = [];

  constructor(private http: HttpClient, private etrService: ExchangeTransactionReportService) {}

  async ngOnInit() {
    this.loadExchangedTransactionReports();
  }

  async loadExchangedTransactionReports() {
    const transfersReport: TransfersReportDto = await this.etrService.getAllExchangeTransactionReports();

    const transformedArray = transfersReport.transfers.map(item => {
      // Check if dateOfPayment is defined
      const date = item.dateOfPayment ? new Date(item.dateOfPayment * 1000).toLocaleDateString() : '';
  
      return {
          recipientAccount: item.recipientAccountNumber,
          senderAccount: item.senderAccountNumber,
          amount: item.amount,
          date: date,
          status: item.status,
          previousCurrency: item.previousCurrency || '', // Assuming 'senderAccountNumber' represents the previous currency
          exchangeTo: item.exchangeTo || '',    // Assuming 'recipientAccountNumber' represents the exchange to currency
          profit: item.profit || 0                     // Assuming 'commission' represents profit
      };
  });

    this.exchangedTransactions = transformedArray;

    

    console.log("BUUUU", this.exchangedTransactions);
  }

  setTab(tabName: string) {
    this.selectedTab = tabName;
  }

}
