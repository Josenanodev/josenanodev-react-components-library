import { languageType } from "../assets/languages/types";

export interface MulticalendarPropsType {
  multicalendarId: string;
  ReactCellChildren: ReactCellChildrenType;
  ReactListElementChildren: ReactListElementChildrenType;
  listElementsIdsArray: string[] | number[];
  language: languageType,
  cellsWidth?: number;
  cellsHeight?: number;
  verticalAxisWidth?: number;
  horizontalAxisHeight?: number;
  horizontalInitialCellQuantity?: number;
  chunkRenderX?: number;
  chunkRenderY?: number;
  draggingOverDateCells?: boolean,
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

export interface CellChildrenPropsType {
  date: string;
  /**Date in SQL format, i.e. 1993-03-29 */
  listElementId: string | number;
}

export interface ListElementChildrenPropsType {
  listElementId: string | number;
}
