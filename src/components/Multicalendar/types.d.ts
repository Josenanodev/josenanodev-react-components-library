import { languageType } from "../../languages/types";

export interface MulticalendarPropsType {
  multicalendarId: string;
  ReactCellChildren: ReactCellChildrenType;
  ReactListElementChildren: ReactListElementChildrenType;
  listElementsIdsArray: string[] | number[];
  language: languageType;
  pastDatesVisible?: boolean
  cellsWidth?: number;
  cellsHeight?: number;
  verticalAxisWidth?: number;
  horizontalAxisHeight?: number;
  pastDaysInitialQuantity?: number;
  futureDaysInitialQuantity?: number;
  chunkRenderX?: number;
  chunkRenderY?: number;
  draggingOverDateCells?: boolean;
  dynamicPagination?: boolean;
  logoUrl?: string;
  waitTimeForCalls?: number;
  callsOnScrollingStops?: Function;
}

export interface RenderCoordinatesType {
  x: number;
  y: number;
}

export type ReactCellChildrenType = React.ElementType<CellChildrenPropsType>;

export type ReactListElementChildrenType =
  React.ElementType<ListElementChildrenPropsType>;

export type CellChildrenPropsType = { [key: string]: any } & {
  /**Date in SQL format, i.e. 1993-03-29 */
  date: string;
  listElementId: string | number;
};

export type ListElementChildrenPropsType = { [key: string]: any } & {
  listElementId: string | number;
};
