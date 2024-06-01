import {Component} from '@angular/core';
import {DatePipe, DecimalPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {
  CapitalProfitDto,
  ListingType,
  OrderDto,
  OrderStatus,
  OrderType, PublicCapitalDto,
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
  selectedTab: "order-history" | "requests" | "securities" | "public-securities" | "all-securities";
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

  headersPublicSecurities = ['Security', 'Symbol', 'Amount', 'Price', 'Profit', 'Last Modified', 'Owner'];
  publicSecurities: PublicCapitalDto[] = [];

  allSecurities: any[] = [];
  changedPublicValue: number = -1;

  isLegalPerson: boolean = false;

  constructor(private orderService: OrderService,
              private popupService: PopupService) {
    this.isLegalPerson = sessionStorage.getItem('isLegalPerson') === 'true';

    if(this.isLegalPerson){
      this.selectedTab = "all-securities";
    } else {
      this.selectedTab = "order-history";
    }

  }



  private getSecurityOrders() {
    // this.orderService.getSecurityOrders().subscribe({
    //   next: (securities: CapitalProfitDto[]) => {
    //     this.securities = securities;
    //     this.allSecurities = securities.map(security => ({
    //       security: security,
    //       showPopup: false
    //     }))
    //   },
    //   error: (error) => {
    //     console.error('Error fetching securities', error);
    //   }
    // });

   this.mockSecurityOrders();
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
    // this.orderService.getPublicSecurities().subscribe( res =>{
    //   this.publicSecurities = res;
    // })

    const ex1 : PublicCapitalDto = {
      publicTotal: 123,
      isIndividual: true,
      bankAccountNumber: "string",
      listingType: ListingType.STOCK,
      listingId: 123
    }

    this.publicSecurities.push(ex1);
  }


  setSelectedTab(tab: "order-history" | "requests" | "securities" | "public-securities" | "all-securities") {
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

  offerSecurity(security: PublicCapitalDto){
    this.popupService.openPublicSecuritiesPopup(security);
  }

}
