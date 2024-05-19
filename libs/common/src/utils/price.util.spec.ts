import { PriceUtil } from './price.util';

describe('PriceUtil', () => {
  describe('roundPriceDecimal', () => {
    it('should round a given amount to a maximum of two decimal places', () => {
      expect(PriceUtil.roundPriceDecimal(10.123)).toBe(10.12);
      expect(PriceUtil.roundPriceDecimal(10.126)).toBe(10.13);
      expect(PriceUtil.roundPriceDecimal(10.1)).toBe(10.1);
    });
  });
});
