import React, { useState, useRef } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import "./PopUp.css";

//Types
import { PopUpProps } from "./types";

const PopUp = ({
  open = false,
  children,
  closeAction,
  outBoundClickClosesPopUp,
  aditionalInlineStyle = {},
  aditionalClass,
}: PopUpProps) => {
  //Refs
  const popUpRef = useRef<HTMLDivElement | null>(null);
  //Hooks
  useOutsideClick(popUpRef, () => {
    if (outBoundClickClosesPopUp) {
      setOpenState(false);
      if (closeAction) closeAction();
    }
  });
  //Estados
  const [openState, setOpenState] = useState<boolean>(open);
  //useState
  return (
    <div
      ref={popUpRef}
      className={
        "pop-up" +
        ((closeAction && open) || (!closeAction && openState) ? "" : " pop-up-hidden") +
        (aditionalClass ? " " + aditionalClass : "")
      }
      style={aditionalInlineStyle}
    >
      {children}
    </div>
  );
};

export default PopUp;
