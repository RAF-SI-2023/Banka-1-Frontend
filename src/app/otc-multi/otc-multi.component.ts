import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MyStockDto } from '../model/model';
import { MultiOtcService } from '../service/multi-otc.service';
import { HttpErrorResponse } from '@angular/common/http';

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

  constructor(private multiOtcService: MultiOtcService) {this.selectedTab = "my-stocks";}

  setSelectedTab(tab: "other-bank-stocks" | "my-stocks" | "received-offers" | "sent-offers") {
    this.selectedTab = tab;
  }

  ngOnInit() {
    this.loadAllMyStocks();
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

  toggleMenu(stock: any): void {
    // Close the current menu if clicked again or another is clicked
    if (this.selectedStock && this.selectedStock === stock) {
      this.selectedStock = null;
    } else {
      this.selectedStock = stock;
    }
  }

  setOrder(stock: MyStockDto, numberOfPublicStocks: any, priceOfPublicStock: any, idx: number): void {
    // Implementation of sell order
    console.log('Set:');
    console.log(stock);
    console.log(numberOfPublicStocks, priceOfPublicStock, idx);
    this.toggleMenu(null); // Close menu after action
  }

  sellStock(stockToSell:MyStockDto){
    console.log("Selling stock:");
    console.log(stockToSell);
  }
}
