import { useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 * @param elementRef ref of the element that will be checked
 * @param onOutsideClickAction action to be executed when clicked outside
 * @param elementsRefsExceptions array of refs that will be ignored
 */
function useOutsideClick(
  elementRef: React.MutableRefObject<HTMLElement | null>,
  onOutsideClickAction: Function,
  elementsRefsExceptions: React.MutableRefObject<HTMLElement | null>[] = []
) {
  useEffect(() => {
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [elementRef, onOutsideClickAction, elementsRefsExceptions]);
}

export default useOutsideClick;