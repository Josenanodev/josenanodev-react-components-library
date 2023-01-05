export interface MultidestinyPropsType {
  ReactCellChildren: ReactCellChildrenType;
  ReactListElementChildren: ReactListElementChildrenType;
  listElementsIdsArray: string[] | number[];
  cellsWidth?: number;
  cellsHeight?: number;
  verticalAxisWidth?: number;
  horizontalAxisHeight?: number;
  horizontalInitialCellQuantity?: number;
  chunkRenderX?: number;
  chunkRenderY?: number;
  dynamicPagination?: boolean;
  waitTimeForCalls?: number;
}

export interface RenderCoordinatesType {
  x: number;
  y: number;
}

export type ReactCellChildrenType = React.ElementType<CellChildrenPropsType>;

export type ReactListElementChildrenType =
  React.ElementType<ListElementChildrenPropsType>;

interface CellChildrenPropsType {
  date: string;
  /**Date in SQL format, i.e. 1993-03-29 */
  listElementId: string | number;
}

interface ListElementChildrenPropsType {
  listElementId: string | number;
}
