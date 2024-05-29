import { Component, OnInit } from '@angular/core';
import { BankAccount, Exchange, Payment, Card } from '../model/model';
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

@Component({
  selector: 'app-bank-accounts-and-cards',
  standalone: true,
    imports: [DatePipe, NgForOf, NgIf, CommonModule, FormsModule],
  templateUrl: './bank-accounts-and-cards.component.html',
  styleUrl: './bank-accounts-and-cards.component.css'
})
export class BankAccountsAndCardsComponent implements OnInit {
  public userBankAccounts: BankAccount[] = [];
  public userCards: Card[] = [];
  activeTab: string = 'paymentsTab';
  displayedIndex: number = -1;
  displayedPayments: Payment[] = [];
  displayedExchanges:Exchange[] = [];
  displayedModel: any  = {};

  loggedUserId: number = -1;
  type: string = '';

  constructor(private bankAccountService: BankAccountService, private cardService: CardService, private router: Router, private dialog: MatDialog, private paymentService: PaymentService, private activatedRoute: ActivatedRoute) {
    let loggedUserIdAsString = sessionStorage.getItem('loggedUserID');

    if (loggedUserIdAsString !== null) {
      this.loggedUserId = parseInt(loggedUserIdAsString);
    } else {
      console.log('Error occurred: logged user id cannot be null!');
    }

    if(this.activatedRoute.snapshot.data['type'] === 'bankAccount'){
      this.loadUsersBankAccounts();
      this.type = 'bankAccount';
    } else {
      this.loadUserCards();
      this.type = 'card';
    }
  }

  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
  }

  ngOnInit() {
    if(this.activatedRoute.snapshot.data['type'] === 'bankAccount'){
      this.loadUsersBankAccounts();
      this.type = 'bankAccount';
    } else {
      this.loadUserCards();
      this.type = 'card';
    }
  }

  loadUsersBankAccounts() {
    this.bankAccountService.getUsersBankAccounts(this.loggedUserId).subscribe(
      (usersBankAccountsFromDB: BankAccount[]) => {
        this.userBankAccounts = usersBankAccountsFromDB;

        //If user do not have any bank acc set idx to -1 else display 0th bank account
        if(usersBankAccountsFromDB.length > 0)
        {
          this.displayedIndex = 0;
          this.displayedModel = usersBankAccountsFromDB[this.displayedIndex] as BankAccount;
          this.loadPaymentsForBankAccount(this.displayedModel.accountNumber!);
          this.loadExchangesForBankAccount(this.displayedModel.accountNumber!);
        }

        console.log('User bank acc from db');
        console.log(this.userBankAccounts);
      },
      (error: HttpErrorResponse) => {
        console.error('Error loading users:', error);
      }
    );
  }

  loadUserCards() {
    this.cardService.getUsersCards(this.loggedUserId).subscribe(
      (userCardsFromDB: Card[]) => {
        this.userCards = userCardsFromDB;

        //If user do not have any bank acc set idx to -1 else display 0th bank account
        if(userCardsFromDB.length > 0)
        {
          this.displayedIndex = 0;
          this.displayedModel = userCardsFromDB[this.displayedIndex] as Card;
          this.loadPaymentsForBankAccount(this.displayedModel.accountNumber!);
          this.loadExchangesForBankAccount(this.displayedModel.accountNumber!);
        }

        console.log('User cards from db');
        console.log(this.userCards);
      },
      (error: HttpErrorResponse) => {
        console.error('Error loading users:', error);
      }
    );
  }

  loadPaymentsForBankAccount(accountNumber: string) {
    this.bankAccountService.getPaymentsForAccount(accountNumber).subscribe(
      (bankAccountTransactionsFromDB: Payment[]) => {
        this.displayedPayments = bankAccountTransactionsFromDB;

        console.log('Bank acc payments from db');
        console.log(this.displayedPayments);
      },
      (error: HttpErrorResponse) => {
        console.error('Error loading payments:', error);
      }
    );
  }

  loadExchangesForBankAccount(accountNumber: string) {
    this.bankAccountService.getExchangesForAccount(accountNumber).subscribe(
      (bankAccountExchangesFromDB: Exchange[]) => {
        this.displayedExchanges = bankAccountExchangesFromDB;

        console.log('Bank acc exchanges from db');
        console.log(this.displayedExchanges);
      },
      (error: HttpErrorResponse) => {
        console.error('Error loading users:', error);
      }
    );
  }

  incrementDisplayedModelIndex()
  {
    //increment index if currently displayed account isn't the rightmost one
    if(this.type === 'bankAccount') {
      if(this.displayedIndex < this.userBankAccounts.length-1) {
        this.displayedIndex++;
        this.displayedModel = this.userBankAccounts[this.displayedIndex];
        this.loadPaymentsForBankAccount(this.displayedModel.accountNumber!);
        this.loadExchangesForBankAccount(this.displayedModel.accountNumber!);
      }
    } else if (this.type === 'card') {
      if(this.displayedIndex < this.userCards.length-1) {
        this.displayedIndex++;
        this.displayedModel = this.userCards[this.displayedIndex];
        this.loadPaymentsForBankAccount(this.displayedModel.accountNumber!);
        this.loadExchangesForBankAccount(this.displayedModel.accountNumber!);
      }
    }
  }

  decrementDisplayedModelIndex()
  {
    //increment index if currently displayed account isn't the leftmost one
    if(this.displayedIndex > 0)
    {
      this.displayedIndex--;
      if(this.type === 'bankAccount') {
        this.displayedModel = this.userBankAccounts[this.displayedIndex];
        this.loadPaymentsForBankAccount(this.displayedModel.accountNumber!);
        this.loadExchangesForBankAccount(this.displayedModel.accountNumber!);
      } else if (this.type === 'card') {
        this.displayedModel = this.userCards[this.displayedIndex];
        this.loadPaymentsForBankAccount(this.displayedModel.accountNumber!);
        this.loadExchangesForBankAccount(this.displayedModel.accountNumber!);
      }
    }
  }

  newPaymentOnClick(){
    console.log("New payment button clicked for account " + this.displayedModel);
    this.paymentService.setSelectedBankAccount(this.displayedModel as BankAccount);
    this.router.navigate(['/payment']);
  }

  moreInfoOnClick(){
    console.log("More info clicked for account " + this.displayedModel.accountNumber);
    if(this.type === 'bankAccount'){
      const dialogRef = this.dialog.open(AccountDetailsPopUpComponent, {
        width: '40vw',
        height: 'auto',
        data: this.displayedModel, // Passing the displayed bank account
        disableClose: false // Prevents closing the dialog by clicking outside or pressing ESC
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        console.log('The dialog was closed');
      });
    } else if (this.type === 'card'){
        const dialogRef = this.dialog.open(CardDetailsPopupComponent, {
          panelClass: 'rounded-dialog',
          data: { card: this.displayedModel }
        });
    }
  }

  paymentInfoPopUp(idx: number){
    const dialogRef = this.dialog.open(PaymentDetailsPopUpComponent, {
      width: '50vw',
      height: 'auto',
      data: this.displayedPayments[idx], // Passing the displayed bank account
      disableClose: false // Prevents closing the dialog by clicking outside or pressing ESC
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      console.log('The dialog was closed');
    });
  }

  exchangeInfoPopUp(idx: number){
    const dialogRef = this.dialog.open(ExchangeDetailsPopUpComponent, {
      width: '50vw',
      height: 'auto',
      data: this.displayedExchanges[idx], // Passing the displayed bank account
      disableClose: false // Prevents closing the dialog by clicking outside or pressing ESC
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      console.log('The dialog was closed');
    });
  }

  shouldShowLeftArrow(): boolean {
    return this.displayedIndex == 0;
  }

  shouldShowRightArrow(): boolean {
    if(this.type === 'bankAccount'){
      return this.displayedIndex == this.userBankAccounts.length - 1;
    } else {
      return this.displayedIndex == this.userCards.length - 1;
    }
  }
}
