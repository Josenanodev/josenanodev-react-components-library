import React, { useRef, useState } from "react";
import "./SideBar.css";
//Hooks
import useOutsideClick from "../../hooks/useOutsideClick";
import useResizeObserver from "../../hooks/useResizeObserver";
//Icons
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
/**
 * NOTE: Parent Node must have position: relative, to work correctly with the side bar
 */
const SideBar = ({ side, open = false, children, closeAction, outBoundClickClosesSideBar, aditionalInlineStyle = {}, }) => {
    //Refs
    const sideBarRef = useRef(null);
    //Hooks
    const [elementWidth] = useResizeObserver(sideBarRef);
    useOutsideClick(sideBarRef, () => {
        if (outBoundClickClosesSideBar)
            if (closeAction) {
                closeAction();
            }
            else {
                setOpenState(false);
            }
    });
    //useState
    const [openState, setOpenState] = useState(open);
    return (React.createElement("div", { ref: sideBarRef, className: "side-bar", style: Object.assign({ [side === "left" ? "right" : "left"]: (closeAction && open) || (!closeAction && openState)
                ? `calc(100% - ${elementWidth}px)`
                : closeAction
                    ? "100%"
                    : `calc(100% - 30px)` }, aditionalInlineStyle) },
        React.createElement("button", { style: side === "left" ? { right: 0 } : { left: 0 }, className: "sidebar-close-button", onClick: () => {
                if (closeAction) {
                    closeAction();
                }
                else {
                    setOpenState(!openState);
                }
            } }, side === "left" ? (React.createElement(BsChevronLeft, { className: (closeAction && open) || (!closeAction && openState) ? "open" : "close" })) : (React.createElement(BsChevronRight, { className: (closeAction && open) || (!closeAction && openState) ? "open" : "close" }))),
        children));
};
export default SideBar;
