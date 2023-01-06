"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./Cell.css");
const Cell = ({ date, listElementId, width, heigth, ReactCellChildren }) => {
    return (react_1.default.createElement("div", { className: "cell", style: { width: width, height: heigth } },
        react_1.default.createElement(ReactCellChildren, { date: date, listElementId: listElementId })));
};
exports.default = react_1.default.memo(Cell);
