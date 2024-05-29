import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BankAccountService } from '../service/bank-account.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-recipient',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './new-recipient.component.html',
  styleUrl: './new-recipient.component.css'
})
export class NewRecipientComponent {
  name: string = '';
  bankAccountNumber: string = '';

  constructor(
    private bankAccountService: BankAccountService,
    public dialogRef: MatDialogRef<NewRecipientComponent>
    ){}

  submit(){
    const validation = this.validateRecipient();
    if (validation !== true) {
      alert(validation);
      return;
    }

    let nameParts = this.name.split(' ');
    this.bankAccountService.addRecipient(nameParts[0], nameParts[1], this.bankAccountNumber).subscribe(
      (response: any) => {
        console.log('Recipient added successfully');
        console.log(response);
        this.dialogRef.close({ success: true });
      },
      (error: any) => {
        console.error('Error adding recipient:', error);
      }
    );
  }



  cancel(){
    this.dialogRef.close();
  }

  validateRecipient(){
    let nameParts = this.name.trim().split(' ');
    if (this.name === '') {
      return 'Name cannot be empty!';
    }
    if (nameParts.length !== 2) {
      return 'Name must include exactly two parts, a first name and a last name.';
    }
    if (!/^[a-zA-Z]+ [a-zA-Z]+$/.test(this.name)) {
      return 'Name must only contain letters and a single space.';
    }
    if (this.bankAccountNumber === '') {
      return 'Bank account number cannot be empty!';
    }
   
    return true;
  }
}
