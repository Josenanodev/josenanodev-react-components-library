/// <reference types="react" />
/**
 * Hook that alerts clicks outside of the passed ref
 * @param elementRef ref of the element that will be checked
 * @param onOutsideClickAction action to be executed when clicked outside
 * @param elementsRefsExceptions array of refs that will be ignored
 */
declare function useOutsideClick(elementRef: React.MutableRefObject<HTMLElement | null>, onOutsideClickAction: Function, elementsRefsExceptions?: React.MutableRefObject<HTMLElement | null>[]): void;
export default useOutsideClick;
