import React from "react";
/**
 * Hook that observes the size of an element
 * @param elementRef ref of the element that will be observed
 * @returns Array [elementWidth, elementHeight], that represent the current
 * values of width and height of elementRef
 */
declare function useResizeObserver(elementRef: React.MutableRefObject<HTMLElement | null>): number[];
export default useResizeObserver;
