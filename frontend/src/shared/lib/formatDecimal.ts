/**
 * Formats a number with exactly two decimal places.
 *
 * @param amount - Number to format.
 * @returns String representation with 2 decimal places.
 */
export function formatDecimal(amount: number): string {
  return amount.toFixed(2);
}
