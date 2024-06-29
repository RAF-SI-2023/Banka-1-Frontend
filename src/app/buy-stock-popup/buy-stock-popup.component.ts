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
import {min} from "rxjs";

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

  volumeOfStock: string = '0';
  limitValue: string = '0';
  stopValue: string = '0';
  allOrNone: boolean = false;
  margin: string = '';

  warnMessage: string = '';

  orderId: string = '';
  type: ListingType = ListingType.STOCK;
  totalValue: number = 0;
  maintenanceMargin: number = 0;
  initialMargin: number = 0;
  loanMargin: number = 0;
  price: number = 0;
  isMargin: boolean = false;

  constructor(
    public bankAccountService: BankAccountService,
    public dialogRef: MatDialogRef<BuyStockPopupComponent>,
    public orderService: OrderService,
    public popupService: PopupService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.orderId = data.id;
    this.type = data.type;
    this.price = data.price;
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

          // let response: boolean | undefined = false;
          var response;
          switch (this.type){
            case ListingType.FUTURE:
              response = await this.orderService.buyOrderForLegal(OrderType.BUY, this.orderId,  ListingType.FUTURE, volume, limit, stop, this.allOrNone, this.isMargin);
              if (response.approved) {
                this.popupService.openCustomMessage({
                  title: "Response",
                  header: "Purchase Successful!",
                  message: "Your future option has been successfully bought."
                })
              } else {
                this.popupService.openCustomMessage({
                  title: "Options",
                  header: ((response.wholeResponse as any)?.error as string),
                  message: ""
                })
              }
              break;
            case ListingType.STOCK:
              response = await this.orderService.buyOrderForLegal(OrderType.BUY, this.orderId,  ListingType.STOCK, volume, limit, stop, this.allOrNone, this.isMargin);
              if (response.approved) {
                this.popupService.openCustomMessage({
                  title: "Options",
                  header: "Purchase Successful!",
                  message: "Your stock option has been successfully bought."
                })
              } else {
                console.log((response.wholeResponse as any)?.error?.error);
                this.popupService.openCustomMessage({
                  title: "Options",
                  header: ((response.wholeResponse as any)?.error as string),
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
    if(this.volumeOfStock == '' && parseFloat(this.volumeOfStock) < 0) return false;
    return isNaN(parseFloat(this.volumeOfStock));
  }

  validInputLimit(){
    if(this.limitValue == '' && parseFloat(this.limitValue) < 0) return false;
    return isNaN(parseFloat(this.limitValue));
  }

  validInputStop(){
    if(this.stopValue == '' && parseFloat(this.stopValue) < 0) return false;
    return isNaN(parseFloat(this.stopValue));
  }

  setValue(value: boolean){
    this.allOrNone = value;
  }

  getValue(){
    if(this.allOrNone) return "YES"; else return "NO"
  }

  setMarginValue(value: boolean){
    this.isMargin = value;
    this.calculateValues();
  }

  getMargin(){
    if(this.isMargin) return "YES"; else return "NO"
  }

  calculateValues(): void {
    this.totalValue = this.round(parseFloat(this.volumeOfStock) * this.price, 2);
    this.maintenanceMargin = this.round(0.25 * this.totalValue, 2);
    this.initialMargin = this.round(0.6 * this.totalValue, 2);
    this.loanMargin = this.round(this.totalValue - this.initialMargin, 2);
  }

  round(value: number, decimals: number): number {
    return Number(Math.round(Number(value + 'e' + decimals)) + 'e-' + decimals);
  }

  protected readonly min = min;
}
