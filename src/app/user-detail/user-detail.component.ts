import {Component, OnInit} from '@angular/core';
import {CommonModule, DatePipe, Location} from "@angular/common";
import {BankAccountService} from "../service/bank-account.service";
import {BankAccount, Card, Customer} from "../model/model";
import {ActivatedRoute} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {UserService} from "../service/employee.service";
import {CardService} from "../service/card.service";
import {objectUtil} from "zod";
import addQuestionMarks = objectUtil.addQuestionMarks;
import { CustomerService } from '../service/customer.service';
import { PopupService } from '../service/popup.service';
import {TableComponentModule} from "../welcome/redesign/TableComponent";
import {AuthService} from "../service/auth.service";
import {OrangeButtonModule} from "../welcome/redesign/OrangeButton";

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, TableComponentModule, OrangeButtonModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit {
  customerId: number | undefined = -1;
  userName: string = "";
  bankAccounts: any[] = [];
  cards: any[] = [];
  selectedTab: string = "cards";
  headersCards = ['Crad number', 'Type', 'Name', 'Creation Date',
    'Expiration Date', 'Account number', 'CVV', 'Limit', 'Status'];
  heaersBankAcc =['Number', 'Type', 'Status', 'Currency', 'Balance', 'Availabe balance'];

  constructor(private bankAccountService: BankAccountService,
              private customerService: CustomerService,
              private route: ActivatedRoute,
              private cardService: CardService,
              private popup: PopupService,
              private authService: AuthService,
              private userService: UserService,
              private _location: Location) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userName = params['customerName'];
      this.customerId = params["customerId"];
    });

    this.loadBankAccountTable()
    this.loadCardsTable();
  }

  setSelectedTab(tab: string) {
    console.log(tab)
    this.selectedTab = tab;
  }

  loadBankAccountTable() {
    if (this.customerId !== -1 && this.customerId !== undefined) {
      this.bankAccountService.getUsersBankAccounts(this.customerId).subscribe(
        response => {
          response.map(bankAcc =>{
            const obj = {
              'Number': bankAcc.accountNumber,
              'Type': bankAcc.accountType,
              'Status': bankAcc.accountStatus,
              'Currency': bankAcc.currency,
              'Balance': bankAcc.balance,
              'Available balance': bankAcc.availableBalance
            }
            this.bankAccounts.push(obj);
          })
          // this.bankAccounts = response;
        }
      )
    }
  }

  loadCardsTable(){
    if (this.customerId !== -1 && this.customerId !== undefined) {
      this.cardService.getUsersCards(this.customerId).subscribe(
        response => {
          response.map(card => {
            let isActive;
            if (card.isActivated)
              isActive = "active"
            else isActive = "inactive"


            var creationDate = new Date();
            var expDate = new Date();

            if(card.expirationDate != undefined && card.creationDate != undefined){
              creationDate = new Date(card.creationDate * 1000);
              expDate = new Date(card.expirationDate * 1000);
            }

            const formattedCrDate = this.formatDate(creationDate);
            const formattedExpDate = this.formatDate(expDate);

            const obj = {
              'Card number': card.cardNumber,
              'Type': card.cardType,
              'Name': card.cardName,
              'Creation Date': formattedCrDate,
              'Expiration Date': formattedExpDate,
              'Account number': card.accountNumber,
              'CVV': card.cvv,
              'Limit': card.cardLimit,
              'Status': isActive,
            }
            this.cards.push(obj);
          })
        }
      )
    }
  }

  popupNewAccount(){
    this.popup.openAddBankAccountPopup();
  }

  selectTab(tab: string){
    this.selectedTab = tab;
  }

  formatDate(date: Date): string {
    const day: number = date.getDate();
    const month: number = date.getMonth() + 1; // Months are zero-based, so we add 1
    const year: number = date.getFullYear();

    // Ensure leading zeros for day and month if needed
    const formattedDay: string = day < 10 ? '0' + day : day.toString();
    const formattedMonth: string = month < 10 ? '0' + month : month.toString();

    // Return the formatted date string in the format "dd-MM-yyyy"
    return formattedDay + '-' + formattedMonth + '-' + year;
  }

  goBack(): void {
    console.log('Going back to customer page...');
    this._location.back();
  }

}
