import { Component, OnInit } from '@angular/core';
import {BankAccount, Exchange, Payment, Card, TransactionDetails, NewTransactionDto} from '../model/model';
import {CommonModule, DatePipe, Location, NgForOf, NgIf} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BankAccountService } from '../service/bank-account.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AccountDetailsPopUpComponent } from '../account-details-pop-up/account-details-pop-up.component';
import { MatDialog } from '@angular/material/dialog';
import { PaymentService } from '../service/payment.service';
import { PaymentDetailsPopUpComponent } from '../payment-details-pop-up/payment-details-pop-up.component';
import { ExchangeDetailsPopUpComponent } from '../exchange-details-pop-up/exchange-details-pop-up.component';
import { CardService } from "../service/card.service";
import { CardDetailsPopupComponent } from "../card-details-popup/card-details-popup.component";
import { Profit } from '../model/model';
import { TransactionService } from '../service/transaction.service';
import {TableComponentModule} from "../welcome/redesign/TableComponent";
import {TransformBankAccountDetailsPipe} from "../transform-bank-account-details.pipe";

@Component({
  selector: 'app-transaction-details-admin',
  standalone: true,
  imports: [DatePipe, NgForOf, NgIf, CommonModule, FormsModule, TableComponentModule, TransformBankAccountDetailsPipe],
  templateUrl: './transaction-details-admin.component.html',
  styleUrl: './transaction-details-admin.component.css'
})
export class TransactionDetailsAdminComponent implements OnInit {
  selectedTab: string = 'transaction';
  accountNumber: string = '';
  public transactions: NewTransactionDto[] = [];
  public mappedTransactions: any[] = [];
  public headers = ['Outflow account', 'Inflow account', 'Amount', 'Date and Time', 'Status'];

  constructor(private route: ActivatedRoute, private transactionService:TransactionService, private _location: Location) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.accountNumber = params.get('accountNumber')!;
    });

    this.loadTransactionsDetails();
  }

  loadTransactionsDetails() {
    //Zakomentarisati kada bek bude odradjen
    // this.transactions = [
    //   {
    //     senderAccountNumber: '215215215225',
    //     recipientAccountNumber: '5215215215225',
    //     amount: 15000,
    //     transactionDate: 2000,
    //     status: 'denied',
    //     recipientName: 'bu',
    //     referenceNumber: '0222',
    //     paymentCode: 0,
    //     purposeOfPayment: 'sui',
    //     senderName: 'undefined',
    //     commission: 0,
    //     channel: 'sss',
    //     currency: 'undefined'
    //   },
    //   {
    //     senderAccountNumber: '14515215225',
    //     recipientAccountNumber: '5215215215225',
    //     amount: 15000,
    //     transactionDate: 2000,
    //     status: 'denied',
    //     recipientName: 'bu',
    //     referenceNumber: '0222',
    //     paymentCode: 0,
    //     purposeOfPayment: 'sui',
    //     senderName: 'undefined',
    //     commission: 0,
    //     channel: 'sss',
    //     currency: 'undefined'
    //   },
    //   {
    //     senderAccountNumber: '3152152512512',
    //     recipientAccountNumber: '5215215215225',
    //     amount: 15000,
    //     transactionDate: 2000,
    //     status: 'denied',
    //     recipientName: 'bu',
    //     referenceNumber: '0222',
    //     paymentCode: 0,
    //     purposeOfPayment: 'sui',
    //     senderName: 'undefined',
    //     commission: 0,
    //     channel: 'sss',
    //     currency: 'undefined'
    //   },
    // ];

    this.transactionService.getAccountTransactions(this.accountNumber).subscribe(
      (transactionDetails: NewTransactionDto[]) => {
        this.transactions = transactionDetails;
        console.log('Transactions loaded:', this.transactions);
      },
      (error: HttpErrorResponse) => {
        console.error('Error loading Transactions:', error);
      }
    );

    // this.mappedTransactions = this.transactions.map(transaction => ({
    //   'Outflow account': transaction.senderAccountNumber,
    //   'Inflow account': transaction.recipientAccountNumber,
    //   'Amount': transaction.amount,
    //   'Date and Time': transaction.transactionDate,
    //   'Status': transaction.status
    // }));

    // Otkomentarisati kada se odradi bek za bank-acc-admin component

    // this.transactionService.getAccountTransactions(this.accountNumber).subscribe(
    //   (transactionsFromDB: TransactionDetails[]) => {
    //     this.transactions = transactionsFromDB;
    //   },
    //   (error: HttpErrorResponse) => {
    //     console.error('Error loading users:', error);
    //   }
    // );

  }

  setTab(tabName: string) {
    this.selectedTab = tabName;
  }

  goBack(): void {
    console.log('Going back to margin page...');
    this._location.back();
  }

}
