import colorBasedOnOccupation from "./colorBasedOnOccupation";

/**
 * @jest-environment jsdom
 */
describe("Color based on season functionality", () => {
  it("Returns an color from general palette", () => {
    expect(colorBasedOnOccupation("medium")).toBe("var(--green-palette-three)");
  });
});
