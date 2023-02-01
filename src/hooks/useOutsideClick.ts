import { useEffect } from "react";

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