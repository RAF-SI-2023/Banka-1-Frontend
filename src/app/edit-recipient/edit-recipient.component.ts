import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Recipient } from '../model/model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BankAccountService } from '../service/bank-account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-recipient',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './edit-recipient.component.html',
  styleUrl: './edit-recipient.component.css'
})
export class EditRecipientComponent implements OnInit{

  recipient!: Recipient;
  fullName: string = '';

  constructor(
    private dialogRef: MatDialogRef<EditRecipientComponent>,
    private bankAccountService: BankAccountService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { recipient: Recipient},
  ) { }

  ngOnInit(): void {
    this.recipient = this.data.recipient;
    this.fullName = this.recipient.firstName + ' ' + this.recipient.lastName;
    console.log(this.recipient);
  }

  submit(): void {
    const validation = this.validateRecipient();
    if (validation !== true) {
      alert(validation);
      return;
    }

    let nameParts = this.fullName.split(' ');
    let recipientUpdated: Recipient = {};
    recipientUpdated.id = this.recipient.id;
    recipientUpdated.bankAccountNumber = this.recipient.bankAccountNumber;
    recipientUpdated.firstName = nameParts[0];
    recipientUpdated.lastName = nameParts[1];

    this.bankAccountService.editRecipient(recipientUpdated).subscribe(
      (response: any) => {
        console.log('Recipient added successfully');
        console.log(response);
      },
      (error: any) => {
        console.error('Error adding recipient:', error);
      }
    );
    this.router.navigate(['/recipients']);
    this.dialogRef.close({ success: true });
    location.reload();
  }

  cancel(): void {
    this.dialogRef.close();
  }

  validateRecipient(){
    let nameParts = this.fullName.trim().split(' ');
    if (this.fullName === '') {
      return 'Name cannot be empty!';
    }
    if (nameParts.length !== 2) {
      return 'Name must include exactly two parts, a first name and a last name.';
    }
    if (!/^[a-zA-Z]+ [a-zA-Z]+$/.test(this.fullName)) {
      return 'Name must only contain letters and a single space.';
    }
    if (this.recipient.bankAccountNumber === '') {
      return 'Bank account number cannot be empty!';
    }
    // if (!/^\d{18}$/.test(this.bankAccountNumber)) {
    //   return 'Bank account number must be 18 digits.';
    // }
    return true;
  }
}
