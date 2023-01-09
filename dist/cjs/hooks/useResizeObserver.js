"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
/**
 * @returns Array [elementWidth, elementHeight], that represent the current
 * values of width and height of elementRef
 */
function useResizeObserver(elementRef) {
    const [elementWidth, setElementWidth] = (0, react_1.useState)(0);
    const [elementHeight, setElementHeight] = (0, react_1.useState)(0);
    const observer = (0, react_1.useRef)(new ResizeObserver((entries) => {
        const { width, height } = entries[0].contentRect;
        setElementWidth(width);
        setElementHeight(height);
    }));
    (0, react_1.useEffect)(() => {
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
exports.default = useResizeObserver;
