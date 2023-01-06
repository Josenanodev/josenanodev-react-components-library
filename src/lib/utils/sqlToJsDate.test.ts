/**
 * @jest-environment jsdom
 */

import sqlToJsDate from "./sqlToJsDate";

describe("SQL to JS date object formater", () => {
  it("Milliseconds from 1993-03-29 are exact", () => {
    const expectedMilliseconds = Date.parse(new Date(1993, 2, 29).toString());
    expect(Date.parse(sqlToJsDate("1993-03-29").toString())).toEqual(
      expectedMilliseconds
    );
  });
});
