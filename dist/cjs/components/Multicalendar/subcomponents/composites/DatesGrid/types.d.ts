import { ReactCellChildrenType } from "../../../types";

export interface DatesGridPropTypes {
  gridWidth: number;
  gridHeight: number;
  xOffset: number;
  yOffset: number;
  cellsWidth: number;
  cellsHeight: number;
  visibleListElementsIdsArray: string[] | number[];
  visibleDates: Date[];
  ReactCellChildren: ReactCellChildrenType;
}
