import React from "react";
import "./DatesGrid.css";
//Componentes
import CellsRow from "../CellsRow/CellsRow";
const DatesGrid = ({ gridWidth, gridHeight, xOffset, yOffset, cellsWidth, cellsHeight, visibleListElementsIdsArray, visibleDates, ReactCellChildren, }) => {
    return (React.createElement("div", { className: "dates-grid", style: {
            width: gridWidth,
        } },
        React.createElement("div", { className: "div-cells-row-height", style: {
                height: gridHeight,
                paddingTop: yOffset * cellsHeight,
                paddingLeft: xOffset * cellsWidth,
            } }, visibleListElementsIdsArray.map((listElementId) => (React.createElement(CellsRow, { key: listElementId, listElementId: listElementId, visibleDatesArray: visibleDates, width: visibleDates.length * cellsWidth, height: cellsHeight, cellsWidth: cellsWidth, cellsHeight: cellsHeight, ReactCellChildren: ReactCellChildren }))))));
};
export default DatesGrid;
//# sourceMappingURL=DatesGrid.js.map