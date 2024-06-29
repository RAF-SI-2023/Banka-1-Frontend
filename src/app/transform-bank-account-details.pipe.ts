import { Pipe, PipeTransform } from '@angular/core';
import {BankAccount, NewTransactionDto} from "./model/model";

@Pipe({
  name: 'transformBankAccountDetails',
  standalone: true
})
export class TransformBankAccountDetailsPipe implements PipeTransform {

  transform(transactionDtos: NewTransactionDto[]): any[] {
    return transactionDtos.map((transactionDto) => {
      return {
        outflowAccount: transactionDto.bankAccount.accountNumber,
        inflowAccount: 'NA',
        amount: transactionDto.buy + transactionDto.sell,
        dateAndTime: new Date(transactionDto.dateTime).toLocaleString(),
        status: transactionDto.bankAccount.accountStatus,
      };
    });
  }

}
