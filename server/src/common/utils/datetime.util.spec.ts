import { DatetimeUtil } from './datetime.util';

describe('DatetimeUtil', () => {
  describe('moment', () => {
    it('should return a moment object with default timezone', () => {
      const result = DatetimeUtil.moment();
      expect(result).toBeDefined();
    });

    it('should return a moment object with specified timezone', () => {
      const result = DatetimeUtil.moment(undefined, 'America/New_York');
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
});
