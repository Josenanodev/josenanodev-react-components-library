
/**
 * Formats a value to a credit card format
 * @param value - The value to be formatted
 * @returns  The formatted value i.e. "1234 5678 9012 3456"
 */
export const formatValueToCreditCard = (value: string) => {
  const digitsOnly = value.replace(/\D/g, "");
  const slicedDigits = digitsOnly.slice(0, 16);
  const fourDigitsGroups = slicedDigits.match(/.{1,4}/g);
  const finalValue = fourDigitsGroups?.join(" ") ?? "";
  return finalValue;
};
/**
 * Formats a value to an expiration date format
 * @param value - The value to be formatted
 * @returns  The formatted value i.e. "12 / 34"
 */
export const formatValueToExpirationDate = (value: string) => {
  const digitsOnly = value.replace(/\D/g, "");
  const slicedDigits = digitsOnly.slice(0, 4);
  const twoDigitsGroups = slicedDigits.match(/.{1,2}/g);
  const finalValue = twoDigitsGroups?.join(" / ") ?? "";
  return finalValue;
};
/**
 * Formats a value to a CVV format
 * @param value - The value to be formatted
 * @returns  The formatted value i.e. "123"
 */
export const formatValueToCVV = (value: string) => {
  const digitsOnly = value.replace(/\D/g, "");
  const slicedDigits = digitsOnly.slice(0, 3);
  return slicedDigits;
};
