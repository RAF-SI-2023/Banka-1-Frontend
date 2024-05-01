import {NgModule} from "@angular/core";

import { Pipe, PipeTransform } from '@angular/core';
import { OrderDto, OrderStatus } from '../model/model';

@Pipe({
  name: 'filterByStatus'
})
export class FilterByStatusPipe implements PipeTransform {

  transform(orders: OrderDto[], status: OrderStatus): OrderDto[] {
    return orders.filter(order => order.status === status);
  }

}

@NgModule({
  declarations: [
    // other components
    FilterByStatusPipe
  ],
  exports: [
    FilterByStatusPipe
  ],
  // other module properties
})
export class FilterByStatusPipeModule { }
