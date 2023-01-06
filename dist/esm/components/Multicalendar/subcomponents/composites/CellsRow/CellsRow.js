import React from "react";
import "./CellsRow.css";
//Componentes
import Cell from "../../individuals/Cell/Cell";
//Utils
import jsToSqlDate from "../../../../../utils/jsToSqlDate";
const CellsRow = ({ listElementId, visibleDatesArray, width, height, cellsWidth, cellsHeight, ReactCellChildren, }) => {
    //Render
    return (React.createElement("div", { className: "cells-row", style: {
            width: width,
            height: height,
        } }, visibleDatesArray.length > 0 &&
        visibleDatesArray.map((date) => (React.createElement(Cell, { key: listElementId + date.toString(), date: jsToSqlDate(date), listElementId: listElementId, width: cellsWidth, heigth: cellsHeight, ReactCellChildren: ReactCellChildren })))));
};
export default CellsRow;
//# sourceMappingURL=CellsRow.js.map