import { DatetimeUtil } from './datetime.util';

describe('DatetimeUtil', () => {
  describe('moment', () => {
    it('should return a moment object with default timezone', () => {
      const result = DatetimeUtil.moment();
      expect(result).toBeDefined();
    });

    it('should return a moment object with specified timezone', () => {
      const result = DatetimeUtil.moment(undefined, {
        timezone: 'America/New_York',
      });
      expect(result).toBeDefined();
    });
  });

  describe('generateDateRange', () => {
    it('should generate date range array for day', () => {
      const startDate = '2022-01-01';
      const endDate = '2022-01-03';
      const result = DatetimeUtil.generateDateRange(startDate, endDate, 'day');
      expect(result).toEqual(['2022-01-01', '2022-01-02', '2022-01-03']);
    });

    it('should generate date range array for month', () => {
      const startDate = '2022-01-01';
      const endDate = '2022-03-01';
      const result = DatetimeUtil.generateDateRange(
        startDate,
        endDate,
        'month',
      );
      expect(result).toEqual(['2022-01', '2022-02', '2022-03']);
    });

    it('should generate date range array for year', () => {
      const startDate = '2022-01-01';
      const endDate = '2024-01-01';
      const result = DatetimeUtil.generateDateRange(startDate, endDate, 'year');
      expect(result).toEqual(['2022', '2023', '2024']);
    });
  });

  describe('getDateFormat', () => {
    it('should return the correct date format for day', () => {
      const result = DatetimeUtil['getDateFormat']('day');
      expect(result).toEqual('YYYY-MM-DD');
    });

    it('should return the correct date format for month', () => {
      const result = DatetimeUtil['getDateFormat']('month');
      expect(result).toEqual('YYYY-MM');
    });

    it('should return the correct date format for year', () => {
      const result = DatetimeUtil['getDateFormat']('year');
      expect(result).toEqual('YYYY');
    });
  });

  describe('isWeekend', () => {
    it('should return true if the given date is a weekend', () => {
      const satDate = '2024-05-04'; // Saturday
      const sunDate = '2024-05-05'; // Sunday
      expect(DatetimeUtil.isWeekend(satDate)).toBe(true);
      expect(DatetimeUtil.isWeekend(sunDate)).toBe(true);
      expect(DatetimeUtil.isWeekend('2022-09-03')).toBe(true);
      expect(DatetimeUtil.isWeekend('2022-09-04')).toBe(true);
    });

    it('should return false if the given date is not a weekend', () => {
      const date = '2024-05-06'; // Monday
      const result = DatetimeUtil.isWeekend(date);
      expect(result).toBe(false);
      expect(DatetimeUtil.isWeekend('2022-09-01')).toBe(false);
      expect(DatetimeUtil.isWeekend('2022-09-02')).toBe(false);
      expect(DatetimeUtil.isWeekend('2022-09-05')).toBe(false);
      expect(DatetimeUtil.isWeekend('2022-09-06')).toBe(false);
    });
  });
});
