import { useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideClick(
  elementRef: React.MutableRefObject<HTMLElement | null>,
  onOutsideClickAction: Function,
  elementsRefsExceptions: React.MutableRefObject<HTMLElement | null>[] = []
) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (
        elementRef.current &&
        !elementRef.current.contains(event.target as Node | null) &&
        elementsRefsExceptions.every(
          (elementRefException) => elementRefException.current !== event.target
        )
      ) {
        onOutsideClickAction();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [elementRef, onOutsideClickAction, elementsRefsExceptions]);
}

export default useOutsideClick;