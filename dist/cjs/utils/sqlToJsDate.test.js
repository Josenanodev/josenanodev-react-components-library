"use strict";
/**
 * @jest-environment jsdom
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlToJsDate_1 = __importDefault(require("./sqlToJsDate"));
describe("SQL to JS date object formater", () => {
    it("Milliseconds from 1993-03-29 are exact", () => {
        const expectedMilliseconds = Date.parse(new Date(1993, 2, 29).toString());
        expect(Date.parse((0, sqlToJsDate_1.default)("1993-03-29").toString())).toEqual(expectedMilliseconds);
    });
});
//# sourceMappingURL=sqlToJsDate.test.js.map