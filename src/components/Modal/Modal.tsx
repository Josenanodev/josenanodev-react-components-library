import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.scss";

type ModalProps = {
  /** Content rendered inside the modal panel. */
  children: React.ReactNode;
  /** Controlled open state. Set to true to display the modal. */
  overrideOpenState?: boolean;
  /** Prevents backdrop clicks from closing the modal. */
  forced?: boolean;
  /** Called when overrideOpenState opens the modal. */
  onOpen?: Function;
  /** Called when the modal closes. */
  onClose?: Function;
  /** Reserved transition duration prop. Current timing is controlled by CSS. */
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
