/**
 * Formats a value to a credit card format
 * @param value - The value to be formatted
 * @returns  The formatted value i.e. "1234 5678 9012 3456"
 */
export const formatValueToCreditCard = (value: string) => {
  const digitsOnly = value.replace(/\D/g, "");
  const slicedDigits = digitsOnly.slice(0, 16);
  let digitsGroups = slicedDigits.match(/.{1,4}/g);
  if (slicedDigits.length === 15) {
    digitsGroups = [
      slicedDigits.slice(0, 5),
      slicedDigits.slice(5, 11),
      slicedDigits.slice(11, 16),
    ];
  }
  const finalValue = digitsGroups?.join(" ") ?? "";
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
  const slicedDigits = digitsOnly.slice(0, 4);
  return slicedDigits;
};

/**
 * Formats a value to a phone number format, including the country code, max length of 15
 * @param value - The value to be formatted
 * @returns  The formatted value i.e. "+1 234-567-8901"
 */
export const formatValueToPhone = (value: string) => {
  const plusSign = value.startsWith('+') ? '+' : '';
  const digitsOnly = value.replace(/\D/g, "");
  const slicedDigits = digitsOnly.slice(0, 15);
  return plusSign + slicedDigits;
};
