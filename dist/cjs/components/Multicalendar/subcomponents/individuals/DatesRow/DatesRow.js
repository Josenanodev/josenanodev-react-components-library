"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./DatesRow.css");
const DatesRow = ({ visibleDates, width, height, cellsWidth, cellsHeight, offset, language, }) => {
    //Variables
    const weekdaysAbreviations = [
        language["sunday"].slice(0, 2),
        language["monday"].slice(0, 2),
        language["tuesday"].slice(0, 2),
        language["wednesday"].slice(0, 2),
        language["thursday"].slice(0, 2),
        language["friday"].slice(0, 2),
        language["saturday"].slice(0, 2),
    ];
    const monthsNames = [
        language["january"],
        language["february"],
        language["march"],
        language["april"],
        language["may"],
        language["june"],
        language["july"],
        language["august"],
        language["september"],
        language["october"],
        language["november"],
        language["december"],
    ];
    return (react_1.default.createElement("div", { className: "dates-row", style: {
            width: width,
            height: height,
            paddingLeft: offset * cellsWidth,
        } }, visibleDates.length > 0 &&
        visibleDates.map((dateObject) => (react_1.default.createElement("div", { className: "date-cell", style: {
                width: cellsWidth,
                height: cellsHeight,
            } },
            react_1.default.createElement("div", { className: dateObject.getDate() === new Date().getDate() &&
                    dateObject.getMonth() === new Date().getMonth() &&
                    dateObject.getFullYear() === new Date().getFullYear()
                    ? "div-date-cell-today"
                    : "div-date-cell" },
                react_1.default.createElement("div", null,
                    react_1.default.createElement("p", null, weekdaysAbreviations[dateObject.getDay()]),
                    react_1.default.createElement("p", null, dateObject.getDate()))),
            dateObject.getDate() === 1 && (react_1.default.createElement("div", { className: "month-start" },
                react_1.default.createElement("p", null,
                    monthsNames[dateObject.getMonth()],
                    " ",
                    dateObject.getFullYear()))))))));
};
exports.default = DatesRow;
//# sourceMappingURL=DatesRow.js.map