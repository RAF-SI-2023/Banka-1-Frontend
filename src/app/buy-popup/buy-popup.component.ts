import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {WhiteTextFieldModule} from "../welcome/redesign/WhiteTextField";
import {OrangeButtonModule} from "../welcome/redesign/OrangeButton";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {OrderService} from "../service/order.service";
import {ListingType, OrderType} from "../model/model";
import {PopupService} from "../service/popup.service";

@Component({
  selector: 'app-buy-popup',
  standalone: true,
  imports: [
    FormsModule,
    WhiteTextFieldModule,
    OrangeButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './buy-popup.component.html',
  styleUrl: './buy-popup.component.css'
})
export class BuyPopupComponent {
  listingId: string = "";
  amount: number = 0;
  limitValue: number = 0;
  stopValue: number = 0;
  allOrNone: boolean = false;
  isFuture: boolean = false;
  isForex: boolean = false;
  isStock: boolean = false;

  constructor(public dialogRef: MatDialogRef<BuyPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,  // Inject the dialog data
              private orderService: OrderService,
              private popupService: PopupService
  ) {
    console.log(data)
    if (this.data.future && this.data.future.listingId) {
      this.listingId = this.data.future.listingId;
      this.isFuture = true;
    }
    if (this.data.forex && this.data.forex.listingId) {
      this.listingId = this.data.forex.listingId;
      this.isForex = true;
    }
    if (this.data.stock && this.data.stock.listingId) {
      this.listingId = this.data.stock.listingId;
      this.isStock = true;
    }
  }

  closeSellingMenu() {
    this.dialogRef.close();
  }

  async buyOrder() {
    var response;
    if(this.isFuture){
      response = await this.orderService.buyOrder(OrderType.BUY, this.listingId, ListingType.FUTURE, this.amount, this.limitValue, this.stopValue, this.allOrNone);
    } else if (this.isForex) {
      response = await this.orderService.buyOrder(OrderType.BUY, this.listingId, ListingType.FOREX, this.amount, this.limitValue, this.stopValue, this.allOrNone);
    } else if (this.isStock) {
      response = await this.orderService.buyOrder(OrderType.BUY, this.listingId,  ListingType.STOCK, this.amount, this.limitValue, this.stopValue, this.allOrNone);
    } else {
      response = false;
    }

    if (response) {
      this.popupService.openPopup("Success", "Buy order has been placed successfully");
      this.dialogRef.close();
    } else {
      this.popupService.openPopup("Error", "Error placing order, try again later");
      this.dialogRef.close();
    }
  }
}
