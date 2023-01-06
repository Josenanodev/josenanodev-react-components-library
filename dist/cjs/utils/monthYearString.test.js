"use strict";
/**
 * @jest-environment jsdom
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const monthYearString_1 = __importDefault(require("./monthYearString"));
const es_ES_1 = __importDefault(require("../languages/es-ES"));
describe("Month and year string funtionality", () => {
    it("Correctly parses a date object to a translated string", () => {
        expect((0, monthYearString_1.default)(new Date(1993, 2, 29), es_ES_1.default)).toBe("marzo 1993");
    });
});
//# sourceMappingURL=monthYearString.test.js.map