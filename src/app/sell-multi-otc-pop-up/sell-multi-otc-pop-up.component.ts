import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OrderService} from "../service/order.service";
import {PopupService} from "../service/popup.service";
import {ListingType, OrderDto, OrderType, SellingRequest} from "../model/model";
import {OrangeButtonModule} from "../welcome/redesign/OrangeButton";
import {FormsModule} from "@angular/forms";
import { MultiOtcService } from '../service/multi-otc.service';
import { MakeOfferDto } from '../model/model';

@Component({
  selector: 'app-sell-multi-otc-pop-up',
  standalone: true,
  imports: [
    OrangeButtonModule,
    FormsModule],
  templateUrl: './sell-multi-otc-pop-up.component.html',
  styleUrl: './sell-multi-otc-pop-up.component.css'
})
export class SellMultiOtcPopUpComponent {

  price?: number = 0;
  amount?: number = 0;
  ticker?: string = '';
  limitValue: number = 0;
  stopValue: number = 0;
  allOrNone: boolean = false;

  total: number = 0;

  isLegal: boolean = false;

  constructor(public dialogRef: MatDialogRef<SellMultiOtcPopUpComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,  // Inject the dialog data
              private multiOtcService: MultiOtcService,
              private popupService: PopupService
  ) {
    console.log(data)
    this.ticker = this.data.ticker;
    this.amount = this.data.amount;
    this.price = this.data.price;
    console.log("Passed data: " + this.ticker + " " + this.amount + " " + this.price);
  }

  closeSellingMenu() {
    this.dialogRef.close();
  }

  async sellOrder() {
    if(this.amount && (this.amount <= 0 || this.limitValue < 0 || this.stopValue < 0)){
      this.popupService.openPopup("Error", "Invalid input values");
      return;
    }

    let makeOfferDto: MakeOfferDto = {
      amount: this.amount,
      price: this.price,
      ticker: this.ticker
    }

    var response = await this.multiOtcService.makeOffer(makeOfferDto);

    if (response) {
      this.popupService.openPopup("Success", "Sell order has been placed successfully");
      console.log("AAA " + response)
      this.dialogRef.close();
    } else {
      this.popupService.openPopup("Error", "Error placing sell order, try again later");
      this.dialogRef.close();
    }
  }

}
