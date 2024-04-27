import { DATETIME_FORMAT, TIMEZONE } from '@art-city/common/constants';
import moment from 'moment-timezone';

export class DatetimeUtil {
  constructor() {}

  public static moment(
    dateTime: moment.MomentInput | undefined = undefined,
    timeZone: string = TIMEZONE.UTC,
  ): moment.Moment {
    return moment(dateTime).tz(timeZone);
  }

  public static generateDateRange(
    startDate: moment.MomentInput,
    endDate: moment.MomentInput,
    dateType: 'day' | 'month' | 'year' = 'day',
  ): string[] {
    const dateArray: string[] = [];
    const currentDate = DatetimeUtil.moment(startDate);
    while (currentDate.isSameOrBefore(DatetimeUtil.moment(endDate))) {
      dateArray.push(currentDate.format(DatetimeUtil.getDateFormat(dateType)));
      currentDate.add(1, dateType);
    }
    return dateArray;
  }

  private static getDateFormat = (
    dateType: 'day' | 'month' | 'year',
  ): string => {
    switch (dateType) {
      case 'day':
        return DATETIME_FORMAT.DATE;
      case 'month':
        return 'YYYY-MM';
      case 'year':
        return 'YYYY';
      default:
        throw new Error(`Invalid date type: ${dateType}`);
    }
  };
}
