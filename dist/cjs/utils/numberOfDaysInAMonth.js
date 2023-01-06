"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberOfDaysInAMonth = void 0;
/**
 *
 * @param dateObject Date Object
 * @returns number of days of the month of the date object
 */
function numberOfDaysInAMonth(dateObject) {
    return new Date(dateObject.getFullYear(), dateObject.getMonth() + 1, 0).getDate();
}
exports.numberOfDaysInAMonth = numberOfDaysInAMonth;
//# sourceMappingURL=numberOfDaysInAMonth.js.map