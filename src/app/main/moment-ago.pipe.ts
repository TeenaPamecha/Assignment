import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'momentAgo'
})
export class MomentAgoPipe implements PipeTransform {

  transform(value: any): any {
    const date = moment(value);
    return date.calendar(null, {
      sameDay: 'LT, MMM D Y',
      lastDay: 'LT, MMM D Y',
      lastWeek: 'LT, MMM D Y',
      sameElse: 'l'
    });
  }

}
