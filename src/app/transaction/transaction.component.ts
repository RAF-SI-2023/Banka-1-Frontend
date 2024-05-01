import { Component, OnInit  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Account, AccountType, TransactionBasics, User } from '../model/model';
import { UserService } from '../service/employee.service';
import { PopupService } from '../service/popup.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { TransactionService } from '../service/transaction.service';
import { AccountService } from '../service/account.service';
import { CustomerService } from '../service/customer.service';
@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent implements OnInit{
  transaction: TransactionBasics = {
    senderAccountNumber: '',
    recipientAccountNumber: '',
    amount: '',
  };

  outflowAccounts: Account[] = [];
  inflowAccounts: Account[] = [];

  constructor(private router: Router, private popup: PopupService, private dialog: MatDialog, private transactionService: TransactionService, private userService: UserService, private accountService: AccountService, private customerService: CustomerService) { }

  ngOnInit() {
    this.loadAccounts();
  }

  loadAccounts() {
    //Izbrisati kada bek odradi
    // const simulatedResponse: Account[] = [
    //   { accountNumber: '123456789012345678', accountType: AccountType.CURRENT, currencyName: 'USD', maintenanceCost: 10.0 },
    //   { accountNumber: '987654321098765432', accountType: AccountType.FOREIGN_CURRENCY, currencyName: 'EUR', maintenanceCost: 15.0 },
    //   { accountNumber: '246801357924680135', accountType: AccountType.FOREIGN_CURRENCY, currencyName: 'GBP', maintenanceCost: 12.0 }
    // ];
    // this.outflowAccounts = simulatedResponse;
    // this.updateInflowAccounts();



    //Otkomentarisati kada bek odradi
    const jwt = sessionStorage.getItem("jwt");
      if (jwt) {
        this.customerService.getCustomer(jwt).subscribe(
          response => {
            if (response) {
                                                      //response.userId
              this.accountService.getCustomerAccounts(response.userId).subscribe(
                (accounts: Account[]) => {
                  this.outflowAccounts = accounts;
                  this.updateInflowAccounts();
                },
                error => {
                  console.error("Error while fetching accounts: ", error);
                }
              );
            }
          },
          error => {
            console.error("Error while fetching user data: ", error);
          }
        );
      }
  }

  updateInflowAccounts() {
    this.inflowAccounts = this.outflowAccounts.filter(account => account.accountNumber !== this.transaction.senderAccountNumber);
  }

  onCancel() {
    this.router.navigate(['/welcome']);
  }

  onContinue() {
    if (this.validateForm()) {
      this.transactionService.setTransactionBasics(this.transaction);
      
      let jwt = "";
      const tempJwt = sessionStorage.getItem('jwt');
      if(tempJwt !== null)
        jwt = tempJwt; 
      this.customerService.getCustomer(jwt).subscribe(
        response => {
          this.transactionService.setTranscationUser(response);
          this.popup.openTransactionPopup();
        }, (e) => {
        }
      );
    
  }
  }

  onOutflowChange() {
    this.updateInflowAccounts();
  }

  private validateForm(): boolean {
    if (!this.transaction.senderAccountNumber || !this.isValidAccountNumber(this.transaction.senderAccountNumber)) {
      this.popup.openPopup("Error", "Outflow account number is not valid.");
      return false;
    }

    if (!this.transaction.recipientAccountNumber || !this.isValidAccountNumber(this.transaction.recipientAccountNumber)) {
      this.popup.openPopup("Error", "Inflow account number is not valid.");
      return false;
    }

    if (!this.transaction.amount || !this.isValidAmount(this.transaction.amount)) {
      this.popup.openPopup("Error", "Amount is not valid.");
      return false;
    }

    return true;
  }

  private isValidAccountNumber(accountNumber: string): boolean {
    // return /^\d{18}$/.test(accountNumber);
    return true;
  }

  private isValidAmount(amount: string): boolean {
    return /^\d+(\.\d+)?$/.test(amount);
  }
  
}





 