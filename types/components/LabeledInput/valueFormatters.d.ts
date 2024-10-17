/**
 * Formats a value to a credit card format
 * @param value - The value to be formatted
 * @returns  The formatted value i.e. "1234 5678 9012 3456"
 */
export declare const formatValueToCreditCard: (value: string) => string;
/**
 * Formats a value to an expiration date format
 * @param value - The value to be formatted
 * @returns  The formatted value i.e. "12 / 34"
 */
export declare const formatValueToExpirationDate: (value: string) => string;
/**
 * Formats a value to a CVV format
 * @param value - The value to be formatted
 * @returns  The formatted value i.e. "123"
 */
export declare const formatValueToCVV: (value: string) => string;
/**
 * Formats a value to a phone number format, including the country code, max length of 15
 * @param value - The value to be formatted
 * @returns  The formatted value i.e. "+1 234-567-8901"
 */
export declare const formatValueToPhone: (value: string) => string;
