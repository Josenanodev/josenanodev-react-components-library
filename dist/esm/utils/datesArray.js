import { millisecondsOfOneDay } from "../common/constants";
/**
 *
 * @param startDate Date Object
 * @param endDate Date Object
 * @returns array of date objects in bewtween startDate and endDate, including both
 */
function datesArray(startDate, endDate) {
    let startDateForMilliseconds = new Date(startDate);
    startDateForMilliseconds.setHours(12, 0, 0);
    startDateForMilliseconds = Date.parse(startDateForMilliseconds.toString());
    let endDateForMilliseconds = new Date(endDate);
    endDateForMilliseconds.setHours(12, 0, 0);
    endDateForMilliseconds = Date.parse(endDateForMilliseconds.toString());
    let array = [];
    for (let index = 0; startDateForMilliseconds + millisecondsOfOneDay * index <= endDateForMilliseconds; index++) {
        array.push(new Date(startDateForMilliseconds + millisecondsOfOneDay * index));
    }
    return array;
}
export default datesArray;
