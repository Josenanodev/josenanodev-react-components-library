/**
 * @jest-environment jsdom
 */
import monthYearString from "./monthYearString";
import es_Es from "../languages/es-ES";
describe("Month and year string funtionality", () => {
    it("Correctly parses a date object to a translated string", () => {
        expect(monthYearString(new Date(1993, 2, 29), es_Es)).toBe("marzo 1993");
    });
});
//# sourceMappingURL=monthYearString.test.js.map