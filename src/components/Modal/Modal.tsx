"use client";
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

//Hooks
import useOutsideClick from "../../hooks/useOutsideClick";

//Types
import { ModalPropsType } from "./types";

const Modal = ({
  children,
  visibility,
  forced = false,
  onOpen,
  onClose,
  transitionTime = 500,
}: ModalPropsType) => {
  //Refs
  const modalRef = useRef<HTMLDivElement | null>(null);
  //Estados
  const [visible, setVisible] = useState<boolean>(visibility);
  //Hooks
  useOutsideClick(modalRef, () => {
    if (modalRef.current !== null && !forced) {
      modalRef.current.className = "close-modal";
      setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, transitionTime - 50);
    }
  });
  //UseEffect
  useEffect(() => {
    if (visibility) {
      setVisible(true);
      if (onOpen) onOpen();
    } else if (!visibility) {
      setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, transitionTime - 50);
    }
  }, [visibility, transitionTime, onOpen, onClose]);
  //Render
  if (visible) {
    return ReactDOM.createPortal(
      <div
        ref={modalRef}
        className={visibility ? "trc-modal" : "trc-close-modal"}
        style={{ animationDuration: `${transitionTime}ms` }}
        onClick={(event) => {
          if ((event.target as HTMLDivElement).id === "modal" && !forced) {
            (event.target as HTMLDivElement).id = "close-modal";
            setTimeout(() => {
              setVisible(false);
              if (onClose) onClose();
            }, transitionTime - 50);
          }
        }}
      >
        {children}
      </div>,
       document.getElementById("root") || document.body
    );
  } else {
    return <></>;
  }
};

export default Modal;
