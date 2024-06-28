import {NgModule, Pipe, PipeTransform} from '@angular/core';
import {CapitalProfitDto, PublicCapitalDto, PublicStock, StockListing, User} from '../model/model';
import {DateUtils} from "../welcome/redesign/DateUtils"; // Adjust the import path according to your project structure

@Pipe({
  name: 'transformContracts'
})
export class TransformContractsPipe implements PipeTransform {
  transform(contracts: any[]): any[] {
    return contracts.map(contract => ({
      BUYER: contract.buyerAccountNumber,
      SELLER: contract.sellerAccountNumber,
      COMMENT: contract.comment,
      CREATED: DateUtils.formatDate(contract.creationDate),
      REALIZED: DateUtils.formatDate(contract.realizationDate),
      TICKER: contract.ticker,
      AMOUNT: contract.amount,
      PRICE: contract.price,
      original: contract // Include the entire original user object for internal use
    }));
  }

  private formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toLocaleDateString(); // Customize the format as needed
  }
}
@NgModule({
  declarations: [
    // other components
    TransformContractsPipe
  ],
  exports: [
    TransformContractsPipe
  ],
  // other module properties
})
export class TransformContractsPipeModule { }
