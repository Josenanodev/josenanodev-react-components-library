export interface MulticalendarProps {
  multicalendarId: string;
  ReactCellChildren: ReactCellChildren;
  ReactListElementChildren: ReactListElementChildren;
  listElementsIdsArray: string[] | number[];
  language?: "es_ES" | "en_EN";
  pastDatesVisible?: boolean;
  cellsWidth?: number;
  cellsHeight?: number;
  verticalAxisWidth?: number;
  horizontalAxisHeight?: number;
  pastDaysInitialQuantity?: number;
  futureDaysInitialQuantity?: number;
  chunkRenderX?: number;
  chunkRenderY?: number;
  authomaticScrollOnDraggingOverEdges?: boolean;
  dynamicDaysQuantity?: boolean;
  waitTimeForCalls?: number;
  callsOnInitialView?: (visibleIds: string[] | number[], visibleDates: Date[]) => void;
  callsOnScrollingStops?: (visibleIds: string[] | number[], visibleDates: Date[]) => void;
  aditionalControlsComponents?: JSX.Element | JSX.Element[];
  upperLeftComponent?: JSX.Element;
  autoSavePosition?: boolean;
  onScrollTopChanges?: (scrollTop: number) => void
  onScrollLeftChanges?: (scrollLeft: number) => void
}

export interface RenderCoordinates {
  x: number;
  y: number;
}

export type ReactCellChildren = React.ElementType<CellChildrenProps>;

export type ReactListElementChildren =
  React.ElementType<ListElementChildrenProps>;

export type CellChildrenProps = { [key: string]: any } & {
  /**Date in SQL format, i.e. 1993-03-29 */
  date: string;
  listElementId: string | number;
};

export type ListElementChildrenProps = { [key: string]: any } & {
  listElementId: string | number;
};
