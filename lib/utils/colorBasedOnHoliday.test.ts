import colorBasedOnEvent from "./colorBasedOnEvent";
import colorBasedOnHoliday from "./colorBasedOnHoliday";

/**
 * @jest-environment jsdom
 */
describe("Color based on season functionality", () => {
  it("Returns an color from general palette", () => {
    expect(colorBasedOnHoliday("3")).toBe("var(--green-palette-one)");
  });
});
