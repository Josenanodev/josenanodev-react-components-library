import { RefObject } from "react";
/**
 * Hook to observe an element's intersection
 * @param ref ref to the element to observe
 * @param options intersection observer options
 * @returns a boolean indicating if the element is intersecting
 */
declare function useIntersectionObserver(ref: RefObject<Element>, options?: IntersectionObserverInit | undefined): boolean;
export default useIntersectionObserver;
