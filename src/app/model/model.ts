export interface User{
    userId: number;
    username:string;
    password:string;
    email: string;
    firstName: string;
    lastName: string;
    jmbg: string;
    position: string;
    phoneNumber: string;
    active: boolean;

    limitNow: number;
    orderlimit: number;
    requireApproval: boolean;

    permissions:Permissions[]
}


export enum StatusRequest{
  APPROVED="APPROVED",
  DENIED="DENIED"
}

export interface DecideOrderResponse{
  success:boolean,
  message:string
}

export interface Permissions{
    permission_id?:number;
    name:string;
    description?:string;
}
export interface Limit{
  userId: number;
  email: string;
  limit?: number;
  usedLimit?: number;
  needApprove?: boolean;
}

export interface Permissions {
  permission_id?: number;
  name: string;
  description?: string;
}

export interface BankAccount {
  accountType?: string;
  accountNumber?: string;
  accountStatus?: string;
  currency?: string;
  balance?: number;
  availableBalance?: number;
  reservedResources?: number;
  accountOwner?: string;
  accountName?: string;
}

export interface Account {
  accountNumber: string;
  accountType: AccountType;
  currencyName: string;
  maintenanceCost: number;
  balance: number;
}

export interface Transaction {
  recepientBankAccount: string;
  date: Date;
  status: string;
  amount: number;
}

export interface Profit {
  name: string;
  totalProfit: number;
  phoneNumber: string;
  email: string;
}

export enum TransactionStatus {
  PROCESSING = 'PROCESSING',
  COMPLETE = 'COMPLETE',
  DENIED = 'DENIED'
}

export interface Payment {
  id: number;
  senderAccountOwnerName?: string;
  senderAccountNumber?: string;
  recipientAccountOwnerName?: string;
  recipientAccountNumber?: string;
  amount?: number;
  paymentCode?: string;
  model?: string;
  referenceNumber?: string
  status?: TransactionStatus;
  commissionFee?: number;
  dateOfPayment?: number;
  channel?: string;
}



export interface Exchange {
  id: number;
  senderName?: string;
  senderAccountNumber?: string;
  recipientAccountOwnerName?: string;
  recipientAccountNumber?: string;
  amount?: number;
  paymentCode?: string;
  model?: string;
  referenceNumber?: string
  status?: TransactionStatus;
  commissionFee?: number;
  dateOfPayment?: number;
  channel?: string;
  convertedAmount?: number;
  exchangeRate?: number;
  commision?: number;
  transferDate?: number;
}

export interface NewLimitDto{
  userId: number;
  approvalRequired: boolean;
  limit: number;
}

export interface Recipient {
  id?: number;
  firstName?: string;
  lastName?: string;
  bankAccountNumber?: string;
}

export interface Card {
  id?: number;
  cardNumber?: string;
  cardType?: string;
  cardName?: string;
  creationDate?: number;
  expirationDate?: number;
  accountNumber?: string;
  cvv?: string;
  cardLimit?: number;
  isActivated?: boolean;
}

export interface CreateUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  jmbg: string;
  position: string;
  phoneNumber: string;
  active: boolean;
}
export interface TransactionBasics {
  senderAccountNumber: string;
  recipientAccountNumber: string;
  amount: string;
}

export interface TransactionDto {
  amount: number;
  date: number;
  recipientAccountNumber: string;
  status: string;
}

export interface TransactionDetails {
  recipientName: String;
  amount: number;
  referenceNumber: String;
  paymentCode: number;
  purposeOfPayment: String;
  transactionDate: number;
  senderName: String;
  recipientAccountNumber: String;
  commission: number;
  senderAccountNumber: String;
  channel: String;
  status: String;
  currency: String;
}

export interface UserToEdit {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  position: string;
  status: string;
  jmbg: string;
  brlk: string;
  phone: string;
  birth_date: string;
}

export interface StockListing {
  listingId: number;
  listingType: 'stock';
  ticker: string;
  name: string;
  exchangeName: string;
  lastRefresh: number; // UNIX timestamp
  price: number;
  high: number;
  low: number;
  priceChange: number;
  volume: number;
  outstandingShares: number;
  dividendYield: number;
}

export interface Forex {
  listingId: number;
  listingType: 'Forex';
  ticker: string;
  name: string;
  exchangeName: string;
  lastRefresh: number;
  price: number;
  high: number;
  low: number;
  priceChange: number;
  volume: number;
  baseCurrency: string;
  quoteCurrency: string;
}

export interface ExchangeRate {
  baseCurrency: string;
  quoteCurrency: string;
  rate: number;
}

export interface TransformedExchangeRate {
  baseCurrency: string;
  quoteCurrency: string;
  buyingPrice: number;
  sellingPrice: number;
}

