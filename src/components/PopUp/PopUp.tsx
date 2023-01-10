import React, { useState, useRef } from "react";
import "./PopUp.css";

//hooks
import useOutsideClick from "../../hooks/useOutsideClick";

//Types
import { PopUpPropsType } from "./types";

const PopUp = ({
  open = false,
  children,
  closeAction,
  outBoundClickClosesPopUp,
  aditionalInlineStyle = {},
  aditionalClass,
  activationButtonRef,
}: PopUpPropsType) => {
  //Refs
  const popUpRef = useRef<HTMLDivElement | null>(null);
  //Hooks
  useOutsideClick(
    popUpRef,
    () => {
      if (outBoundClickClosesPopUp) {
        setOpenState(false);
        if (closeAction) closeAction();
      }
    },
    activationButtonRef ? [activationButtonRef] : []
  );
  //useState
  const [openState, setOpenState] = useState<boolean>(open);
  return (
    <div
      ref={popUpRef}
      className={
        "pop-up" +
        ((closeAction && open) || (!closeAction && openState) ? "" : " pop-up-hidden") +
        (aditionalClass ? " " + aditionalClass : "")
      }
      style={open ? aditionalInlineStyle : {}}
    >
      {children}
    </div>
  );
};

export default PopUp;
