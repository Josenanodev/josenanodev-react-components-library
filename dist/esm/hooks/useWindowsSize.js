import { useLayoutEffect, useState } from "react";
/**
 * @returns Array [ancho, alto], de dichos valores refieren
 * los valores de window.innerWidth y window.innerHeight
 */
function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
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
