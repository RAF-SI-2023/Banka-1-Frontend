import {Component, model} from '@angular/core';
import {DatePipe, DecimalPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {CapitalProfitDto, ListingType, OrderDto, OrderStatus, SellingRequest, StatusRequest} from "../model/model";
import {OrderService} from "../service/order.service";
import {FormsModule} from "@angular/forms";
import {z} from "zod";
import {PublicStock, AllPublicCapitalsDto} from "../model/model";
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

  selectedTab: "order-history" | "requests" | "public-securities" | "all-securities";

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

  allSecurities: any[] = [];
  changedPublicValue: number = -1;


  headersPublicSecurities = ['Security', 'Symbol', 'Amount', 'Last Modified', 'Owner'];
  publicSecurities: AllPublicCapitalsDto[] = [];



  sellScheme = z.object({
    amount: z.number().min(0),
    limitValue: z.number().min(0),
    stopValue: z.number().min(0),
    allOrNone: z.boolean(),
    margin: z.boolean()
  })

  // headersSecurities = ['Total Price', 'Account Number', 'Currency', 'Listing Type', 'Ticker', 'Total', 'Reserved', 'Public'];
  headersSecurities = ['Security', 'Symbol', 'Amount', 'Price'];
  securities: CapitalProfitDto[] = [];


  constructor(private orderService: OrderService,
              private popupService: PopupService) {

    this.selectedTab = "order-history";
    this.getAllSecurityOrders();

    this.getPublicSecurities();
  }

  getPublicSecurities(){
    this.orderService.getPublicStocks().subscribe( res =>{
      this.publicSecurities = res
    })
  }




  private getAllSecurityOrders() {
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

  private getSecurityOrders() {
    this.orderService.getSecurityOrders().subscribe({
      next: (securities: any[]) => {
        this.securities = securities;
        console.log(securities);
      },
      error: (error) => {
        console.error('Error fetching securities', error);
      }
    });
    // this.securities.push({
    //   bankAccountNumber: "string",
    //   // currencyName: 123,
    //   listingType: ListingType.STOCK,
    //   listingId: 123,
    //   totalPrice: 123,
    //   total: 123,
    //   ticker: "string",
    //   reserved: 123,
    //   publicTotal: 123,
    //   averageBuyingPrice: 123,
    // })
  }



  setSelectedTab(tab: "order-history" | "requests" | "public-securities" | "all-securities") {
    this.selectedTab = tab;

    //to refresh table after switching tabs
    this.customerId = sessionStorage.getItem('loggedUserID');
    if(this.customerId) {
      this.loadLimit()
    }
    // this.loadOrders()
    // this.getSecurityOrders();
    // this.getPublicSecurities();

  }

  async ngOnInit() {

    this.customerId = sessionStorage.getItem('loggedUserID');
    if(this.customerId) {
      this.loadLimit()
    }
    this.loadOrders()
    this.getAllSecurityOrders();

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

    console.log("ORDER HISTORY: ");
    console.log(this.orderHistory);

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

  sellAllSecurityOrder(original: any) {
    let isCustomer = false
    if(sessionStorage.getItem("loginUserRole") == "customer") {
      isCustomer = true;
    }
    if(original.security.listingType === 'STOCK') {
      this.popupService.openSellPopup(original.security.listingId, isCustomer,  original.security.total, false, false, true).afterClosed().subscribe(() =>{
        this.getAllSecurityOrders()
      });
    } else if(original.security.listingType === 'FOREX') {
      this.popupService.openSellPopup(original.security.listingId, isCustomer,  original.security.total, false, true, false).afterClosed().subscribe(() =>{
        this.getAllSecurityOrders()
      });
    } else if(original.security.listingType === 'FUTURE') {
      this.popupService.openSellPopup(original.security.listingId, isCustomer,  original.security.total, true, false, false).afterClosed().subscribe(() =>{
        this.getAllSecurityOrders()
      });
    }
  }

  // sellOrder(original: any) {
  //   if(original.listingType === 'STOCK') {
  //     this.popupService.openSellPopup(original.listingId, original.total, false, false, true).afterClosed().subscribe(() =>{
  //       this.loadLimit()
  //       this.loadOrders()
  //       this.getSecurityOrders()
  //     });
  //   } else if(original.security.listingType === 'FOREX') {
  //     this.popupService.openSellPopup(original.security.listingId, original.security.total, false, true, false).afterClosed().subscribe(() =>{
  //       this.loadLimit()
  //       this.loadOrders()
  //       this.getSecurityOrders()
  //     });
  //   } else if(original.security.listingType === 'FUTURE') {
  //     this.popupService.openSellPopup(original.security.listingId, original.security.total, true, false, false).afterClosed().subscribe(() =>{
  //       this.loadLimit()
  //       this.loadOrders()
  //       this.getSecurityOrders()
  //     });
  //   }
  // }

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

  showPopup(security: any){
    this.allSecurities.forEach(el => el.showPopup = false); // Close other popups
    this.changedPublicValue = security.public;
    security.showPopup = true;
  }

  changePublicValue(security: any){
    console.log(sessionStorage.getItem("loginUserRole"))
    if(sessionStorage.getItem("loginUserRole") == "customer") {
      this.orderService.changePublicValueCustomer(security.security.listingType, security.security.listingId, this.changedPublicValue).subscribe(res => {
        if (res) {
          security.showPopup = false;
          // this.changedPublicValue = -1;
          this.getAllSecurityOrders();
          // location.reload()
        }
      })
    } else {
      this.orderService.changePublicValueEmployee(security.security.listingType, security.security.listingId, this.changedPublicValue).subscribe(res => {
        if (res) {
          security.showPopup = false;
          // this.changedPublicValue = -1;
          this.getAllSecurityOrders();
          // location.reload()

        }

      })
    }
  }

  changePublicValueButton(security: any): boolean{
    if (this.changedPublicValue > 0) {
      if (security.security.total - security.security.publicTotal > this.changedPublicValue)
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
