// popup.service.ts
import { Injectable } from '@angular/core';
import {PopupComponent} from "../popup/popup.component";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { TransactionPopupComponent } from '../transaction-popup/transaction-popup.component';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { AddBankAccountComponent } from '../add-bank-account/add-bank-account.component';
import { EditCustomerComponent } from '../edit-customer/edit-customer.component';
import { VerificationPaymentPopupComponent } from '../verification-payment-popup/verification-payment-popup.component';
import {CreatePaymentRequest, Forex, Future, ListingType, Recipient} from '../model/model';
import { TransactionsDetailsPopupComponent } from '../transactions-details-popup/transactions-details-popup.component';
import { NewRecipientComponent } from '../new-recipient/new-recipient.component';
import { EditRecipientComponent } from '../edit-recipient/edit-recipient.component';
import {BuyPopupComponent} from "../buy-popup/buy-popup.component";
import {SellPopupComponent} from "../sell-popup/sell-popup.component";
import { DeleteRecipientConfirmationComponent } from '../delete-recipient-confirmation/delete-recipient-confirmation.component';
import { AddNewLegalPersonPopUpComponent } from '../add-new-legal-person-pop-up/add-new-legal-person-pop-up.component';
import { LegalPerson } from '../model/model';
import { JoinLegalPersonAndCustomerPopUpComponent } from '../join-legal-person-and-customer-pop-up/join-legal-person-and-customer-pop-up.component';
import {PublicSecurityOfferPopupComponent} from "../public-security-offer-popup/public-security-offer-popup.component";
import {BuyStockPopupComponent} from "../buy-stock-popup/buy-stock-popup.component";
import {CustomPopupComponent} from "../custom-popup/custom-popup.component";
import {MarginCallPopUpComponent} from "../margin-call-pop-up/margin-call-pop-up.component";
import {PopUpWithRefreshComponent} from "../pop-up-with-refresh/pop-up-with-refresh.component";


@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(private dialog: MatDialog) { }

  openPopup(message: string, text: string): void {
    this.dialog.open(PopupComponent, {
      width: '250px',
      data: { message, text }
    });
  }

  openPopupWithPageRefresh(message: string, text: string): void {
    this.dialog.open(PopUpWithRefreshComponent, {
      width: '250px',
      data: { message, text }
    });
  }

  openBiggerPopup(message: string, text: string): void {
    this.dialog.open(PopupComponent, {
      width: '350px',
      data: { message, text }
    });
  }

  openAddUserPopup(args: any): void {
    this.dialog.open(AddUserComponent, {
      data: args
    });
  }

  openAddLegalPersonPopUp(allLegalPersons: LegalPerson[]): void {
    this.dialog.open(AddNewLegalPersonPopUpComponent, {
      data: allLegalPersons,
      disableClose: true // Prevents closing the dialog by clicking outside or pressing ESC
    });
  }

  openJoinLegalPersonAndCustomerPopUp(legalPerson: LegalPerson): void{
    this.dialog.open(JoinLegalPersonAndCustomerPopUpComponent, {
      data: legalPerson,
      disableClose: false // Prevents closing the dialog by clicking outside or pressing ESC
    });
  }

  openUpdateUserPopup(args: any): void {
    this.dialog.open(UpdateUserComponent, {
      data:args
    });
  }

  openTransactionDetailsPopup(): void {
    this.dialog.open(TransactionsDetailsPopupComponent, {});}



  openTransactionPopup(): void {
    this.dialog.open(TransactionPopupComponent, {});}

  openAddCustomerPopup(): void {
    this.dialog.open(AddCustomerComponent, {
    });
  }

  openVerifyPaymentPopup(payment: CreatePaymentRequest): void {
    this.dialog.open(VerificationPaymentPopupComponent, {
      data: {payment}
    });
  }

  openAddBankAccountPopup(): void {
    this.dialog.open(AddBankAccountComponent, {
    });
  }

  openUpdateCustomerPopup(): void {
    this.dialog.open(EditCustomerComponent, {

    });
  }

  openDeleteConfirmation():MatDialogRef<DeleteRecipientConfirmationComponent>{
    return this.dialog.open(DeleteRecipientConfirmationComponent, {});
  }

  openAddRecipientPopup(): MatDialogRef<NewRecipientComponent> {
    return this.dialog.open(NewRecipientComponent, {});
  }

  openBuyPopup(future: any, forex: any, stock: any): void {
    this.dialog.open(BuyPopupComponent, {
      data: { future: future, forex: forex, stock: stock }  // Pass the future object to the dialog
    });
  }

  openSellPopup(listingId: number, amount: number, future: boolean, forex: boolean, stock: boolean) {
    return this.dialog.open(SellPopupComponent, {
      data: { listingId: listingId, amount: amount, future: future, forex: forex, stock: stock }  // Pass the future object to the dialog
    });
  }

  openEditRecipientPopup(recipient: Recipient): MatDialogRef<EditRecipientComponent> {
    return this.dialog.open(EditRecipientComponent, {
      data: { recipient }
    });
  }

  openPublicSecuritiesPopup(args: any): void {
    this.dialog.open(PublicSecurityOfferPopupComponent, {
      data: args
    });
  }

  openBuyOrderPopup(args: any): void {
    this.dialog.open(BuyStockPopupComponent, {data: args});
  }

  openCustomMessage(args: {title: string, header: string, message: string}): void {
    this.dialog.open(CustomPopupComponent, {data: args})
  }

  openMarginCallPopup(row: any) {
    this.dialog.open(MarginCallPopUpComponent, {
      data: row
    });
    console.log('Opening margin call popup...');
  }
}
