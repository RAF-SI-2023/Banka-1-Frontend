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
    let transfersReport: TransfersReportDto = { profit: 0, transfers: [] };
    
    this.etrService.getAllExchangeTransactionReports().subscribe(
      (transfers: TransfersReportDto) => {
        transfersReport = transfers;
        console.log("Transferss" + transfers.transfers.length);

        // Transform the data after receiving the report
        const transformedArray = transfersReport.transfers.map(item => {
          // Check if dateOfPayment is defined
          const date = item.dateOfPayment ? new Date(item.dateOfPayment * 1000).toLocaleDateString() : '';

          return {
            recipientAccount: item.recipientAccountNumber,
            senderAccount: item.senderAccountNumber,
            amount: item.amount,
            date: date,
            status: item.status,
            previousCurrency: item.previousCurrency || '##', 
            exchangeTo: item.exchangedTo || '##',    
            profit: item.profit || 0                     
          };
        });

        this.exchangedTransactions = transformedArray;
        console.log("BUUUU", this.exchangedTransactions);
      }
    );
}


  setTab(tabName: string) {
    this.selectedTab = tabName;
  }

}
