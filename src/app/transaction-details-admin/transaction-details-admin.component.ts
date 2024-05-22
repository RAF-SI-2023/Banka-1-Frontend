import { Component, OnInit } from '@angular/core';
import { BankAccount, Exchange, Payment, Card, TransactionDetails } from '../model/model';
import { CommonModule, DatePipe, NgForOf, NgIf } from '@angular/common';
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

@Component({
  selector: 'app-transaction-details-admin',
  standalone: true,
  imports: [DatePipe, NgForOf, NgIf, CommonModule, FormsModule],
  templateUrl: './transaction-details-admin.component.html',
  styleUrl: './transaction-details-admin.component.css'
})
export class TransactionDetailsAdminComponent implements OnInit {
  accountNumber: string = '';  
  public transactions: TransactionDetails[] = [];


  constructor(private route: ActivatedRoute, private transactionService:TransactionService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.accountNumber = params.get('accountNumber')!;
    });
    this.loadTransactionsDetails();

  }

  loadTransactionsDetails() {

    //Zakomentarisati kada bek bude odradjen
    this.transactions = [
      {
        senderAccountNumber: '215215215225',
        recipientAccountNumber: '5215215215225',
        amount: 15000,
        transactionDate: 2000,
        status: 'denied',
        recipientName: 'bu',
        referenceNumber: '0222',
        paymentCode: 0,
        purposeOfPayment: 'sui',
        senderName: 'undefined',
        commission: 0,
        channel: 'sss',
        currency: 'undefined'
      },
      {
        senderAccountNumber: '14515215225',
        recipientAccountNumber: '5215215215225',
        amount: 15000,
        transactionDate: 2000,
        status: 'denied',
        recipientName: 'bu',
        referenceNumber: '0222',
        paymentCode: 0,
        purposeOfPayment: 'sui',
        senderName: 'undefined',
        commission: 0,
        channel: 'sss',
        currency: 'undefined'
      },
      {
        senderAccountNumber: '3152152512512', 
        recipientAccountNumber: '5215215215225',
        amount: 15000,
        transactionDate: 2000,
        status: 'denied',
        recipientName: 'bu',
        referenceNumber: '0222',
        paymentCode: 0,
        purposeOfPayment: 'sui',
        senderName: 'undefined',
        commission: 0,
        channel: 'sss',
        currency: 'undefined'
      },
    ];  

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

}
