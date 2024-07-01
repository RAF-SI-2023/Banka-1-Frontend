import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EditMyPublicStock, MyStockDto, OfferStatus, OtherBankStocks, ReceivedOffersDto, SendOffersDto } from '../model/model';
import { MultiOtcService } from '../service/multi-otc.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PopupService } from '../service/popup.service';

@Component({
  selector: 'app-otc-multi',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './otc-multi.component.html',
  styleUrl: './otc-multi.component.css'
})
export class OtcMultiComponent {

  selectedTab: "other-bank-stocks" | "my-stocks" | "received-offers" | "sent-offers";
  isAdmin: boolean = sessionStorage.getItem('role') === "admin";
  isEmployee: boolean = sessionStorage.getItem('role') === "employee";
  isAgent = sessionStorage.getItem('role') === 'agent';
  isSupervizor = sessionStorage.getItem('role') === 'supervizor';
  selectedStock: any = null;
  OfferStatus = OfferStatus;

  myStocks : MyStockDto[] = [];
  receivedOffers : ReceivedOffersDto[] = [];
  sentOffers : SendOffersDto[] = [];
  otherBankStocks : OtherBankStocks[] = [];

  constructor(private multiOtcService: MultiOtcService, private popupService: PopupService) {this.selectedTab = "my-stocks";}

  setSelectedTab(tab: "other-bank-stocks" | "my-stocks" | "received-offers" | "sent-offers") {
    this.selectedTab = tab;

    //refresh all data when switching tabs
    this.loadAllMyStocks();
    this.loadAllReceivedOffers();
    this.loadAllSentOffers();
    this.stepBeforeLoadingOtherBankStocks();
  }

  ngOnInit() {
    this.loadAllMyStocks();
    this.loadAllReceivedOffers();
    this.loadAllSentOffers();
    this.stepBeforeLoadingOtherBankStocks();
  }

  loadAllMyStocks()
  {
    this.multiOtcService.getAllMyStocks().subscribe(
      (allMyStocksFromAPI: MyStockDto[]) => {
        this.myStocks = allMyStocksFromAPI;

        console.log('All myStocks data loaded');
        console.log(this.myStocks);
      },
      (error: HttpErrorResponse) => {
        console.error('Error loading myStocks:', error);
      }
    );
  }

  loadAllReceivedOffers()
  {
    this.multiOtcService.getAllReceivedOffers().subscribe(
      (allReceivedOffersFromAPI: ReceivedOffersDto[]) => {
        this.receivedOffers = allReceivedOffersFromAPI;

        console.log('All receivedOffers data loaded');
        console.log(this.receivedOffers);
      },
      (error: HttpErrorResponse) => {
        console.error('Error loading myStocks:', error);
      }
    );
  }

  loadAllSentOffers()
  {
    this.multiOtcService.getAllSendOffers().subscribe(
      (allSentOffersFromAPI: SendOffersDto[]) => {
        this.sentOffers = allSentOffersFromAPI;

        console.log('All sentOffers data loaded');
        console.log(this.sentOffers);
      },
      (error: HttpErrorResponse) => {
        console.error('Error loading myStocks:', error);
      }
    );
  }

  loadOtherBankStocks()
  {
    this.multiOtcService.getAllOtherBankStocks().subscribe(
      (allOtherBankStocks: OtherBankStocks[]) => {
        this.otherBankStocks = allOtherBankStocks;

        console.log('All otherBankStocks data loaded');
        console.log(this.otherBankStocks);
      },
      (error: HttpErrorResponse) => {
        console.error('Error loading myStocks:', error);
      }
    );
  }

  stepBeforeLoadingOtherBankStocks()
  {
    this.multiOtcService.stepBeforeGetAllOtherBankStocks().subscribe({
      next: (response) => {
        console.log("Response received:", response);
        this.loadOtherBankStocks();
      },
      error: (error) => {
        console.error("Error:", error);
      }
    });
  }

  toggleMenu(stock: any): void {
    // Close the current menu if clicked again or another is clicked
    if (this.selectedStock && this.selectedStock === stock) {
      this.selectedStock = null;
    } else {
      this.selectedStock = stock;
    }
  }

  setStock(stock: MyStockDto, numberOfPublicStocks: any, priceOfPublicStock: any, idx: number): void {
    // Implementation of sell order
    console.log('Set:');
    console.log(stock);
    console.log(numberOfPublicStocks, priceOfPublicStock, idx);

    let editStock : EditMyPublicStock = {
      ticker: stock.ticker,
      publicAmount: numberOfPublicStocks,
      price: priceOfPublicStock
    } 

    if(stock.amount && numberOfPublicStocks <= stock.amount && priceOfPublicStock >= 0){
      this.multiOtcService.setPriceAndAmountOfMyPublicStocks(editStock).subscribe(res => {
        console.log(res);
        if(res) 
          alert("Successfully set pricec and amount of public stock");
        else
          alert("Error while setting pricec and amount of public stock");
      })
    }
    else if(stock.amount && numberOfPublicStocks > stock.amount){
      alert("Public amount is set to a number greater than amount. \nOperation denied.");
    }
    else if(priceOfPublicStock < 0){
      alert("Price can not be negative, operation denied");
    }
    

    this.toggleMenu(null); // Close menu after action
  }

  offerStock(otherBankStock:OtherBankStocks){
    // let otherBankStocks : OtherBankStocks = {
    //   amount: 69,
    //   ticker: "MIHA"
    // }

    this.popupService.openSellMultiOtcPopup(otherBankStock);
  }

  isPublicAmountValid(newVal: number, stock: MyStockDto) {
    const value = Number(newVal); // Convert the input value to a number

    console.log("Log from isPublicAmountValid:");
    console.log(newVal);
    console.log(stock);

    if(stock.amount)
    {
      if(newVal > stock.amount)
      {
        alert("Public amount can not be greater than amount.")
        return false;
      }
      else 
      {
        return true;
      }
    }

    return true;
  }

  isPriceValid(price: any){
    const value = Number(price); // Convert the input value to a number
    console.log("Log from isPriceValid:");

    if(value < 0){
      alert("Price can not be negative");
    }
  }


  acceptOffer(offer: ReceivedOffersDto, idx: number){
    this.multiOtcService.acceptOffer(offer).subscribe(res => {
      console.log(res);

      alert("Successfully accepted offer");
      //this.receivedOffers.splice(idx, 1);
      this.loadAllReceivedOffers();
    })
  }

  denyOffer(offer: ReceivedOffersDto, idx: number){
    this.multiOtcService.denyOffer(offer).subscribe(res => {
      console.log(res);

      alert("Successfully denied offer");
      //this.receivedOffers.splice(idx, 1);
      this.loadAllReceivedOffers();
    })
  }
}
