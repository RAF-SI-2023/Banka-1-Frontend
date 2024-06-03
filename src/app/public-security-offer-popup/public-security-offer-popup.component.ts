import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {TransparentTextFieldModule} from "../welcome/redesign/TransparentTextField";
import {OutlineOrangeButtonModule} from "../welcome/redesign/OutlineOrangeButton";
import {OrangeButtonModule} from "../welcome/redesign/OrangeButton";
import {FieldComponentModule} from "../welcome/redesign/FieldCompentn";
import {DropdownInputModule} from "../welcome/redesign/DropdownInput";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BankAccountService} from "../service/bank-account.service";

@Component({
  selector: 'app-public-security-offer-popup',
  standalone: true,
  imports: [FormsModule,
    CommonModule,
    TransparentTextFieldModule,
    OutlineOrangeButtonModule,
    OrangeButtonModule,
    FieldComponentModule,
    DropdownInputModule],
  templateUrl: './public-security-offer-popup.component.html',
  styleUrl: './public-security-offer-popup.component.css'
})
export class PublicSecurityOfferPopupComponent {
    volumeOfStock: string = '';
    priceOffer: string = '';

    warnMessage: string = '';

    security;


    constructor(
      public bankAccountService: BankAccountService,
      public dialogRef: MatDialogRef<PublicSecurityOfferPopupComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.security = data;
      // console.log(this.security.publicOffers.id.amount);

    }

    onCancelButton(){
      this.dialogRef.close();
    }

    onMakeAnOffer() {
      if (!this.validInputOffer() && !this.validInputVolume()) {
        if (this.volumeOfStock != '' || this.priceOffer != '') {
          const volume = parseFloat(this.volumeOfStock);
          const offer = parseFloat(this.priceOffer);
          if (volume >= 0 || offer >= 0) { // Ako je volume vece od onoga sto je ponudjeno na trzistu
            if (volume >= this.security.amount) { // Ako je volume vece od onoga sto je ponudjeno na trzistu
              this.warnMessage = "Asked volume too high."
            } else {
              this.bankAccountService.makeAnOffer(this.security, volume, offer);
            }
          } else {
            this.warnMessage = "Both volume and price need to be positive numbers."
          }
        } else {
          this.warnMessage = "Both volume and price are required.";
        }
      } else {
        this.warnMessage = "";
      }
    }

    validInputVolume(){
      if(this.volumeOfStock == '') return false;
      return isNaN(parseFloat(this.volumeOfStock));
    }

    validInputOffer(){
      if(this.priceOffer == '') return false;
      return isNaN(parseFloat(this.priceOffer));
    }


}
