import { useLayoutEffect, useState } from "react";

/**
 * Hook that observes the size of the window
 * @returns Array [windowWidth, windowHeight], that represent the current
 * values of width and height of window
 */
function useWindowSize() {
  const [size, setSize] = useState<[number, number]>([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

export default useWindowSize;
