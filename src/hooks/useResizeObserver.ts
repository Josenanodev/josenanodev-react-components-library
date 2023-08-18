import React, { useState, useRef, useEffect } from "react";

/**
 * Hook that observes the size of an element
 * @param elementRef ref of the element that will be observed
 * @returns Array [elementWidth, elementHeight], that represent the current
 * values of width and height of elementRef
 */

function useResizeObserver(elementRef: React.MutableRefObject<HTMLElement | null>) {
  const [elementWidth, setElementWidth] = useState<number>(0);
  const [elementHeight, setElementHeight] = useState<number>(0);
  const observer = useRef(
    new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setElementWidth(width);
      setElementHeight(height);
    })
  );
  useEffect(() => {
    if (elementRef.current !== null) {
      observer.current.observe(elementRef.current);
    }
    const observerCurrentForCleanUp = observer.current;
    const elementRefCurrentForCleanUp = elementRef.current;
    return () => {
      if (elementRefCurrentForCleanUp !== null) {
        observerCurrentForCleanUp.unobserve(elementRefCurrentForCleanUp);
      }
    };
  }, [elementRef, observer]);
  return [elementWidth, elementHeight];
}

export default useResizeObserver;
