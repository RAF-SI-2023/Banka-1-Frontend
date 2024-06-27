import {Component, Inject} from '@angular/core';
import {BankAccountService} from "../service/bank-account.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {FieldComponentModule} from "../welcome/redesign/FieldCompentn";
import {DropdownInputModule} from "../welcome/redesign/DropdownInput";
import {ListingType, OrderType} from "../model/model";
import {OrderService} from "../service/order.service";
import {PopupService} from "../service/popup.service";

@Component({
  selector: 'app-buy-stock-popup',
  standalone: true,
  imports: [FormsModule,
    CommonModule,
    FieldComponentModule, DropdownInputModule],
  templateUrl: './buy-stock-popup.component.html',
  styleUrl: './buy-stock-popup.component.css'
})
export class BuyStockPopupComponent {

  volumeOfStock: string = '';
  limitValue: string = '';
  stopValue: string = '';
  allOrNone: boolean = false;
  margin: string = '';

  warnMessage: string = '';

  orderId: string = '';
  type: ListingType = ListingType.STOCK;

  constructor(
    public bankAccountService: BankAccountService,
    public dialogRef: MatDialogRef<BuyStockPopupComponent>,
    public orderService: OrderService,
    public popupService: PopupService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.orderId = data.id;
    this.type = data.type;
  }

  onCancelButton(){
    this.dialogRef.close();
  }

  async onBuy() {
    if (!this.validInputVolume() && !this.validInputLimit() && !this.validInputStop()) {
      if (this.volumeOfStock != '' || this.limitValue != '' || this.stopValue != '') {
        const volume = parseFloat(this.volumeOfStock);
        const limit = parseFloat(this.limitValue);
        const stop = parseFloat(this.stopValue);

        let response: boolean | undefined = false;
        switch (this.type){
          case ListingType.FUTURE:
            response = await this.orderService.buyOrder(OrderType.BUY, this.orderId,  ListingType.FUTURE, volume, limit, stop, this.allOrNone);
            if (response) {
              this.popupService.openCustomMessage({
                title: "Options",
                header: "Purchase Successful!",
                message: "Your future option has been successfully bought."
              })
            } else {
              this.popupService.openCustomMessage({
                title: "Options",
                header: "Purchase Failed!",
                // message: "You do not have sufficient funds to buy this stock option."
                message: ""
              })
            }
            break;
          case ListingType.STOCK:
            response = await this.orderService.buyOrder(OrderType.BUY, this.orderId,  ListingType.STOCK, volume, limit, stop, this.allOrNone);
            if (response) {
              this.popupService.openCustomMessage({
                title: "Options",
                header: "Purchase Successful!",
                message: "Your stock option has been successfully bought."
              })
            } else {
              this.popupService.openCustomMessage({
                title: "Options",
                header: "Purchase Failed!",
                // message: "You do not have sufficient funds to buy this stock option."
                message: ""
              })
            }
            break;
        }



        this.dialogRef.close();
      } else {
        this.warnMessage = "All values are required.";
      }
    } else {
      this.warnMessage = "";

    }


  }

  validInputVolume(){
    if(this.volumeOfStock == '') return false;
    return isNaN(parseFloat(this.volumeOfStock));
  }

  validInputLimit(){
    if(this.limitValue == '') return false;
    return isNaN(parseFloat(this.limitValue));
  }

  validInputStop(){
    if(this.stopValue == '') return false;
    return isNaN(parseFloat(this.stopValue));
  }

  setValue(value: boolean){
    this.allOrNone = value;
  }

  getValue(){
    if(this.allOrNone) return "YES"; else return "NO"
  }



}
