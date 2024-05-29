import { Pipe, PipeTransform } from '@angular/core';
import { Future } from './model/model';

@Pipe({
  name: 'transformFuture',
  standalone: true,
})
export class TransformFuturePipe implements PipeTransform {
  transform(futures: Future[]): any {
    return futures.map((fut: Future) => {
      return {
        ticker: fut.ticker,
        name: fut.name,
        exchangeName: fut.exchangeName,
        lastRefresh: new Date(fut.lastRefresh).toLocaleString(),
        price: fut.price,
        high: fut.high,
        low: fut.low,
        priceChange: fut.priceChange,
        volume: fut.volume,
        // contractSize: fut.contractSize,
        // contractUnit: fut.contractUnit,
        // openInterest: fut.openInterest,
        settlementDate: fut.settlementDate,
        originalFuture: fut,
      };
    });
  }
}
