import colorBasedOnSeason from "./colorBasedOnSeason";

/**
 * @jest-environment jsdom
 */
describe("Color based on season functionality", () => {
  it("Returns an color from general palette", () => {
    expect(colorBasedOnSeason("high")).toBe("var(--green-palette-five)");
  });
});
