import { Pipe, PipeTransform } from '@angular/core';
import {OrderDto} from "./model/model";
import {date} from "zod";

@Pipe({
  name: 'transformOrderHistory',
  standalone: true
})
export class TransformOrderHistoryPipe implements PipeTransform {

  transform(orderHistories: any[]): any[] {
    return orderHistories.map(orderHistory => {
      console.log('orderHistory:', orderHistory); // Check the structure and content of orderHistory

      // Ensure lastRefresh is valid before creating a Date object
      const lastRefreshDate = orderHistory.updatedAt * 1000;

      console.log('lastRefreshDate:', lastRefreshDate); // Log the formatted date to debug

      return {
        Security: orderHistory.listingType,
        Transaction: orderHistory.orderType,
        Amount: orderHistory.contractSize,
        Price: orderHistory.price,
        Status: orderHistory.status,
        LastModified: new Date(lastRefreshDate).toLocaleString()
      };
    });
  }

}
