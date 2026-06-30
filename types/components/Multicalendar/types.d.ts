export interface MulticalendarProps {
    /** Stable DOM and sessionStorage id. Use a unique value per calendar instance. */
    multicalendarId: string;
    /** Component rendered inside every visible date/resource grid cell. */
    ReactCellChildren: ReactCellChildren;
    /** Component rendered for each visible row in the left resource axis. */
    ReactListElementChildren: ReactListElementChildren;
    /** Resource ids displayed as rows in the calendar. */
    listElementsIdsArray: string[] | number[];
    /** Language used by toolbar controls and date labels. */
    language?: "es_ES" | "en_EN";
    /** Whether dates before today are available in the horizontal range. */
    pastDatesVisible?: boolean;
    /** Width in pixels for each date cell. */
    cellsWidth?: number;
    /** Height in pixels for each resource row. */
    cellsHeight?: number;
    /** Width in pixels of the left resource axis. */
    verticalAxisWidth?: number;
    /** Reserved height setting for the top date axis. */
    horizontalAxisHeight?: number;
    /** Initial number of past days rendered in the scrollable range. */
    pastDaysInitialQuantity?: number;
    /** Initial number of future days rendered in the scrollable range. */
    futureDaysInitialQuantity?: number;
    /** Extra horizontal cells rendered outside the viewport to reduce blank space while scrolling. */
    chunkRenderX?: number;
    /** Extra vertical rows rendered outside the viewport to reduce blank space while scrolling. */
    chunkRenderY?: number;
    /** Auto-scrolls while dragging near grid edges. */
    authomaticScrollOnDraggingOverEdges?: boolean;
    /** Extends the date range when users scroll near the horizontal boundaries. */
    dynamicDaysQuantity?: boolean;
    /** Debounce time in milliseconds before callsOnScrollingStops runs. */
    waitTimeForCalls?: number;
    /** Called once after the initial visible ids and dates are available. */
    callsOnInitialView?: (visibleIds: string[] | number[], visibleDates: Date[]) => void;
    /** Called after scrolling settles with currently visible ids and dates. */
    callsOnScrollingStops?: (visibleIds: string[] | number[], visibleDates: Date[]) => void;
    /** Extra controls rendered in the toolbar beside date navigation. */
    aditionalControlsComponents?: React.ReactNode | React.ReactNode[];
    /** Custom content rendered in the upper-left corner above the resource axis. */
    upperLeftComponent?: React.ReactNode;
    /** Persists scroll position in sessionStorage using multicalendarId. */
    autoSavePosition?: boolean;
    /** Called whenever the vertical scroll position changes. */
    onScrollTopChanges?: (scrollTop: number) => void;
    /** Called whenever the horizontal scroll position changes. */
    onScrollLeftChanges?: (scrollLeft: number) => void;
}
export interface RenderCoordinates {
    x: number;
    y: number;
}
export type ReactCellChildren = React.ElementType<CellChildrenProps>;
export type ReactListElementChildren = React.ElementType<ListElementChildrenProps>;
export type CellChildrenProps = {
    [key: string]: any;
} & {
    /** Date in SQL format, for example 1993-03-29. */
    date: string;
    /** Row/resource id for the cell being rendered. */
    listElementId: string | number;
};
export type ListElementChildrenProps = {
    [key: string]: any;
} & {
    /** Row/resource id for the list element being rendered. */
    listElementId: string | number;
};
