import { Component } from '@angular/core';
import {DatePipe, DecimalPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {FilterByStatusPipeModule} from "../orders/FilterByStatusPipe";
import {FormsModule} from "@angular/forms";
import {OrangeButtonModule} from "../welcome/redesign/OrangeButton";
import {TableComponentModule} from "../welcome/redesign/TableComponent";
import {TransformPublicSecuritiesPipeModule} from "../orders/TransformPublicSecuritiesPipe";
import {TransformSecuritiesPipeModule} from "../orders/TransformSecuritiesPipe";
import {
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
    ExtendedModule
  ],
  templateUrl: './orders-legal-persons.component.html',
  styleUrl: './orders-legal-persons.component.css'
})
export class OrdersLegalPersonsComponent {
  // public OrderStatus = OrderStatus;
  selectedTab: "public-securities" | "all-securities";
  orderHistory: OrderDto[] = [];
  orderSecurities: OrderDto[] = [];
  isAdmin: boolean = sessionStorage.getItem('role') === "admin";
  isEmployee: boolean = sessionStorage.getItem('role') === "employee";
  isAgent = sessionStorage.getItem('role') === 'agent';
  isSupervizor = sessionStorage.getItem('role') === 'supervizor';
  popupOpen: boolean = false;
  sellingOrder: OrderDto | null = null;
  customerId: string | null = null;

  sellingReq : SellingRequest= {
    amount: 0,
    limitValue:0,
    stopValue:0,
    allOrNone:false,
    margin:false,
  };

  amount: number = 0;
  limitValue: number = 0;
  stopValue: number = 0;
  allOrNone: boolean = false;
  margin: boolean = false;

  totalAvailableBalance: number = 0; // Global variable to store the sum
  orderLimitBalance: number = 0;


  sellScheme = z.object({
    amount: z.number().min(0),
    limitValue: z.number().min(0),
    stopValue: z.number().min(0),
    allOrNone: z.boolean(),
    margin: z.boolean()
  })

  // headersSecurities = ['Total Price', 'Account Number', 'Currency', 'Listing Type', 'Ticker', 'Total', 'Reserved', 'Public'];
  headersSecurities = ['Security', 'Symbol', 'Amount', 'Price', 'Profit', 'Last Modified'];
  securities: CapitalProfitDto[] = [];

  headersPublicSecurities = ['Security', 'Symbol', 'Amount', 'Price', 'Last Modified', 'Owner'];
  publicSecurities: PublicStock[] = [];

  allSecurities: any[] = [];
  changedPublicValue: number = -1;

  // isLegalPerson: boolean = false;


  constructor(private orderService: OrderService,
              private popupService: PopupService) {
    // this.isLegalPerson = sessionStorage.getItem('isLegalPerson') === 'true';

    // if(this.isLegalPerson){
      this.selectedTab = "all-securities";
    // } else {
    //   this.selectedTab = "order-history";
    // }

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

      // showPopup: false,
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

      // showPopup: false,
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
      // showPopup: false,
    }

    this.securities.push(example1)
    this.securities.push(example2)
    this.securities.push(example3)

    this.allSecurities = this.securities.map(security => ({
      security: security,
      showPopup: false
    }))
  }

  getPublicSecurities(){
    let publicStocks: PublicCapitalDto[] = []
    this.orderService.getPublicStocks().subscribe( res =>{
      publicStocks = res;
    })

    let allStocks: StockListing[] = []
    this.orderService.getAllStocks().subscribe(res =>{
      allStocks = res;
    })

    const publicIds = publicStocks.map(stock => stock.listingId);
    const filterAllStocks = allStocks.filter(stock => publicIds.includes(stock.listingId))
    this.publicSecurities = filterAllStocks.map(stock => {
      const date = new Date(stock.lastRefresh);
      const formattedDate = new Intl.DateTimeFormat("en", {month: "long", year: "2-digit", day: "numeric"}).format(date);

      let publicStock: PublicStock = {
          listingType: stock.listingType,
          listingId: stock.listingId,
          ticker: stock.ticker,
          amount: stock.volume,
          price: stock.price,
          lastModified: formattedDate,
          bankAccount: this.getOwner(publicStocks, stock.listingId),
        }
        return publicStock;
    })


    const ex1 : PublicStock = {
      listingType: ListingType.STOCK,
      listingId: 456,
      ticker:"AAPL",
      amount: 138,
      price: 3831,
      lastModified:"Jan 1, 2024",
      bankAccount: "345677885",
    }

    this.publicSecurities.push(ex1);
  }

  getOwner(stocks: PublicCapitalDto[], listingId: number){
    const stock = stocks.find(stock => stock.listingId == listingId);
    if(stock != null)
      return stock.bankAccountNumber
    return "";
  }


  setSelectedTab(tab: "public-securities" | "all-securities") {
    this.selectedTab = tab;
  }

  async ngOnInit() {

    this.customerId = sessionStorage.getItem('loggedUserID');
    if(this.customerId) {
      this.loadLimit()
    }
    this.loadOrders()
    this.getSecurityOrders();
    this.getPublicSecurities();

  }

  loadLimit() {
    if (this.customerId){
      this.orderService.fetchUserForLimit(this.customerId).subscribe(user => {
        this.orderLimitBalance = user.orderlimit;
        this.totalAvailableBalance = user.limitNow;
      }, error => {
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

  sellOrder(original: any) {
    if(original.listingType === 'STOCK') {
      this.popupService.openSellPopup(original.listingId, false, false, true).afterClosed().subscribe(() =>{
        this.loadLimit()
        this.loadOrders()
        this.getSecurityOrders()
      });
    } else if(original.listingType === 'FOREX') {
      this.popupService.openSellPopup(original.listingId, false, true, false).afterClosed().subscribe(() =>{
        this.loadLimit()
        this.loadOrders()
        this.getSecurityOrders()
      });
    } else if(original.listingType === 'FUTURE') {
      this.popupService.openSellPopup(original.listingId, true, false, false).afterClosed().subscribe(() =>{
        this.loadLimit()
        this.loadOrders()
        this.getSecurityOrders()
      });
    }
  }

  getAvailable(): number{
    let available = this.orderLimitBalance - this.totalAvailableBalance;
    if(available < 0)
      return 0;
    else
      return available;
  }

  changePublicValue(element: any){
    this.orderService.changePublicValue(element.listingType, element.listingId, this.changedPublicValue).subscribe(res => {
      if(res)
        this.getSecurityOrders();
    })
    element.showPopup = false;
  }

  showPopup(security: any){
    this.allSecurities.forEach(el => el.showPopup = false); // Close other popups
    this.changedPublicValue = security.public;
    security.showPopup = true;
  }

  changePublicValueButton(security: any): boolean{
    if (this.changedPublicValue > 0) {
      if (security.security.total > this.changedPublicValue)
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
}
