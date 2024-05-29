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
import { ProfitService } from '../service/profit.service';

@Component({
  selector: 'app-bank-profit',
  standalone: true,
  imports: [DatePipe, NgForOf, NgIf, CommonModule, FormsModule],
  templateUrl: './bank-profit.component.html',
  styleUrl: './bank-profit.component.css'
})
export class BankProfitComponent implements OnInit {
  public profits:Profit[]=[];
  public sum:number=0;
  loggedUserId: number = -1;

  constructor(private bankAccountService: BankAccountService, private cardService: CardService, private router: Router, private dialog: MatDialog, private paymentService: PaymentService, private activatedRoute: ActivatedRoute,private profitService:ProfitService) {
    let loggedUserIdAsString = sessionStorage.getItem('loggedUserID');
    if (loggedUserIdAsString !== null) {
      this.loggedUserId = parseInt(loggedUserIdAsString);
    } else {
      console.log('Error occurred: logged user id cannot be null!');
    }
  }

  

  ngOnInit() {
      this.loadProfits();
      this.calculateTotalProfit();

  }

  loadProfits() {

    this.profits = [
      {
        name: 'Milan Aleksic',
        totalProfit: 15000,
        phoneNumber: '123-456-7890',
        email: 'banka@example.com'
      },
      {
        name: 'Petar Popovic',
        totalProfit: 12000,
        phoneNumber: '098-765-4321',
        email: 'bankb@example.com'
      },
      {
        name: 'Ana Maljkovic',
        totalProfit: 18000,
        phoneNumber: '555-555-5555',
        email: 'bankc@example.com'
      }
    ];  

    
    // Otkomentarisati kada bek odradi svoj deo za Profit

    // this.profitService.getProfitsByAgents(this.loggedUserId).subscribe(
    //   (profitsFromDB: Profit[]) => {
    //     this.profits = profitsFromDB;
    //   },
    //   (error: HttpErrorResponse) => {
    //     console.error('Error loading users:', error);
    //   }
    // );
    
  }

  calculateTotalProfit() {

    // 1) racunati od svih agenata zbir ostvarenog profita
    this.sum = this.profits.reduce((acc, profit) => acc + profit.totalProfit, 0);

    // 2) preko servisa

    //  this.profitService.getAllProfit(this.loggedUserId).subscribe(
    //   (profit: number) => {
    //     this.sum = profit;
    //   },
    //   (error: HttpErrorResponse) => {
    //     console.error('Error loading users:', error);
    //   }
    // );
  }

  
}

