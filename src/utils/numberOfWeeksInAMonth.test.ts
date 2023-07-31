import numberOfWeeksInAMonth from "./numberOfWeeksInAMonth";

describe("numberOfWeeksInAMonth", () => {
  it("should return 5 for May 2021", () => {
    const date = new Date(2021, 4, 1);
    expect(numberOfWeeksInAMonth(date)).toBe(6);
  });
  it("should return 6 for June 2021", () => {
    const date = new Date(2021, 5, 1);
    expect(numberOfWeeksInAMonth(date)).toBe(5);
  });
  it("should return 7 for october 2023", () => {
    const date = new Date(2023, 9, 1);
    expect(numberOfWeeksInAMonth(date)).toBe(6);
  });
});
