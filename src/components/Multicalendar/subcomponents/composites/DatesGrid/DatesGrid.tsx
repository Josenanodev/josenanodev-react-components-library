import React from "react"
import "./DatesGrid.css";

//Componentes
import CellsRow from "../CellsRow/CellsRow";

//Types
import { DatesGridPropTypes } from "./types";

const DatesGrid = ({
  gridWidth,
  gridHeight,
  xOffset,
  yOffset,
  cellsWidth,
  cellsHeight,
  visibleListElementsIdsArray,
  visibleDates,
  ReactCellChildren,
}: DatesGridPropTypes) => {
  return (
    <div
      className="dates-grid"
      style={{
        width: gridWidth,
      }}
    >
      <div
        className="div-cells-row-height"
        style={{
          height: gridHeight,
          paddingTop: yOffset * cellsHeight,
          paddingLeft: xOffset * cellsWidth,
        }}
      >
        {visibleListElementsIdsArray.map((listElementId) => (
          <CellsRow
            key={listElementId}
            listElementId={listElementId}
            visibleDatesArray={visibleDates}
            width={visibleDates.length * cellsWidth}
            height={cellsHeight}
            cellsWidth={cellsWidth}
            cellsHeight={cellsHeight}
            ReactCellChildren={ReactCellChildren}
          />
        ))}
      </div>
    </div>
  );
};

export default DatesGrid;
