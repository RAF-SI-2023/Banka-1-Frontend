import { Pipe, PipeTransform } from '@angular/core';
import {BankAccount, Margin} from "./model/model";

@Pipe({
  name: 'transformMarginAccounts',
  standalone: true
})
export class TransformMarginAccountsPipe implements PipeTransform {

  transform(marginAccounts: Margin[]): any[] {
    return marginAccounts.map((marginAccount) => {
      return {
        marginAccount: marginAccount.bankAccountNumber,
        currency: marginAccount.currency.currencySymbol,
        security: marginAccount.listingType,
        investedFunds: marginAccount.balance,
        borrowedFunds: marginAccount.loanValue,
        maintenanceMargin: marginAccount.maintenanceMargin,
        marginCall: marginAccount.marginCall ? 'True' : 'False'
      };
    });
  }

}
