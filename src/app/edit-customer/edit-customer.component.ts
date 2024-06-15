import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateCustomerRequest, EditCustomerRequest } from '../model/model';
import { CustomerService } from '../service/customer.service';
import { MatDialogRef } from '@angular/material/dialog';
import { PopupService } from '../service/popup.service';
import {FieldComponentModule} from "../welcome/redesign/FieldCompentn";
import {OutlineOrangeButtonModule} from "../welcome/redesign/OutlineOrangeButton";
import {OrangeButtonModule} from "../welcome/redesign/OrangeButton";
import {DropdownInputModule} from "../welcome/redesign/DropdownInput";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-customer',
  standalone: true,
  imports: [FormsModule, CommonModule, FieldComponentModule, OutlineOrangeButtonModule, OrangeButtonModule, DropdownInputModule],
  templateUrl: './edit-customer.component.html',
  styleUrl: './edit-customer.component.css'
})
export class EditCustomerComponent implements OnInit {

  editCustomerData: EditCustomerRequest = {
    id: 0,
    email: '',
    firstName: '',
    lastName: '',
    jmbg: '',
    phoneNumber: '',
    address: '',
    gender: '',
    password: '',
    active: false,
    dateOfBirth: 0
  };

  constructor(
    private customerService: CustomerService,
    private dialogRef: MatDialogRef<EditCustomerComponent>,
    private popupService: PopupService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    // console.log('Edit customer component initialized', this.customerService.getCustomerForEdit());
    const userToEdit = this.customerService.getCustomerForEdit();
    this.editCustomerData = {
      id: userToEdit?.id || 0,
      email: userToEdit?.email || '',
      firstName: userToEdit?.firstName || '',
      lastName: userToEdit?.lastName || '',
      jmbg: userToEdit?.jmbg || '',
      phoneNumber: userToEdit?.phoneNumber || '',
      address: userToEdit?.address || '',
      gender: userToEdit?.gender as string,
      password: '',
      active: userToEdit?.active || false,
      dateOfBirth: 0
    }
  }

  submit() {
    console.log('Edit customer data: ', this.editCustomerData);

    if (!this.validateForm()) {
      return;
    }

    this.customerService.editCustomer(this.editCustomerData).subscribe(
      (response) => {
        if (response) {
          this.popupService.openPopupWithPageRefresh("Success", "Customer data successfully updated.");
          // this.router.navigate(['customer/all']);
        } else {
          this.popupService.openPopupWithPageRefresh("Error", "Failed to update customer data.");
        }
      },
      (error) => {
        console.error('Error while editing customer data: ', error);
        this.popupService.openPopup("Error", "Failed to update customer data.");
      }
    );
    this.dialogRef.close();
  }

  private validateForm(): boolean {

    if (!this.editCustomerData.email || !this.isValidEmail(this.editCustomerData.email)) {
      this.popupService.openPopup("Error", "Email nije validan.");
      return false;
    }

    if (!this.editCustomerData.firstName) {
      this.popupService.openPopup("Error", "Name nije validan.");
      return false;
    }

    if (!this.editCustomerData.lastName) {
      this.popupService.openPopup("Error", "Surname nije validan.");
      return false;
    }

    if (!this.editCustomerData.address || !this.isAdressValid(this.editCustomerData.address)) {
      this.popupService.openPopup("Error", "Adresa nije validna.");
      return false;
    }

    if (!this.editCustomerData.phoneNumber || !this.isValidPhoneNumber(this.editCustomerData.phoneNumber)) {
      this.popupService.openPopup("Error", "Broj telefona nije validan.");
      return false;
    }

    if (!this.editCustomerData.jmbg || !this.isValidJMBG(this.editCustomerData.jmbg)) {
      this.popupService.openPopup("Error", "JMBG nije validan.");
      return false;
    }

    if (!this.editCustomerData.gender) {
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

  cancel() {
    this.dialogRef.close();
  }

  setGender(gender: any) {
    this.editCustomerData.gender = gender;
  }

  inputModified: boolean = false;

  isJmbgReadonly(): boolean {
    return !this.inputModified && !!this.editCustomerData.jmbg;
  }

  onInputChange(event: any): void {
    this.inputModified = true;
    this.editCustomerData.jmbg = event.target.value; // Update the model value
  }

}
