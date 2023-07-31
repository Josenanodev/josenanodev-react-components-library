import dayOfTheWeekStartingOnMonday from "./dayOfTheWeekStartingOnMonday";

describe("dayOfTheWeekStartingOnMonday", () => {
  it("should return 0 for Monday", () => {
    const date = new Date(2023, 6, 3);
    expect(dayOfTheWeekStartingOnMonday(date)).toBe(0);
  });
  it("should return 1 for Tuesday", () => {
    const date = new Date(2023, 6, 4);
    expect(dayOfTheWeekStartingOnMonday(date)).toBe(1);
  });
  it("should return 2 for Wednesday", () => {
    const date = new Date(2023, 6, 5);
    expect(dayOfTheWeekStartingOnMonday(date)).toBe(2);
  });
  it("should return 3 for Thursday", () => {
    const date = new Date(2023, 6, 6);
    expect(dayOfTheWeekStartingOnMonday(date)).toBe(3);
  });
  it("should return 4 for Friday", () => {
    const date = new Date(2023, 6, 7);
    expect(dayOfTheWeekStartingOnMonday(date)).toBe(4);
  });
  it("should return 5 for Saturday", () => {
    const date = new Date(2023, 6, 8);
    expect(dayOfTheWeekStartingOnMonday(date)).toBe(5);
  });
  it("should return 6 for Sunday", () => {
    const date = new Date(2023, 6, 9);
    expect(dayOfTheWeekStartingOnMonday(date)).toBe(6);
  });
});
