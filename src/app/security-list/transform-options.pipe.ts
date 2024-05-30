import { Pipe, PipeTransform } from '@angular/core';
import {OptionsDto} from "../model/model";

@Pipe({
  name: 'transformOptions',
  standalone: true,
})
export class TransformOptionsPipe implements PipeTransform {
  transform(options: OptionsDto[]): any {
    return options.map((opt: OptionsDto) => {
      const date = new Date(opt.expirationDate);
      const formattedDate = new Intl.DateTimeFormat("en", {month: "long", year: "2-digit", day: "numeric"}).format(date);

      return {
        stockListing: opt.ticker,
        optionType: opt.optionType,
        strikePrice: opt.strikePrice,
        impliedVolatility: opt.impliedVolatility,
        openInterest: opt.openInterest,
        settlementDate: formattedDate,
        original: opt,
      };
    });
  }

}
