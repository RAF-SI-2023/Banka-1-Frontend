import {NgModule, Pipe, PipeTransform} from '@angular/core';
import {CapitalProfitDto, User} from '../model/model'; // Adjust the import path according to your project structure

@Pipe({
  name: 'transformSecurities'
})
export class TransformSecuritiesPipe implements PipeTransform {
  transform(securities: CapitalProfitDto[]): any[] {
    return securities.map(security => ({
      // ACCOUNT_NUMBER: security.bankAccountNumber,
      // CURRENCY: security.currencyName,
      // TOTAL_PRICE: security.totalPrice,
      // ACCOUNT_NUMBER: security.bankAccountNumber,
      // CURRENCY: security.currencyName,
      // LISTING_TYPE: security.listingType,
      // TICKER: security.ticker,
      // TOTAL: security.total,
      // RESERVED: security.reserved,
      SECURITY: security.listingType,
      SYMBOL: security.ticker,
      AMOUNT: security.total,
      PRICE: security.totalPrice,
      //ToDo: dodati vrednosti kad back zavrsi
      PROFIT: 123,
      LAST_MODIFIED: 1234567,
      // PROFIT: security.profit,
      // LAST_MODIFIED: security.lastModified,
      original: security // Include the entire original user object for internal use
    }));
  }
}
@NgModule({
  declarations: [
    // other components
    TransformSecuritiesPipe
  ],
  exports: [
    TransformSecuritiesPipe
  ],
  // other module properties
})
export class TransformSecuritiesPipeModule { }
