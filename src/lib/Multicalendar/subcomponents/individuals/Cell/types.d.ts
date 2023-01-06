import {
  EventsType,
  HolidaysType,
  OccupationsType,
  SeasonType,
} from "../../../common/types";
import { ReactCellChildrenType } from "../../../Multicalendar/types";

export interface CellPropsType {
  date: string;
  /**Date in SQL format, i.e. 1993-03-29 */
  listElementId: string | number;
  width: number;
  heigth: number;
  ReactCellChildren: ReactCellChildrenType;
}
