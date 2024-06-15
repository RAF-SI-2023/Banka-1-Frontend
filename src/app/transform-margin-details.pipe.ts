import { Pipe, PipeTransform } from '@angular/core';
import {Margin, MarginTransactionDetails} from "./model/model";

@Pipe({
  name: 'transformMarginDetails',
  standalone: true
})
export class TransformMarginDetailsPipe implements PipeTransform {

  transform(margintransactions: MarginTransactionDetails[]): any[] {
    return margintransactions.map((marginTransaction) => {
      return {
        Order: marginTransaction.description,
        Customer: marginTransaction.customerAccount,
        Type: marginTransaction.transactionType,
        Investment: marginTransaction.capitalAmount,
        Date: marginTransaction.dateTime,
        Interest: marginTransaction.interest,
        BorrowedMoney: marginTransaction.loanValue,
        MaintenanceMargin: marginTransaction.maintenanceMargin
      };
    });
  }

}
