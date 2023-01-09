import { useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideClick(elementRef: React.MutableRefObject<HTMLElement | null>, onOutsideClickAction: Function) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (elementRef.current && !elementRef.current.contains(event.target)) {
        onOutsideClickAction();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [elementRef, onOutsideClickAction]);
}

export default useOutsideClick;
