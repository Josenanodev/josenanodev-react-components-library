/// <reference types="react" />
/**
 * Hook that alerts clicks outside of the passed ref
 */
declare function useOutsideClick(elementRef: React.MutableRefObject<HTMLElement | null>, onOutsideClickAction: Function): void;
export default useOutsideClick;
