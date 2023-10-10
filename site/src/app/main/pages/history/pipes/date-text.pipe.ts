import { Pipe, PipeTransform } from '@angular/core';
import {
  differenceInCalendarDays,
  differenceInHours,
  differenceInMinutes,
  isSameDay,
} from 'date-fns';

@Pipe({ name: 'dateText', standalone: true })
export class DateTextPipe implements PipeTransform {
  transform(
    date: number | Date | null | undefined,
    isCountdown: boolean = false
  ): string {
    if (date == null) return '';

    const left = isCountdown ? new Date(date) : new Date();
    const right = isCountdown ? new Date() : new Date(date);

    let resource: string | undefined;
    let num: number | undefined;
    let minutes = differenceInMinutes(left, right);

    if (minutes === 0) minutes = 1;

    if (minutes < 60) {
      return [
        minutes,
        'Minute' + (minutes === 1 ? '' : 's'),
        isCountdown ? '' : 'Ago',
      ]
        .join(' ')
        .trim();
    }
    //
    //  If today, show hours ago
    //
    if (isSameDay(left, right)) {
      num = differenceInHours(left, right);

      return [num, 'Hour' + (num === 1 ? '' : 's'), isCountdown ? '' : 'Ago']
        .join(' ')
        .trim();
    }
    num = differenceInCalendarDays(left, right);

    if (num === 1) {
      return isCountdown ? 'Tomorrow' : 'Yesterday';
    }
    return [num, 'Days' + (minutes === 1 ? '' : 's'), isCountdown ? '' : 'Ago']
      .join(' ')
      .trim();
  }
}
