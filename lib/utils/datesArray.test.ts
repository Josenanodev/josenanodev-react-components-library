/**
 * @jest-environment jsdom
 */

import datesArray from "./datesArray";

describe("Dates array generator functionality", () => {
  it("Returns an array of dates in between the range", () => {
    expect(datesArray(new Date(1999, 11, 29), new Date(2000, 0, 2))).toStrictEqual([
      new Date(1999, 11, 29, 12),
      new Date(1999, 11, 30, 12),
      new Date(1999, 11, 31, 12),
      new Date(2000, 0, 1, 12),
      new Date(2000, 0, 2, 12),
    ]);
  });
  it("Returns an empty array if startDate is greater than endDate", () => {
    expect(datesArray(new Date(2000, 0, 2), new Date(1999, 11, 29))).toStrictEqual([]);
  });
});
