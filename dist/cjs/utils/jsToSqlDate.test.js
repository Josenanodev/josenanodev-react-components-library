"use strict";
/**
 * @jest-environment jsdom
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsToSqlDate_1 = __importDefault(require("./jsToSqlDate"));
describe("JS to SQL date object formater", () => {
    it("Parses to 1993-03-29 correctly", () => {
        const dateObject = new Date(1993, 2, 29);
        expect((0, jsToSqlDate_1.default)(dateObject)).toBe("1993-03-29");
    });
});
//# sourceMappingURL=jsToSqlDate.test.js.map