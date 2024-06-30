import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {TransparentTextFieldModule} from "../welcome/redesign/TransparentTextField";
import {OutlineOrangeButtonModule} from "../welcome/redesign/OutlineOrangeButton";
import {OrangeButtonModule} from "../welcome/redesign/OrangeButton";
import {FieldComponentModule} from "../welcome/redesign/FieldCompentn";
import {DropdownInputModule} from "../welcome/redesign/DropdownInput";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PopupService} from "../service/popup.service";
import { MakeOfferDto, OtherBankStocks } from '../model/model';
import { MultiOtcService } from '../service/multi-otc.service';


@Component({
  selector: 'app-sell-multi-otc-pop-up',
  standalone: true,
  imports: [FormsModule,
    CommonModule,
    TransparentTextFieldModule,
    OutlineOrangeButtonModule,
    OrangeButtonModule,
    FieldComponentModule,
    DropdownInputModule],
  templateUrl: './sell-multi-otc-pop-up.component.html',
  styleUrl: './sell-multi-otc-pop-up.component.css'
})
export class SellMultiOtcPopUpComponent {

  volumeOfStock: string = '';
  priceOffer: string = '';

  warnMessage: string = '';

  otherBankStock: OtherBankStocks;

  constructor(
    public multiOtcService: MultiOtcService,
    public dialogRef: MatDialogRef<SellMultiOtcPopUpComponent>,
    public popupService: PopupService,
    @Inject(MAT_DIALOG_DATA) public data: OtherBankStocks
  ) {
    this.otherBankStock = data;
  }

  onCancelButton(){
    this.dialogRef.close();
  }

  onMakeAnOffer() {
    if (!this.validInputOffer() && !this.validInputVolume()) {
      if (this.volumeOfStock != '' && this.priceOffer != '') {
        const volume = parseFloat(this.volumeOfStock);
        const offer = parseFloat(this.priceOffer);
        if (volume >= 0 || offer >= 0) {
          console.log("Other bank stock:");
          console.log(this.otherBankStock);

          if (this.otherBankStock.amount && volume <= this.otherBankStock.amount) {

            let makeOfferDto : MakeOfferDto = {
              amount: volume,
              ticker: this.otherBankStock.ticker,
              price: offer
            }
            this.multiOtcService.makeOffer(makeOfferDto).subscribe(res => {
              console.log(res);
              this.popupService.openPopup("Offer made successfully.", "Success");
            });

            this.warnMessage = "";
            this.dialogRef.close();
          } else {
            this.warnMessage = "Asked volume too high."
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
