"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
/**
 * @returns Array [ancho, alto], de dichos valores refieren
 * los valores de window.innerWidth y window.innerHeight
 */
function useWindowSize() {
    const [size, setSize] = (0, react_1.useState)([0, 0]);
    (0, react_1.useLayoutEffect)(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
}
exports.default = useWindowSize;
