import {NgModule, Pipe, PipeTransform} from '@angular/core';
import {
  CapitalProfitDto,
  CustomerWithAccounts,
  PublicCapitalDto,
  PublicStock,
  StockListing,
  User
} from '../model/model'; // Adjust the import path according to your project structure

@Pipe({
  name: 'transformContractsHistory'
})
export class TransformContractsHistoryPipe implements PipeTransform {
  transform(contracts: any[], customer: CustomerWithAccounts): any[] {
    if (!customer) {
      return contracts.map(contract => ({
        BUYER: contract.buyerAccountNumber,
        SELLER: contract.sellerAccountNumber,
        COMMENT: contract.comment,
        CREATED: contract.creationDate,
        REALIZED: contract.realizationDate,
        TICKER: contract.ticker,
        AMOUNT: contract.amount,
        PRICE: contract.price,
        original: contract // Include the entire original user object for internal use
      }));
    }

    const accountNumbers = customer.accountIds.map(account => account.accountNumber);

    return contracts.map(contract => ({
      BUYER: accountNumbers.includes(contract.buyerAccountNumber) ? 'Me' : contract.buyerAccountNumber,
      SELLER: accountNumbers.includes(contract.sellerAccountNumber) ? 'Me' : contract.sellerAccountNumber,
      COMMENT: contract.comment,
      CREATED: contract.creationDate,
      REALIZED: contract.realizationDate,
      TICKER: contract.ticker,
      AMOUNT: contract.amount,
      PRICE: contract.price,
      original: contract // Include the entire original user object for internal use
    }));
  }
}
@NgModule({
  declarations: [
    // other components
    TransformContractsHistoryPipe
  ],
  exports: [
    TransformContractsHistoryPipe
  ],
  // other module properties
})
export class TransformContractsHistoryPipeModule { }
