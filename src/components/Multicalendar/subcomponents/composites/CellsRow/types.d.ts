import { ReactCellChildrenType } from "../../../Multicalendar/types";

export interface CellsRowsPropsType {
  listElementId: string | number;
  visibleDatesArray: Date[];
  width: number;
  height: number;
  cellsWidth: number;
  cellsHeight: number;
  ReactCellChildren: ReactCellChildrenType;
}