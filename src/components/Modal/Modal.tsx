import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.scss";

type ModalProps = {
  children: React.ReactNode;
  overrideOpenState?: boolean;
  forced?: boolean;
  onOpen?: Function;
  onClose?: Function;
  transitionTime?: number;
};

const Modal = ({
  children,
  overrideOpenState = false,
  forced = false,
  onOpen,
  onClose,
}: ModalProps) => {
  //Estados
  const [isOpen, setIsOpen] = useState(overrideOpenState);
  const [isDisplayable, setIsDisplayable] = useState(overrideOpenState);
  //UseEffect
  useEffect(() => {
    if (overrideOpenState) {
      setIsOpen(true);
      if (onOpen) onOpen();
    } else if (!overrideOpenState) {
      setIsOpen(false);
      if (onClose) onClose();
    }
  }, [overrideOpenState, onOpen, onClose]);
  useEffect(() => {
    if (isOpen) {
      setIsDisplayable(true);
    } else if (!isOpen) {
      setTimeout(() => {
        setIsDisplayable(false);
      }, 500);
    }
  }, [isOpen]);
  //Render
  if (!isDisplayable) return <></>;
  return ReactDOM.createPortal(
    <div
      className={styles["blured-background"]}
      data-is-visible={isOpen}
      onClick={() => {
        if (forced) return;
        setIsOpen(false);
        if (onClose) onClose();
      }}
    >
      <div>
        <div
          className={styles["modal"]}
          data-closed={!overrideOpenState}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {children}
        </div>
      </div>
    </div>,
    document.getElementById("root") || document.body
  );
};

export default Modal;
