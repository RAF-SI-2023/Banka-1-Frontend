import { Pipe, PipeTransform } from '@angular/core';
import {Margin, MarginTransactionDetails} from "./model/model";
import { UserService } from './service/employee.service';
import { catchError, map, Observable, of } from 'rxjs';

@Pipe({
  name: 'transformMarginDetails',
  standalone: true
})
export class TransformMarginDetailsPipe implements PipeTransform {

  constructor(private userService: UserService) {}


  transform(margintransactions: MarginTransactionDetails[]): any[] {
    return margintransactions.map((marginTransaction) => {
    return {
    Order: marginTransaction.description,
    Customer: marginTransaction.customerAccount.customer.customer.lastName,
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
    
    
  
