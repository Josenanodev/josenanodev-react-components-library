import dayOfTheWeekStartingOnMonday from "./dayOfTheWeekStartingOnMonday";
import { numberOfDaysInAMonth } from "./numberOfDaysInAMonth";


/**
 * Number of weeks in a month
 * @param date date
 * @returns the number of weeks in a month
 */
function numberOfWeeksInAMonth(date: Date): number {
  const daysInMonth = numberOfDaysInAMonth(date);
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDayInMonth = new Date(year, month, 1);
  const firstDayInMonthDayOfWeek = dayOfTheWeekStartingOnMonday(firstDayInMonth);
  const daysInFirstWeek = 7 - firstDayInMonthDayOfWeek;
  const daysInMonthWithoutFirstWeek = daysInMonth - daysInFirstWeek;
  const numberOfWeeksInMonthWithoutFirstWeek = Math.ceil(daysInMonthWithoutFirstWeek / 7);
  const numberOfWeeksInMonth = numberOfWeeksInMonthWithoutFirstWeek + 1;
  return numberOfWeeksInMonth;
}

export default numberOfWeeksInAMonth;
