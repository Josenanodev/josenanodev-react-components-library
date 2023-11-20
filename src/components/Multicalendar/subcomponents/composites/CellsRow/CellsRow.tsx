import React from "react"
import styles from "./CellsRow.module.scss"

//Componentes
import Cell from "../../individuals/Cell/Cell";

//Utils
import { jsToSqlDate } from "josenanodev-generic-utils";

//Types
import { ReactCellChildren } from "../../../types";

type CellsRowsProps = {
  listElementId: string | number;
  visibleDatesArray: Date[];
  width: number;
  height: number;
  cellsWidth: number;
  cellsHeight: number;
  ReactCellChildren: ReactCellChildren;
}

const CellsRow = ({
  listElementId,
  visibleDatesArray,
  width,
  height,
  cellsWidth,
  cellsHeight,
  ReactCellChildren,
}: CellsRowsProps) => {
  //Render
  return (
    <div
      className={styles["cells-row"]}
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
