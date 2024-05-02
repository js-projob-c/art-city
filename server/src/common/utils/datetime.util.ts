import { DATETIME_FORMAT, TIMEZONE } from '@art-city/common/constants';
import moment from 'moment-timezone';

export class DatetimeUtil {
  constructor() {}

  public static moment(
    dateTime: moment.MomentInput | undefined = undefined,
    timezone: string = TIMEZONE.UTC,
  ): moment.Moment {
    return moment(dateTime).tz(timezone, true);
  }

  public static generateDateRange(
    startDate: moment.MomentInput,
    endDate: moment.MomentInput,
    dateType: 'day' | 'month' | 'year' = 'day',
  ): string[] {
    const dateArray: string[] = [];
    const currentDate = DatetimeUtil.moment(startDate);
    while (currentDate.isSameOrBefore(DatetimeUtil.moment(endDate))) {
      const formatDate = currentDate.format(
        DatetimeUtil.getDateFormat(dateType),
      );
      dateArray.push(formatDate);
      currentDate.add(1, dateType);
    }
    return dateArray;
  }

  public static isWeekend(date: moment.MomentInput): boolean {
    const weekDay = DatetimeUtil.moment(date).isoWeekday();
    return weekDay >= 6;
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
