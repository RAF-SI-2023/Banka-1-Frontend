import { Component, OnInit } from '@angular/core';
import { CreateBankAccountRequest } from '../model/model';
import { CustomerService } from '../service/customer.service';
import { PopupService } from '../service/popup.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { boolean } from 'zod';
import { Router } from '@angular/router';
import {FieldComponentModule} from "../welcome/redesign/FieldCompentn";
import {OutlineOrangeButtonModule} from "../welcome/redesign/OutlineOrangeButton";
import {OrangeButtonModule} from "../welcome/redesign/OrangeButton";
import {DropdownInputModule} from "../welcome/redesign/DropdownInput";


@Component({
  selector: 'app-add-bank-account',
  standalone: true,
  imports: [FormsModule, CommonModule, FieldComponentModule, OutlineOrangeButtonModule, OrangeButtonModule, DropdownInputModule],
  templateUrl: './add-bank-account.component.html',
  styleUrl: './add-bank-account.component.css'
})
export class AddBankAccountComponent {

  // tekuci -> currency: RSD
  // devizni -> currency: WHATEVER except RSD
  // poslovni -> currency: WHATEVER

  isCurrencyReadOnly: boolean = false;
  accountToCreate: CreateBankAccountRequest = {
    status: false,
    currencyCode: '',
    accountType: '',
    maintenanceCost: 0,
    accountName: ''
  };

  dropdownStatusNames = ["Active", "Inactive"]
  dropdownStatusValues = [false, true]


  dropdownType = ["CURRENT", "FOREIGN_CURRENCY"]


  constructor(
    private customerService: CustomerService,
    private popupService: PopupService,
    private dialogRef: MatDialogRef<AddBankAccountComponent>,
    private router: Router
  ) { }


  submit() {
    const customer = this.customerService.getCustomerForCreation();
    // Uncomment this

    if(this.validateForm() && customer) {

      this.customerService.createCustomerAndBankAccount( customer, this.accountToCreate).subscribe(
        (response) => {
          if (response) {
            this.popupService.openPopup("Success", "Customer and bank account created successfully.");
            this.customerService.setCustomerForCreation(undefined);
            this.router.navigate(['customer/all']);
            this.dialogRef.close();
          } else {
            this.popupService.openPopup("Error", "Failed to create customer and bank account.");
          }
        },
        (error) => {
          console.error('Error creating customer and bank account: ', error);
          this.popupService.openPopup("Error", "Failed to create customer and bank account.");
        }
      );
      this.dialogRef.close();
    }
    else if(this.validateForm() && this.customerService.getSelectedCustomer()!==null){
       const userId = this.customerService.getSelectedCustomer()?.userId;
       if(userId!==null && userId!==undefined){
        this.customerService.addCustomerBankAccount(userId,this.accountToCreate).subscribe(
          (response) => {
            if (response) {
              this.popupService.openPopup("Success", "Bank account successfully added.");
              this.router.navigate(['customer/all']);
              this.dialogRef.close();
            } else {
              this.popupService.openPopup("Error", "Failed to add bank account to a customer.");
            }
          },
          (error) => {
            console.error('Error creating customer and bank account: ', error);
            this.popupService.openPopup("Error", "Failed to add bank account to a customer.");
          }
        );
      }
    }
  }

  private validateForm(): boolean {
    if (!this.accountToCreate.accountType) {
      this.popupService.openPopup("Error", "Account type is not valid.");
      return false;
    }

    if (!this.accountToCreate.currencyCode) {
      this.popupService.openPopup("Error", "Currency is not valid.");
      return false;
    }

    if (this.accountToCreate.accountType === 'CURRENT' && this.accountToCreate.currencyCode !== 'RSD') {
      this.popupService.openPopup("Error", "Current account must be in RSD.");
      return false;
    }

    if (this.accountToCreate.accountType === 'FOREIGN_CURRENCY' && this.accountToCreate.currencyCode === 'RSD') {
      this.popupService.openPopup("Error", "Foreign currency account must not be in RSD.");
      return false;
    }

    if (this.accountToCreate.accountType === 'BUSINESS' && this.accountToCreate.currencyCode === 'RSD') {
      this.popupService.openPopup("Error", "Business account must not be in RSD.");
      return false;
    }

    return true;
  }

  cancel(){
    this.dialogRef.close();
    this.customerService.setCustomerForCreation(undefined);
  }

  onAccountTypeChange() {
    if (this.accountToCreate.accountType === 'CURRENT') {
      this.accountToCreate.currencyCode = 'RSD';
      this.isCurrencyReadOnly = true;
    } else { //if (this.accountToCreate.accountType === 'FOREIGN_CURRENCY' || this.accountToCreate.accountType === 'BUSINESS') {
      this.accountToCreate.currencyCode = '';
      this.isCurrencyReadOnly = false;
    }
  }

  setType(type: any){
    this.accountToCreate.accountType = type;
  }
  setStatus(status: any){
    this.accountToCreate.status = status;
  }

}
