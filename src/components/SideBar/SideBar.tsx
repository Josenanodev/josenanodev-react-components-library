import React, { useRef, useState } from "react";
import "./SideBar.css";

//Hooks
import useOutsideClick from "../../hooks/useOutsideClick";
import useResizeObserver from "../../hooks/useResizeObserver";

//Icons
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

//Types
import { SideBarPropsType } from "./types";

/**
 * NOTE: Parent Node must have position: relative, to work correctly with the side bar
 */
const SideBar = ({
  side,
  open = false,
  children,
  closeAction,
  outBoundClickClosesSideBar,
  aditionalInlineStyle = {},
}: SideBarPropsType) => {
  //Refs
  const sideBarRef = useRef<HTMLDivElement | null>(null);
  //Hooks
  const [elementWidth] = useResizeObserver(sideBarRef);
  useOutsideClick(sideBarRef, () => {
    if (outBoundClickClosesSideBar)
      if (closeAction) {
        closeAction();
      } else {
        setOpenState(false);
      }
  });
  //useState
  const [openState, setOpenState] = useState<boolean>(open);
  return (
    <div
      ref={sideBarRef}
      className="side-bar"
      style={{
        [side === "left" ? "right" : "left"]:
          (closeAction && open) || (!closeAction && openState)
            ? `calc(100% - ${elementWidth}px)`
            : closeAction
            ? "100%"
            : `calc(100% - 30px)`,
        ...aditionalInlineStyle,
      }}
    >
      <button
        style={side === "left" ? { right: 0 } : { left: 0 }}
        className="sidebar-close-button"
        onClick={() => {
          if (closeAction) {
            closeAction();
          } else {
            setOpenState(!openState);
          }
        }}
      >
        {side === "left" ? (
          <BsChevronLeft
            className={
              (closeAction && open) || (!closeAction && openState) ? "open" : "close"
            }
          />
        ) : (
          <BsChevronRight
            className={
              (closeAction && open) || (!closeAction && openState) ? "open" : "close"
            }
          />
        )}
      </button>
      {children}
    </div>
  );
};

export default SideBar;
