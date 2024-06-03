import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../service/customer.service';
import { MatDialogRef } from '@angular/material/dialog';
import { PopupService } from '../service/popup.service';
import {CreateCustomerRequest, Customer} from '../model/model';
import {FieldComponentModule} from "../welcome/redesign/FieldCompentn";
import {OutlineOrangeButtonModule} from "../welcome/redesign/OutlineOrangeButton";
import {OrangeButtonModule} from "../welcome/redesign/OrangeButton";
import {DropdownInputModule} from "../welcome/redesign/DropdownInput";
import {DropdownSelectorModule} from "../welcome/redesign/DropDownSelector";

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [FormsModule, CommonModule, FieldComponentModule, OutlineOrangeButtonModule, OrangeButtonModule, DropdownSelectorModule, DropdownInputModule],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css'
})
export class AddCustomerComponent {
  addCustomerData: CreateCustomerRequest = {
    email: '',
    firstName: '',
    lastName: '',
    jmbg: '',
    phoneNumber: '',
    address: '',
    gender: '',
    dateOfBirth: 0
  };

  constructor(
    private customerService: CustomerService,
    private dialogRef: MatDialogRef<AddCustomerComponent>,
    private popupService: PopupService,
  ){}

  submit() {
    if(this.validateForm()) {
      console.log(this.addCustomerData);
      this.customerService.setCustomerForCreation(this.addCustomerData);
      this.popupService.openAddBankAccountPopup();
      this.dialogRef.close();
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  private validateForm(): boolean {

    if (!this.addCustomerData.email || !this.isValidEmail(this.addCustomerData.email)) {
      this.popupService.openPopup("Error", "Email nije validan.");
      return false;
    }

    if (!this.addCustomerData.firstName) {
      this.popupService.openPopup("Error", "Name nije validan.");
      return false;
    }

    if (!this.addCustomerData.lastName) {
      this.popupService.openPopup("Error", "Surname nije validan.");
      return false;
    }

    if (!this.addCustomerData.address || !this.isAdressValid(this.addCustomerData.address)) {
      this.popupService.openPopup("Error", "Adresa nije validna.");
      return false;
    }

    if (!this.addCustomerData.phoneNumber || !this.isValidPhoneNumber(this.addCustomerData.phoneNumber)) {
      this.popupService.openPopup("Error", "Broj telefona nije validan.");
      return false;
    }

    if (!this.addCustomerData.jmbg || !this.isValidJMBG(this.addCustomerData.jmbg)) {
      this.popupService.openPopup("Error", "JMBG nije validan.");
      return false;
    }

    if (!this.addCustomerData.gender) {
      this.popupService.openPopup("Error", "Izaberite pol.");
      return false;
    }

    return true;
  }

  private isValidEmail(email: string): boolean {
    return email.includes('@');
  }

  private isValidJMBG(jmbg: string): boolean {
    return jmbg.length === 13;
  }

  private isValidPhoneNumber(phone: string): boolean {
    return /^\d+$/.test(phone);
  }

  private isAdressValid(address: string): boolean {
    return address.length > 0;
  }

  setGender(gender: any) {
    this.addCustomerData.gender = gender;
  }

  updateUid(Uid: any) {
    console.log("gender:" + Uid);
    this.addCustomerData.gender = Uid;
  }

}
