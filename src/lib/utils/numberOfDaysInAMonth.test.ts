/**
 * @jest-environment jsdom
 */

import { numberOfDaysInAMonth } from "./numberOfDaysInAMonth";

describe("Number of days in a month functionality", () => {
  it("Correctly returns the number of days of specified dates", () => {
    expect(numberOfDaysInAMonth(new Date(1993, 2, 29))).toBe(31);
    expect(numberOfDaysInAMonth(new Date(2023, 1, 12))).toBe(28);
    expect(numberOfDaysInAMonth(new Date(2022, 0, 1))).toBe(31);
    expect(numberOfDaysInAMonth(new Date(2024, 1, 29))).toBe(29);
    expect(numberOfDaysInAMonth(new Date(2000, 6, 6))).toBe(31);
    expect(numberOfDaysInAMonth(new Date(1980, 5, 10))).toBe(30);
    expect(numberOfDaysInAMonth(new Date(1988, 10, 15))).toBe(30);
  });
});
