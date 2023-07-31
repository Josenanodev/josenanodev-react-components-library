import React from "react";
/**
 * @returns Array [elementWidth, elementHeight], that represent the current
 * values of width and height of elementRef
 */
declare function useResizeObserver(elementRef: React.MutableRefObject<HTMLElement | null>): number[];
export default useResizeObserver;
