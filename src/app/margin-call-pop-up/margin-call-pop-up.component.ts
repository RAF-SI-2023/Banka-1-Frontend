import {Component, Inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NgClass} from "@angular/common";
import {MarginService} from "../service/margin.service";
import {Margin} from "../model/model";

@Component({
  selector: 'app-margin-call-pop-up',
  standalone: true,
  imports: [
    FormsModule,
    NgClass
  ],
  templateUrl: './margin-call-pop-up.component.html',
  styleUrl: './margin-call-pop-up.component.css'
})
export class MarginCallPopUpComponent {
  volumeOfStock: string = '';
  marginCall: string = '';
  warnMessage: string = '';
  margin: Margin;

  constructor(public marginService: MarginService, public dialogRef: MatDialogRef<MarginCallPopUpComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.margin = data;
  }

  closePopUp(){
    this.dialogRef.close();
  }

  onMakeAnOffer() {
    if (!this.isValid()) {
      const marginCall = parseFloat(this.marginCall);
      if(marginCall > 0){
        this.marginService.depositMoney(this.margin, marginCall);
        this.warnMessage = "";
        this.closePopUp();
      } else {
        this.warnMessage = "Margin call needs to be a positive number."
      }
    } else {
      this.warnMessage = "";
    }
  }

  isValid(){
    if(this.marginCall == '') return false;
    return isNaN(parseFloat(this.marginCall));
  }

}
