import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OrderService} from "../service/order.service";
import {PopupService} from "../service/popup.service";
import {ListingType, OrderDto, OrderType, SellingRequest} from "../model/model";
import {OrangeButtonModule} from "../welcome/redesign/OrangeButton";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-sell-popup',
  standalone: true,
  imports: [
    OrangeButtonModule,
    FormsModule
  ],
  templateUrl: './sell-popup.component.html',
  styleUrl: './sell-popup.component.css'
})
export class SellPopupComponent {
  listingId: string = "";
  amount: number = 0;
  limitValue: number = 0;
  stopValue: number = 0;
  allOrNone: boolean = false;
  isFuture: boolean = false;
  isForex: boolean = false;
  isStock: boolean = false;

  total: number = 0;

  isLegal: boolean = false;

  constructor(public dialogRef: MatDialogRef<SellPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,  // Inject the dialog data
              private orderService: OrderService,
              private popupService: PopupService
  ) {
    console.log(data)
    this.listingId = this.data.listingId;
    this.total = this.data.amount;
    this.isFuture = this.data.future;
    this.isForex = this.data.forex;
    this.isStock = this.data.stock;
    this.isLegal = this.data.isLegal
    console.log("AAA " + this.isLegal)
  }

  closeSellingMenu() {
    this.dialogRef.close();
  }

  async sellOrder() {
    if(this.amount <= 0 || this.limitValue < 0 || this.stopValue < 0){
      this.popupService.openPopup("Error", "Invalid input values");
      return;
    }

    if(this.total < this.amount){
      this.popupService.openPopup("Error", "You don't have enough securities.");
      return;
    }


    var response;
    // if(this.isLegal) {
      if (this.isFuture) {
        response = await this.orderService.sellOrder(OrderType.SELL, this.listingId, ListingType.FUTURE, this.amount, this.limitValue, this.stopValue, this.allOrNone);
      } else if (this.isForex) {
        response = await this.orderService.sellOrder(OrderType.SELL, this.listingId, ListingType.FOREX, this.amount, this.limitValue, this.stopValue, this.allOrNone);
      } else if (this.isStock) {
        response = await this.orderService.sellOrder(OrderType.SELL, this.listingId, ListingType.STOCK, this.amount, this.limitValue, this.stopValue, this.allOrNone);
      } else {
        response = false;
      }
    // } else {
    //   if (this.isFuture) {
    //     response = await this.orderService.sellOrder(OrderType.SELL, this.listingId, ListingType.FUTURE, this.amount, this.limitValue, this.stopValue, this.allOrNone);
    //   } else if (this.isForex) {
    //     response = await this.orderService.sellOrder(OrderType.SELL, this.listingId, ListingType.FOREX, this.amount, this.limitValue, this.stopValue, this.allOrNone);
    //   } else if (this.isStock) {
    //     response = await this.orderService.sellOrder(OrderType.SELL, this.listingId, ListingType.STOCK, this.amount, this.limitValue, this.stopValue, this.allOrNone);
    //   } else {
    //     response = false;
    //   }
    // }

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
