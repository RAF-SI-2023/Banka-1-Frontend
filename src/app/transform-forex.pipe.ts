import { Pipe, PipeTransform } from '@angular/core';
import { Forex } from './model/model';

@Pipe({
  name: 'transformForex',
  standalone: true,
})
export class TransformForexPipe implements PipeTransform {
  transform(forexs: Forex[]): any[] {
    return forexs.map((forex) => {
      return {
        ticker: forex.ticker,
        name: forex.name,
        exchangeName: forex.exchangeName,
        lastRefresh: new Date(forex.lastRefresh).toLocaleString(),
        price: forex.price,
        high: forex.high,
        low: forex.low,
        priceChange: forex.priceChange,
        volume: forex.volume,
        baseCurrency: forex.baseCurrency,
        quoteCurrency: forex.quoteCurrency,
        originalForex: forex,
      };
    });
  }
}
