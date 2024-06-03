import {Component} from '@angular/core';
import {DatePipe, DecimalPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {
  CapitalProfitDto,
  ListingType,
  OrderDto,
  OrderStatus,
  OrderType,
  SellingRequest,
  StatusRequest
} from "../model/model";
import {OrderService} from "../service/order.service";
import {FormsModule} from "@angular/forms";
import {z} from "zod";
import {OrangeButtonModule} from "../welcome/redesign/OrangeButton";
import {WhiteTextFieldModule} from "../welcome/redesign/WhiteTextField";
import {PopupService} from '../service/popup.service';
import {TableComponentModule} from "../welcome/redesign/TableComponent";
import {TransformSecuritiesPipeModule} from "./TransformSecuritiesPipe";
import {FilterByStatusPipeModule} from "./FilterByStatusPipe";
import {ExtendedModule} from "@angular/flex-layout";
import {TransformPublicSecuritiesPipeModule} from "./TransformPublicSecuritiesPipe";

@Component({
  selector: 'app-orders',
  standalone: true,
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
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
  ]
})
export class OrdersComponent {
  public OrderStatus = OrderStatus;
  selectedTab: "order-history" | "requests" | "securities" | "public-securities"= "order-history"
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
  securities: any[] = [];

  headersPublicSecurities = ['Security', 'Symbol', 'Amount', 'Price', 'Profit', 'Last Modified', 'Owner'];
  publicSecurities: any[] = [];
  changedPublicValue: number = 0;

  constructor(private orderService: OrderService,
              private popupService: PopupService) {

  }

  private getSecurityOrders() {
    this.orderService.getSecurityOrders().subscribe({
      next: (securities: CapitalProfitDto[]) => {
        this.securities = securities;
      },
      error: (error) => {
        console.error('Error fetching securities', error);
      }
    });

   // this.mockSecurityOrders();
  }

  mockSecurityOrders(){
    const example1 = {
      bankAccountNumber: "string",
      currencyName: "string",
      listingType: ListingType.FOREX,
      listingId: 13425,
      totalPrice: 10000,
      total: 346457,
      ticker: "string",
      reserved: 35556,
      public: 123,
      showPopup: false,
    }
    const example2 = {
      bankAccountNumber: "string",
      currencyName: "string",
      listingType: ListingType.FOREX,
      listingId: 13425,
      totalPrice: 10000,
      total: 346457,
      ticker: "string",
      reserved: 35556,
      public: 123,
      showPopup: false,
    }
    const example3 = {
      bankAccountNumber: "string",
      currencyName: "string",
      listingType: ListingType.FOREX,
      listingId: 13425,
      totalPrice: 10000,
      total: 346457,
      ticker: "string",
      reserved: 35556,
      public: 123,
      showPopup: false,
    }

    this.securities.push(example1)
    this.securities.push(example2)
    this.securities.push(example3)
  }

  getPublicSecurities(){
    this.orderService.getPublicSecurities().subscribe(res =>{
      this.publicSecurities = res;
    })
  }


  setSelectedTab(tab: "order-history" | "requests" | "securities" | "public-securities") {
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

  async approveOrder(order: OrderDto) {
      this.orderService.decideOrder(order.orderId, StatusRequest.APPROVED).subscribe( async response => {
        this.orderHistory = await this.orderService.getAllOrdersHistory();
      })

  }

  async denyOrder(order: OrderDto) {
      this.orderService.decideOrder(order.orderId, StatusRequest.DENIED).subscribe( async response => {
        this.orderHistory = await this.orderService.getAllOrdersHistory();
      })
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

  openSellMenu(order: OrderDto) {
    this.sellingOrder = order;
    this.popupOpen = true;
  }

  closeSellingMenu() {
    this.sellingOrder = null;
    this.popupOpen = false;
  }

  getAvailable(): number{
    let available = this.orderLimitBalance - this.totalAvailableBalance;
    if(available < 0)
      return 0;
    else
      return available;
  }

  changePublicValue(element: any){
    console.log(element);
    this.orderService.changePublicValueMock(element.listingId, this.changedPublicValue).subscribe(res => {
      this.getSecurityOrders();
    })
    element.showPopup = false;
  }

  showPopup(security: any){
    this.securities.forEach(el => el.showPopup = false); // Close other popups
    this.changedPublicValue = security.public;
    security.showPopup = true;
  }

  cancelChangePublic(security: any){
    security.showPopup = false;
  }

  offerSecurity(security: any){
    this.popupService.openPublicSecuritiesPopup(security);
  }

}
