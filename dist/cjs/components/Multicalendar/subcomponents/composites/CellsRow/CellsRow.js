"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./CellsRow.css");
//Componentes
const Cell_1 = __importDefault(require("../../individuals/Cell/Cell"));
//Utils
const jsToSqlDate_1 = __importDefault(require("../../../../../utils/jsToSqlDate"));
const CellsRow = ({ listElementId, visibleDatesArray, width, height, cellsWidth, cellsHeight, ReactCellChildren, }) => {
    //Render
    return (react_1.default.createElement("div", { className: "cells-row", style: {
            width: width,
            height: height,
        } }, visibleDatesArray.length > 0 &&
        visibleDatesArray.map((date) => (react_1.default.createElement(Cell_1.default, { key: listElementId + date.toString(), date: (0, jsToSqlDate_1.default)(date), listElementId: listElementId, width: cellsWidth, heigth: cellsHeight, ReactCellChildren: ReactCellChildren })))));
};
exports.default = CellsRow;
