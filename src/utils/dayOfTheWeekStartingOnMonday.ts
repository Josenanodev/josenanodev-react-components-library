/**
 * Number of the day of the week starting on Monday
 * @param date date
 * @returns the number of the day of the week starting on Monday
 */
function dayOfTheWeekStartingOnMonday(date: Date): number {
  return date.getDay() === 0 ? 6 : date.getDay() - 1;
}

export default dayOfTheWeekStartingOnMonday;
