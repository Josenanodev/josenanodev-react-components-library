"use strict";
/**
 * @jest-environment jsdom
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const datesArray_1 = __importDefault(require("./datesArray"));
describe("Dates array generator functionality", () => {
    it("Returns an array of dates in between the range", () => {
        expect((0, datesArray_1.default)(new Date(1999, 11, 29), new Date(2000, 0, 2))).toStrictEqual([
            new Date(1999, 11, 29, 12),
            new Date(1999, 11, 30, 12),
            new Date(1999, 11, 31, 12),
            new Date(2000, 0, 1, 12),
            new Date(2000, 0, 2, 12),
        ]);
    });
    it("Returns an empty array if startDate is greater than endDate", () => {
        expect((0, datesArray_1.default)(new Date(2000, 0, 2), new Date(1999, 11, 29))).toStrictEqual([]);
    });
});
//# sourceMappingURL=datesArray.test.js.map