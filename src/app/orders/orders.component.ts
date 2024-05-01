import {Component} from '@angular/core';
import {DatePipe, DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {CapitalProfitDto, OrderDto, OrderStatus, SellingRequest, StatusRequest} from "../model/model";
import {OrderService} from "../service/order.service";
import {FormsModule} from "@angular/forms";
import {z} from "zod";
import {OrangeButtonModule} from "../welcome/redesign/OrangeButton";
import {WhiteTextFieldModule} from "../welcome/redesign/WhiteTextField";
import {PopupService} from '../service/popup.service';
import {TableComponentModule} from "../welcome/redesign/TableComponent";
import {TransformSecuritiesPipeModule} from "./TransformSecuritiesPipe";
import {FilterByStatusPipeModule} from "./FilterByStatusPipe";

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
    DatePipe,
    FilterByStatusPipeModule
  ]
})
export class OrdersComponent {
  public OrderStatus = OrderStatus;
  selectedTab: "order-history" | "requests" | "securities" = "order-history"
  orderHistory: OrderDto[] = [];
  orderRequests: OrderDto[] = [];
  orderSecurities: OrderDto[] = [];
  isAdmin: boolean = sessionStorage.getItem('role') === "admin";
  isEmployee: boolean = sessionStorage.getItem('role') === "employee";
  isAgent = sessionStorage.getItem('role') === 'agent';
  isSupervizor = sessionStorage.getItem('role') === 'supervizor';
  popupOpen: boolean = false;
  sellingOrder: OrderDto | null = null;

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

  // TODO Pretpostvaljam da je customerId?? jer se on trazi u putanjama za limit i availableBalance
  totalAvailableBalance: number = 0; // Global variable to store the sum
  orderLimitBalance: number = 0;


  sellScheme = z.object({
    amount: z.number().min(0),
    limitValue: z.number().min(0),
    stopValue: z.number().min(0),
    allOrNone: z.boolean(),
    margin: z.boolean()
  })

  headersSecurities = ['Total Price', 'Account Number', 'Currency', 'Listing Type', 'Total', 'Reserved'];
  securities: CapitalProfitDto[] = [];

  constructor(private orderService: OrderService, private popupService: PopupService) {
    this.getSecurityOrders();

  }

  private getSecurityOrders() {
    this.orderService.getSecurityOrders().subscribe(orders => {
      this.securities = orders;
      console.log(this.securities)
    });
  }


  setSelectedTab(tab: "order-history" | "requests" | "securities") {
    this.selectedTab = tab;
  }

  async ngOnInit() {
    // this.orderHistory = await this.orderService.getOrderHistory();
    // this.orderRequests = await this.orderService.getOrderRequests();
    // this.orderSecurities = await this.orderService.getOrderSecurities();

    var customerId = sessionStorage.getItem('loggedUserID');
    if(customerId) {
      // this.orderService.fetchAccountData(customerId).subscribe(total => {
      //   this.totalAvailableBalance = total;
      // });
      this.orderService.fetchUserForLimit(customerId).subscribe(user => {
        this.orderLimitBalance = user.orderlimit;
        // TODO pretpostavka da je available = limitNow
        this.totalAvailableBalance = user.limitNow;
        console.log(this.orderLimitBalance);
      }, error => {
        console.error('Failed to fetch user order limit:', error);
      });
    }



    if(this.isSupervizor || this.isAdmin){
    this.orderHistory = await this.orderService.getAllOrdersHistory();
      console.log("order history")
      console.log(this.orderHistory);

    }else{
      this.orderHistory=await this.orderService.getOrdersHistory();
      console.log("order history")

      console.log(this.orderHistory);
    }

    //Da li zapravo ovde uzimam isti ovaj orderHistory samo filtriram gde je order.status processing
    this.orderRequests = this.orderHistory.filter(order => order.status == OrderStatus.PROCESSING);
    //ili poseban poziv
    //this.orderRequests=await this.orderService.getOrderRequests();

    //Da li zapravo ovde uzimam isti ovaj orderHistory samo filtriram gde je order.orderType "SELL"
    //this.orderSecurities = this.orderHistory.filter(order => order.orderType === 'SELL');
    //this.orderSecurities = this.orderService.get
    //ili poseban poziv
    // this.orderSecurities=await this.orderService.getOrderSecurities();
  }

  async approveOrder(order: OrderDto) {
    try {
      const response = await this.orderService.approveOrder(order.orderId, StatusRequest.APPROVED);
      console.log('Response from approveOrder:', response.success);

       // Brisem ovaj orderr iz niza i tabele (ako treba, a mislim da treba):
      if(response.success){
        const index = this.orderRequests.findIndex(order => order.orderId === order.orderId);
        if (index !== -1) {
          this.orderRequests = this.orderRequests.filter((order, idx) => idx !== index);
        }
      }
    //  const index = this.orderRequests.findIndex(order => order.orderId === orderr.orderId);
    //   if (index !== -1) {
    //     this.orderRequests = this.orderRequests.filter((order, idx) => idx !== index);
    //   }
    } catch (error) {
      console.error('Error while approving order:', error);
    }
  }

  async denyOrder(orderr: OrderDto) {
    try{
    const response = await this.orderService.denyOrder(orderr.orderId,StatusRequest.DENIED);
    console.log('Response from denyOrder:', response.success);

    if(response.success){
      const index = this.orderRequests.findIndex(order => order.orderId === orderr.orderId);
      if (index !== -1) {
        this.orderRequests = this.orderRequests.filter((order, idx) => idx !== index);
      }
    }
    // Brisem ovaj orderr iz niza i tabele (ako treba, a mislim da treba):
    //  const index = this.orderRequests.findIndex(order => order.orderId === orderr.orderId);
    //   if (index !== -1) {
    //     this.orderRequests = this.orderRequests.filter((order, idx) => idx !== index);
    //   }


    }catch (error) {
      console.error('Error while denying order:', error);
    }
  }

  sellOrder(original: any) {
    if(original.listingType === 'STOCK') {
      this.popupService.openSellPopup(original.listingId, false, false, true);
    } else if(original.listingType === 'FOREX') {
      this.popupService.openSellPopup(original.listingId, false, true, false);
    } else if(original.listingType === 'FUTURE') {
      this.popupService.openSellPopup(original.listingId, true, false, false);
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

}
