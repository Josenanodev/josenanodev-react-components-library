"use strict";
/**
 * @jest-environment jsdom
 */
Object.defineProperty(exports, "__esModule", { value: true });
const numberOfDaysInAMonth_1 = require("./numberOfDaysInAMonth");
describe("Number of days in a month functionality", () => {
    it("Correctly returns the number of days of specified dates", () => {
        expect((0, numberOfDaysInAMonth_1.numberOfDaysInAMonth)(new Date(1993, 2, 29))).toBe(31);
        expect((0, numberOfDaysInAMonth_1.numberOfDaysInAMonth)(new Date(2023, 1, 12))).toBe(28);
        expect((0, numberOfDaysInAMonth_1.numberOfDaysInAMonth)(new Date(2022, 0, 1))).toBe(31);
        expect((0, numberOfDaysInAMonth_1.numberOfDaysInAMonth)(new Date(2024, 1, 29))).toBe(29);
        expect((0, numberOfDaysInAMonth_1.numberOfDaysInAMonth)(new Date(2000, 6, 6))).toBe(31);
        expect((0, numberOfDaysInAMonth_1.numberOfDaysInAMonth)(new Date(1980, 5, 10))).toBe(30);
        expect((0, numberOfDaysInAMonth_1.numberOfDaysInAMonth)(new Date(1988, 10, 15))).toBe(30);
    });
});
//# sourceMappingURL=numberOfDaysInAMonth.test.js.map