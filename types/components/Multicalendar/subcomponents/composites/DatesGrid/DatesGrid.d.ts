import React from "react";
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
};
declare const DatesGrid: ({ gridWidth, gridHeight, xOffset, yOffset, cellsWidth, cellsHeight, visibleListElementsIdsArray, visibleDates, ReactCellChildren, }: DatesGridProps) => React.JSX.Element;
export default DatesGrid;
