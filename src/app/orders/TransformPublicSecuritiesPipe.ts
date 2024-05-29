import {NgModule, Pipe, PipeTransform} from '@angular/core';
import {CapitalProfitDto, PublicCapitalDto, User} from '../model/model'; // Adjust the import path according to your project structure

@Pipe({
  name: 'transformPublicSecurities'
})
export class TransformPublicSecuritiesPipe implements PipeTransform {
  transform(securities: PublicCapitalDto[]): any[] {
    return securities.map(security => ({
      SECURITY: security.listingType,
      // SYMBOL: security.ticker,
      // AMOUNT: security.amount,
      // PRICE: security.price,
      // PROFIT: security.profit,
      // LAST_MODIFIED: security.lastModified,
      // OWNER: security.owner,
      SYMBOL: "AAPL",
      AMOUNT: 10000,
      PRICE: 3012,
      PROFIT: 3012,
      LAST_MODIFIED: 0,
      OWNER: "Nastasja",
      original: security // Include the entire original user object for internal use
    }));
  }
}
@NgModule({
  declarations: [
    // other components
    TransformPublicSecuritiesPipe
  ],
  exports: [
    TransformPublicSecuritiesPipe
  ],
  // other module properties
})
export class TransformPublicSecuritiesPipeModule { }
