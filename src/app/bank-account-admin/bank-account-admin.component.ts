import { Component, OnInit } from '@angular/core';
import {BankAccount, User} from '../model/model';
import { CommonModule, DatePipe, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BankAccountService } from '../service/bank-account.service';
import { HttpErrorResponse } from '@angular/common/http';
import {GrayButtonModule} from "../welcome/redesign/GrayButton";
import {OrangeButtonModule} from "../welcome/redesign/OrangeButton";
import {TableComponentModule} from "../welcome/redesign/TableComponent";
import {TableComponentMarginModule} from "../welcome/redesign/TableComponentMargin";
import {TableComponentBankAccountModule} from "../welcome/redesign/TableComponentBankAccount";
import {UserService} from "../service/employee.service";
import {TransformBankAccountsPipe} from "../transform-bank-accounts.pipe";

@Component({
  selector: 'app-bank-account-admin',
  standalone: true,
  imports: [DatePipe, NgForOf, NgIf, CommonModule, FormsModule, GrayButtonModule, OrangeButtonModule, TableComponentModule, TableComponentMarginModule, TableComponentBankAccountModule, TransformBankAccountsPipe],
  templateUrl: './bank-account-admin.component.html',
  styleUrl: './bank-account-admin.component.css'
})
export class BankAccountAdminComponent implements OnInit {
  headers = ['Bank Account', 'Currency', 'Account Balance', 'Reserved', 'Available'];
  selectedTab: string = 'bank_accounts';
  public bankAccounts: BankAccount[] = [];
  public mappedBankAccounts: any[] = [];
  loggedUserId: number = -1;
  user: User | undefined ;

  constructor(private bankAccountService: BankAccountService, private router: Router) {
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
    this.bankAccountService.getAdminBankAccounts(1).subscribe(
      (usersBankAccountsFromDB: BankAccount[]) => {
        this.bankAccounts = usersBankAccountsFromDB;
        console.log('Bank accounts loaded:', this.bankAccounts);
      },
      (error: HttpErrorResponse) => {
        console.error('Error loading bank accounts:', error);
      }
    );
  }

  navigateToDetails(accountNumber: string|undefined) {
    this.router.navigate(['/transaction-details-admin', accountNumber]);
  }

  setTab(tabName: string) {
    this.selectedTab = tabName;
  }
}
