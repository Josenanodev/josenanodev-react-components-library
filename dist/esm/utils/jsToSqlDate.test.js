/**
 * @jest-environment jsdom
 */
import jsToSqlDate from "./jsToSqlDate";
describe("JS to SQL date object formater", () => {
    it("Parses to 1993-03-29 correctly", () => {
        const dateObject = new Date(1993, 2, 29);
        expect(jsToSqlDate(dateObject)).toBe("1993-03-29");
    });
});
//# sourceMappingURL=jsToSqlDate.test.js.map