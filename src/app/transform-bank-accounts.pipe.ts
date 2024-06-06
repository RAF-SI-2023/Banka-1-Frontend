import { Pipe, PipeTransform } from '@angular/core';
import {BankAccount} from "./model/model";

@Pipe({
  name: 'transformBankAccounts',
  standalone: true
})
export class TransformBankAccountsPipe implements PipeTransform {

  transform(bankAccounts: BankAccount[]): any[] {
    return bankAccounts.map((bankAccount) => {
      return {
        accountNumber: bankAccount.accountNumber,
        currency: bankAccount.currency,
        accountBalance: bankAccount.balance,
        reserved: bankAccount.reservedResources,
        available: bankAccount.availableBalance,
      };
    });
  }

}
