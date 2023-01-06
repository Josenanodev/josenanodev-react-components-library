"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./DatesGrid.css");
//Componentes
const CellsRow_1 = __importDefault(require("../CellsRow/CellsRow"));
const DatesGrid = ({ gridWidth, gridHeight, xOffset, yOffset, cellsWidth, cellsHeight, visibleListElementsIdsArray, visibleDates, ReactCellChildren, }) => {
    return (react_1.default.createElement("div", { className: "dates-grid", style: {
            width: gridWidth,
        } },
        react_1.default.createElement("div", { className: "div-cells-row-height", style: {
                height: gridHeight,
                paddingTop: yOffset * cellsHeight,
                paddingLeft: xOffset * cellsWidth,
            } }, visibleListElementsIdsArray.map((listElementId) => (react_1.default.createElement(CellsRow_1.default, { key: listElementId, listElementId: listElementId, visibleDatesArray: visibleDates, width: visibleDates.length * cellsWidth, height: cellsHeight, cellsWidth: cellsWidth, cellsHeight: cellsHeight, ReactCellChildren: ReactCellChildren }))))));
};
exports.default = DatesGrid;
//# sourceMappingURL=DatesGrid.js.map