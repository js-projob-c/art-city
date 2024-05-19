/**
 * Utility class for handling prices and currency conversions.
 */
export class PriceUtil {
  /**
   * Rounds a given amount to a maximum of two decimal places.
   * @param amount - The amount to be rounded.
   * @returns The rounded amount with a maximum of two decimal places.
   */
  static roundPriceDecimal(amount: number): number {
    return Math.round((amount + Number.EPSILON) * 100) / 100;
  }
}
