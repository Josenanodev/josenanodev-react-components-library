"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideClick(elementRef, onOutsideClickAction) {
    (0, react_1.useEffect)(() => {
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
exports.default = useOutsideClick;
