import React from "react";
import styles from "./DatesGrid.module.scss";

//Componentes
import CellsRow from "../CellsRow/CellsRow";

//Types
import { ReactCellChildren } from "../../../types";

type DatesGridProps = {
  gridWidth: number;
  gridHeight: number;
  xOffset: number;
  yOffset: number;
  cellsWidth: number;
  cellsHeight: number;
  visibleListElementsIdsArray: string[] | number[];
  visibleDates: Date[];
  ReactCellChildren: ReactCellChildren;
}

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
}: DatesGridProps) => {
  const maximumPaddingLeft = gridWidth - visibleDates.length * cellsWidth;
  const paddingLeft =
    xOffset * cellsWidth > maximumPaddingLeft ? maximumPaddingLeft : xOffset * cellsWidth;
  return (
    <div
      className={styles["dates-grid"]}
      style={{
        width: gridWidth,
      }}
    >
      <div
        className={styles["div-cells-row-height"]}
        style={{
          height: gridHeight,
          paddingTop: yOffset * cellsHeight,
          paddingLeft: paddingLeft,
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
