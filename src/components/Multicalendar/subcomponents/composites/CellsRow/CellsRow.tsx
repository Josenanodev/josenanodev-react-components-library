import React from "react"
import "./CellsRow.css";

//Componentes
import Cell from "../../individuals/Cell/Cell";

//Utils
import jsToSqlDate from "../../../../../utils/jsToSqlDate";

//Types
import { CellsRowsPropsType } from "./types";

const CellsRow = ({
  listElementId,
  visibleDatesArray,
  width,
  height,
  cellsWidth,
  cellsHeight,
  ReactCellChildren,
}: CellsRowsPropsType) => {
  //Render
  return (
    <div
      className="cells-row"
      style={{
        width: width,
        height: height,
      }}
    >
      {visibleDatesArray.length > 0 &&
        visibleDatesArray.map((date) => (
          <Cell
            key={listElementId + date.toString()}
            date={jsToSqlDate(date)}
            listElementId={listElementId}
            width={cellsWidth}
            heigth={cellsHeight}
            ReactCellChildren={ReactCellChildren}
          />
        ))}
    </div>
  );
};

export default CellsRow;
