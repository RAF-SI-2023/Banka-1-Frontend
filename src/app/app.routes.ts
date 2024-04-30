import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { SecurityListComponent } from './security-list/security-list.component';
import { NgModule } from "@angular/core";
import { WelcomeComponent } from './welcome/welcome.component';
import { EmployeeGuard } from './guards/employee.guard';
import { AdminGuard } from './guards/admin.guard';
import {ForexViewComponent} from "./forex-view/forex-view.component";
import {StockViewComponent} from "./stock-view/stock-view.component";
import {loginGuard} from "./guards/login.guard";
import {welcomeGuard} from "./guards/welcome.guard";
import { ExchangeRateComponent } from './exchange-rate/exchange-rate.component';
import { TransactionComponent } from './transaction/transaction.component';
import { CustomerComponent } from './customer/customer.component';
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {UserResetPasswordComponent} from "./user-reset-password/user-reset-password.component";
import {resetPasswordGuard} from "./guards/reset-password.guard";
import { CustomerGuard } from './guards/customer.guard';
import {UserDetailComponent} from "./user-detail/user-detail.component";
import {ActivateAccountComponent} from "./activate-account/activate-account.component";
import {FutureViewComponent} from "./future-view/future-view.component";
import {OrdersComponent} from "./orders/orders.component";
import {CardTransactionsComponent} from "./card-transactions/card-transactions.component";
import {LoanTableComponent} from "./loans/loan-table/loan-table.component";
import {NewLoanComponent} from "./loans/new-loan/new-loan.component";
import { NewPaymentComponent } from './new-payment/new-payment.component';
import { TransactionsOverviewComponent } from './transactions-overview/transactions-overview.component';
import { RecipientsComponent } from './recipients/recipients.component';
import { AdminAndEmployeeGuard } from './guards/admin-and-employee.guard';
import { AgentAndSupervizorGuard } from './guards/agent-and-supervizor.guard';
import { AgentAndSupervizorAndAdminGuard } from './guards/agent-and-supervizor-and-admin.guard';
import { supportsPassiveEventListeners } from '@angular/cdk/platform';
import { BankAccountsAndCardsComponent } from "./bank-accounts-and-cards/bank-accounts-and-cards.component";


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, //this will make the first page that is loaded a login page
  { path: 'login', component: LoginPageComponent, canActivate: [loginGuard] },
  { path: 'welcome', component: WelcomeComponent, canActivate: [welcomeGuard] },
  {
    path: 'user',
    canActivate: [AgentAndSupervizorAndAdminGuard],
    children: [
      { path: 'add', component: AddUserComponent },
      { path: 'update', component: UpdateUserComponent },
      { path: 'list', component: ListUserComponent },
    ]
  },
  {path:'customer/set-password/:token', component: SetPasswordComponent},
  {path:'employee/set-password/:token', component: SetPasswordComponent},
  {path:'reset-password/:position', component: ResetPasswordComponent, canActivate: [resetPasswordGuard]},
  {path:'customer/reset-password/:token', component: UserResetPasswordComponent, canActivate: [resetPasswordGuard]},
  {path:'employee/reset-password/:token', component: UserResetPasswordComponent, canActivate: [resetPasswordGuard]},
  {
    path: 'security',
    // canActivate: [AdminAndEmployeeGuard],
    children: [
      { path: 'all', component: SecurityListComponent },
      { path: "stock/:ticker", component: StockViewComponent },
      {path: 'forex/:ticker', component: ForexViewComponent},
      {path: 'future/:ticker', component: FutureViewComponent},],
  },



  {path:'exchange', component: TransactionComponent},
  {path: 'payment', component: NewPaymentComponent},

  //{path:'exchange-rate', component: ExchangeRateComponent,canActivate:[ExchangeRateGuard]},



  {path:'payment/overview',component:TransactionsOverviewComponent,canActivate: [CustomerGuard]},

  {path:'transaction', component: TransactionComponent,canActivate:[CustomerGuard]},



  {path:'exchange-rate', component: ExchangeRateComponent,canActivate:[CustomerGuard]},



  {
    path: 'customer',
    children: [
      {path: 'all', component: CustomerComponent},
      {path: 'view', component: UserDetailComponent}
    ]
  },

  { path: 'bank-accounts', component: BankAccountsAndCardsComponent, canActivate: [CustomerGuard], data: { type: 'bankAccount' } },
  { path: 'cards', component: BankAccountsAndCardsComponent, canActivate: [CustomerGuard], data: { type: 'card' } },
  { path: 'recipients', component: RecipientsComponent, canActivate: [CustomerGuard]},
  { path: 'loans', component: LoanTableComponent, canActivate: [CustomerGuard]},
  { path: 'new-loan', component: NewLoanComponent, canActivate: [CustomerGuard]},

  { path: 'card-transactions', component: CardTransactionsComponent,canActivate: [CustomerGuard]},

  // { path: 'customer/:customerId', component: UserDetailComponent},

  { path: 'activate-account', component: ActivateAccountComponent },
  { path: 'orders', component: OrdersComponent, canActivate: [AgentAndSupervizorAndAdminGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutes { }
