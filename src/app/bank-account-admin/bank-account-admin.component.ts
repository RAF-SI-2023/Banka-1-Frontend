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
import { Profit } from '../model/model';


@Component({
  selector: 'app-bank-account-admin',
  standalone: true,
  imports: [DatePipe, NgForOf, NgIf, CommonModule, FormsModule],
  templateUrl: './bank-account-admin.component.html',
  styleUrl: './bank-account-admin.component.css'
})
export class BankAccountAdminComponent implements OnInit {
  public userBankAccounts: BankAccount[] = [];
  loggedUserId: number = -1;

  constructor(private bankAccountService: BankAccountService, private cardService: CardService, private router: Router, private dialog: MatDialog, private paymentService: PaymentService, private activatedRoute: ActivatedRoute) {
    let loggedUserIdAsString = sessionStorage.getItem('loggedUserID');
    if (loggedUserIdAsString !== null) {
      this.loggedUserId = parseInt(loggedUserIdAsString);
    } else {
      console.log('Error occurred: logged user id cannot be null!');
    }
  }

  

  ngOnInit() {
      this.loadBankAccounts();
  }

  loadBankAccounts() {

    //Zakomentarisati kada bek bude odradjen

    this.userBankAccounts = [
      {
        accountNumber: '215215215225',
        currency:'RSD',
        balance:15000,
        reservedResources:2000,
        availableBalance:24500
      },
      {
        accountNumber: '636363631316',
        currency:'RSD',
        balance:15000,
        reservedResources:2000,
        availableBalance:24500
      },
      {
        accountNumber: '61637237327',
        currency:'RSD',
        balance:15000,
        reservedResources:2000,
        availableBalance:24500
      }
    ];  

    // Potrebno je bek da uradi da se za ulogovanog admina vrate svi BankAccount te banke (Kada odrade otkomentarisati i prilagoditi odgovarajucu putanju GET poziva)
   
    // this.bankAccountService.getAdminsBankAccounts(this.loggedUserId).subscribe(
    //   (usersBankAccountsFromDB: BankAccount[]) => {
    //     this.userBankAccounts = usersBankAccountsFromDB;
    //   },
    //   (error: HttpErrorResponse) => {
    //     console.error('Error loading users:', error);
    //   }
    // );

  }


  navigateToDetails(accountNumber: string|undefined) {
    this.router.navigate(['/transaction-details-admin', accountNumber]);
  }

}
