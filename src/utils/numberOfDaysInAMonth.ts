/**
 * 
 * @param dateObject Date Object
 * @returns number of days of the month of the date object
 */
export function numberOfDaysInAMonth(dateObject: Date) {
  return new Date(dateObject.getFullYear(), dateObject.getMonth() + 1, 0).getDate();
}