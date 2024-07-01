import {Component, OnInit} from '@angular/core';
import {DatePipe, DecimalPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {FilterByStatusPipeModule} from "../orders/FilterByStatusPipe";
import {FormsModule} from "@angular/forms";
import {OrangeButtonModule} from "../welcome/redesign/OrangeButton";
import {TableComponentModule} from "../welcome/redesign/TableComponent";
import {TransformPublicSecuritiesPipeModule} from "../orders/TransformPublicSecuritiesPipe";
import {TransformSecuritiesPipeModule} from "../orders/TransformSecuritiesPipe";
import {
  AllPublicCapitalsDto,
  CapitalProfitDto,
  ListingType,
  OrderDto,
  PublicCapitalDto, PublicOffer, PublicStock,
  SellingRequest,
  StatusRequest, StockListing
} from "../model/model";
import {z} from "zod";
import {OrderService} from "../service/order.service";
import {PopupService} from "../service/popup.service";
import {WhiteTextFieldModule} from "../welcome/redesign/WhiteTextField";
import {ExtendedModule} from "@angular/flex-layout";
import {TransformOrderHistoryPipe} from "../transform-order-history.pipe";

@Component({
  selector: 'app-orders-legal-persons',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    FormsModule,
    OrangeButtonModule,
    WhiteTextFieldModule,
    DecimalPipe,
    TableComponentModule,
    TransformSecuritiesPipeModule,
    TransformPublicSecuritiesPipeModule,
    DatePipe,
    FilterByStatusPipeModule,
    NgClass,
    ExtendedModule,
    TransformOrderHistoryPipe
  ],
  templateUrl: './orders-legal-persons.component.html',
  styleUrl: './orders-legal-persons.component.css'
})
export class OrdersLegalPersonsComponent implements OnInit {
  selectedTab: "public-securities" | "all-securities" | "order-history";
  isAdmin: boolean = sessionStorage.getItem('role') === "admin";
  isEmployee: boolean = sessionStorage.getItem('role') === "employee";
  isAgent = sessionStorage.getItem('role') === 'agent';
  isSupervizor = sessionStorage.getItem('role') === 'supervizor';

  amount: number = 0;
  limitValue: number = 0;
  stopValue: number = 0;
  allOrNone: boolean = false;
  margin: boolean = false;

  totalAvailableBalance: number = 0; // Global variable to store the sum
  orderLimitBalance: number = 0;

  securities: CapitalProfitDto[] = [];

  orderHistory: OrderDto[] = [];

  headersPublicSecurities = ['Security', 'Symbol', 'Amount', 'Last Modified', 'Owner'];
  publicSecurities: AllPublicCapitalsDto[] = [];

  headersOrderHistory = ['Security', 'Transaction', 'Amount', 'Price', 'Status', 'Last Modified']


  allSecurities: any[] = [];
  changedPublicValue: number = -1;

  constructor(private orderService: OrderService,
              private popupService: PopupService) {
      this.selectedTab = "all-securities";
  }

  async ngOnInit() {
    this.loadOrders();
    this.getSecurityOrders();
    this.getPublicSecurities();
  }


  private getSecurityOrders() {
    this.orderService.getSecurityOrders().subscribe({
      next: (securities: CapitalProfitDto[]) => {
        this.securities = securities;
        this.allSecurities = securities.map(security => ({
          security: security,
          showPopup: false
        }))
      },
      error: (error) => {
        console.error('Error fetching securities', error);
      }
    });

    // this.mockSecurityOrders();
  }



  getPublicSecurities(){
    this.orderService.getPublicStocks().subscribe( res =>{
      this.publicSecurities = res
    })
  }



  setSelectedTab(tab: "public-securities" | "all-securities" | "order-history") {
    this.selectedTab = tab;
  }

  sellOrder(original: any) {
    if(original.security.listingType === 'STOCK') {
      this.popupService.openSellPopup(original.security.listingId, true, original.security.total, false, false, true).afterClosed().subscribe(() =>{
        this.getSecurityOrders()
        this.loadOrders()
      });
    } else if(original.security.listingType === 'FOREX') {
      this.popupService.openSellPopup(original.security.listingId,true, original.security.total, false, true, false).afterClosed().subscribe(() =>{
        this.getSecurityOrders()
        this.loadOrders()
      });
    } else if(original.security.listingType === 'FUTURE') {
      this.popupService.openSellPopup(original.security.listingId,true, original.security.total, true, false, false).afterClosed().subscribe(() =>{
        this.getSecurityOrders()
        this.loadOrders()
      });
    }
  }

  async loadOrders(){
    if(this.isSupervizor || this.isAdmin){
      this.orderHistory = await this.orderService.getAllOrdersHistory();
    }else{
      this.orderHistory=await this.orderService.getOrdersHistory();
    }

  }

  changePublicValue(element: any){
    this.orderService.changePublicValueCustomer(element.listingType, element.listingId, this.changedPublicValue).subscribe(res => {
      if(res) {
        this.getSecurityOrders();
        element.showPopup = false;
      }
    })
  }

  showPopup(security: any){
    this.allSecurities.forEach(el => el.showPopup = false); // Close other popups
    this.changedPublicValue = security.public;
    security.showPopup = true;
  }

  changePublicValueButton(security: any): boolean{
    if (this.changedPublicValue > 0) {
      if (security.security.total - security.security.publicTotal >= this.changedPublicValue)
        return true;
    }
    return false;
  }

  cancelChangePublic(security: any){
    security.showPopup = false;
    this.changedPublicValue = -1;
  }

  offerSecurity(security: PublicStock){
    this.popupService.openPublicSecuritiesPopup(security);
  }


  mockPublicSecurities(){
    const ex1 : AllPublicCapitalsDto = {
      listingType: ListingType.STOCK,
      listingId: 456,
      ticker:"AAPL",
      amount: 138,
      lastModified:"Jan 1, 2024",
      bankAccountNumber: "345677885",
      ownerName: "Nastasja"
    }

    this.publicSecurities.push(ex1);
  }

  mockSecurityOrders(){
    const example1: CapitalProfitDto = {
      bankAccountNumber: "string",
      listingType: ListingType.FOREX,
      listingId: 13425,
      totalPrice: 10000,
      total: 346457,
      ticker: "string",
      reserved: 35556,
      publicTotal: 123,
      averageBuyingPrice: 123
    }
    const example2: CapitalProfitDto = {
      bankAccountNumber: "string",
      listingType: ListingType.FOREX,
      listingId: 13425,
      totalPrice: 10000,
      total: 346457,
      ticker: "string",
      reserved: 35556,
      publicTotal: 123,
      averageBuyingPrice: 123
    }
    const example3: CapitalProfitDto = {
      bankAccountNumber: "string",
      listingType: ListingType.FOREX,
      listingId: 13425,
      totalPrice: 10000,
      total: 346457,
      ticker: "AAPL",
      reserved: 35556,
      publicTotal: 123,
      averageBuyingPrice: 123
    }

    this.securities.push(example1)
    this.securities.push(example2)
    this.securities.push(example3)

    this.allSecurities = this.securities.map(security => ({
      security: security,
      showPopup: false
    }))
  }

  protected readonly history = history;
}
