import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EditMyPublicStock, MyStockDto, OtherBankStocks, ReceivedOffersDto, SendOffersDto } from '../model/model';
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

  myStocks : MyStockDto[] = [];
  receivedOffers : ReceivedOffersDto[] = [];
  sentOffers : SendOffersDto[] = [];
  otherBankStocks : OtherBankStocks[] = [];

  constructor(private multiOtcService: MultiOtcService, private popupService: PopupService) {this.selectedTab = "my-stocks";}

  setSelectedTab(tab: "other-bank-stocks" | "my-stocks" | "received-offers" | "sent-offers") {
    this.selectedTab = tab;
  }

  ngOnInit() {
    this.loadAllMyStocks();
    this.loadAllReceivedOffers();
    this.loadAllSentOffers();
    this.loadOtherBankStocks();
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

    this.multiOtcService.setPriceAndAmountOfMyPublicStocks(editStock).subscribe(res => {
      console.log(res);
      if(res) 
        alert("Successfully set pricec and amount of public stock");
      else
        alert("Error while setting pricec and amount of public stock");
    })

    this.toggleMenu(null); // Close menu after action
  }

  sellStock(otherBankStock:OtherBankStocks){
    // let otherBankStocks : OtherBankStocks = {
    //   amount: 69,
    //   ticker: "MIHA"
    // }

    this.popupService.openSellMultiOtcPopup(otherBankStock);
  }
}
