import React from "react";
import { ReactCellChildren } from "../../../types";
type CellsRowsProps = {
    listElementId: string | number;
    visibleDatesArray: Date[];
    width: number;
    height: number;
    cellsWidth: number;
    cellsHeight: number;
    ReactCellChildren: ReactCellChildren;
};
declare const CellsRow: ({ listElementId, visibleDatesArray, width, height, cellsWidth, cellsHeight, ReactCellChildren, }: CellsRowsProps) => React.JSX.Element;
export default CellsRow;
