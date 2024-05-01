import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Limit, Recipient, NewLimitDto } from '../model/model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BankAccountService } from '../service/bank-account.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PopupService } from '../service/popup.service';
import { CdkObserveContent } from '@angular/cdk/observers';


@Component({
  selector: 'app-edit-limit-pop-up',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './edit-limit-pop-up.component.html',
  styleUrl: './edit-limit-pop-up.component.css'
})
export class EditLimitPopUpComponent {

  constructor(
    private dialogRef: MatDialogRef<EditLimitPopUpComponent>,
    private bankAccountService: BankAccountService,
    private  popupService: PopupService,
    @Inject(MAT_DIALOG_DATA) public limit: Limit,
  ) { 


  }

  amount : number = 0;
  approvalRequired: boolean = false;

  handleChange(event: any) {
    // Update isChecked variable when the checkbox state changes
    this.approvalRequired = event.target.checked;
    console.log(this.approvalRequired);
  }





  addNewLimit() {
    
    let newLimitDto:NewLimitDto = {
      userId: Number(this.limit.userId),
      approvalRequired: this.approvalRequired,
      limit: Number(this.amount)
    }
    //TODO: when this is finished on backend uncoment
    //can not mock beacuse is POST method
    this.bankAccountService.addNewLimit(newLimitDto).subscribe(
      (bankAccountExchangesFromDB: any) => {
        console.log('New limit added');
        this.popupService.openPopup("Success", "Limit has been added successfully");
      },
      (error: HttpErrorResponse) => {
        this.popupService.openPopup("Error","Error adding new limit");
      }
    );
  }

  cancel(){
    this.dialogRef.close('Dialog closed by exit');
  }

  submit(){
    console.log("add new limit clicked");
    this.addNewLimit();
    this.dialogRef.close();
  }


}
