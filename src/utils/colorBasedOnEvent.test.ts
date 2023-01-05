import colorBasedOnEvent from "./colorBasedOnEvent";

/**
 * @jest-environment jsdom
 */
describe("Color based on season functionality", () => {
  it("Returns an color from general palette", () => {
    expect(colorBasedOnEvent("2")).toBe("var(--green-palette-three)");
  });
});