export interface Future {
  listingId: number;
  listingType: string;
  ticker: string;
  name: string;
  exchangeName: string;
  lastRefresh: number;
  price: number;
  high: number;
  low: number;
  priceChange: number;
  volume: number;
  contractSize: number;
  contractUnit: string;
  openInterest: number;
  settlementDate: number;
}

export interface ListingHistory {
  listingId: number;
  date: number;
  price: number;
  high: number;
  low: number;
  change: number;
  volume: number;
}

export interface Account {
  accountNumber: string;
  accountType: AccountType;
  currencyName: string;
  maintenanceCost: number;
  balance: number;
}

export interface BankAccountDto {
  accountType: string;
  accountNumber: string;
  accountName: string;
  accountStatus: string;
  currency: string;
  balance: number;
  availableBalance: number;
}

export enum AccountType {
  FOREIGN_CURRENCY = 'FOREIGN_CURRENCY',
  CURRENT = 'CURRENT',
  BUSINESS = 'BUSINESS',
}

export interface Customer {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  jmbg: string;
  phoneNumber: string;
  gender: string;
  address: string;
}

export interface CustomerTable {
  name: string;
  email: string;
  jmbg: string;
  phoneNumber: string;
  gender: string;
  address: string;
}

export interface CreateCustomerRequest {
  firstName: string;
  lastName: string;
  email: string;
  jmbg: string;
  phoneNumber: string;
  gender: string;
  address: string;
  dateOfBirth: number;
}

export interface EditCustomerRequest {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  jmbg: string;
  phoneNumber: string;
  gender: string;
  address: string;
  password: string;
  active: boolean;
  dateOfBirth:number;
}

export interface CreateBankAccountRequest {
  status: boolean;
  currencyCode: string;
  accountType: string;
  maintenanceCost: number;
  accountName: string;
}

export interface Order {
  listingId:number,
  security: string,
  transaction: string,
  symbol: string,
  amount: number,
  price: number,
  status: string,
  lastModified: number
}



export interface OrderDto{
  orderId:number,
  listingId:number,
  listingType:ListingType,
  // owner: EmployeeDto,
  orderType:OrderType,
  status:OrderStatus,
  contractSize:number,
  processedNumber: number,
  limitValue: number,
  stopValue: number,
  fee: number,
  price: number,
  allOrNone: boolean,
  updatedAt: number,
  // approvedBy: EmployeeDto
}

export interface SellingRequest{
  amount:number,
  limitValue:number,
  stopValue:number,
  allOrNone:boolean,
  margin:boolean
}

export enum OrderType{
  BUY="BUY",
  SELL="SELL"
}

export interface CapitalProfitDto {
  bankAccountNumber: string;
  currencyName: string;
  listingType: ListingType;
  listingId: number;
  totalPrice: number;
  total: number;
  ticker: string;
  reserved: number;
}


export interface CreateOrderRequest {
  orderType: OrderType;
  listingId: string;
  listingType: ListingType;
  contractSize: number;
  limitValue: number;
  stopValue: number;
  allOrNone: boolean;
}



export enum ListingType {
  STOCK = "STOCK",
  FUTURE = "FUTURE",
  FOREX = "FOREX"
}


export enum LoanType {
  PERSONAL = 'PERSONAL',
  MORTGAGE = 'MORTGAGE',
  REFINANCING = 'REFINANCING',
  AUTO = 'AUTO',
}

export enum OrderStatus {
  APPROVED = 'APPROVED',
  PROCESSING = 'PROCESSING',
  DONE = 'DONE',
  DENIED = 'DENIED',
  CANCELED = 'CANCELED'
}

export interface Loan {
  id: number;
  loanType: LoanType;
  accountNumber: string;
  loanAmount: number;
  repaymentPeriod: number;
  nominalInterestRate: number;
  effectiveInterestRate: number;
  agreementDate: number;
  maturityDate: number;
  installmentAmount: number;
  nextInstallmentDate: number;
  remainingDebt: number;
  currency: string;
}

export interface CreatePaymentRequest {
    singleUseCode?: string; //verifikacija
    senderAccountNumber?: string;
    recipientName?: string;
    recipientAccountNumber?: string;
    amount?: number
    paymentCode?: string;
    model?: string;
    referenceNumber?: string;
    paymentPurpose?: string;
}

export interface OTC {
  owner: string;
  stock: string;
  outstandingShares: string;
  exchangeName: string;
  dividendYield: string;
  status: string;
}

export interface Contract {
  contractId: number;
  buyerAccountNumber: string;
  sellerAccountNumber: string;
  bankApproval: boolean;
  sellerApproval: boolean;
  comment: string;
  creationDate: number;
  realizationDate: number;
  referenceNumber: string;
  ticker: string;
  amount: number;
  price: number;
  listingId: number;
}
