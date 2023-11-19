import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.scss";

type ModalProps = {
  children: JSX.Element;
  visibility: boolean;
  forced?: boolean;
  onOpen?: Function;
  onClose?: Function;
  transitionTime?: number;
};

const Modal = ({ children, visibility, forced = false, onOpen, onClose }: ModalProps) => {
  //Estados
  const [isVisible, setIsVisible] = useState(visibility);
  const [isDisplayable, setIsDisplayable] = useState(visibility);
  //UseEffect
  useEffect(() => {
    if (visibility) {
      setIsVisible(true);
      if (onOpen) onOpen();
    } else if (!visibility) {
      setIsVisible(false);
      if (onClose) onClose();
    }
  }, [visibility, onOpen, onClose]);
  useEffect(() => {
    if (isVisible) {
      setIsDisplayable(true);
    } else if (!isVisible) {
      setTimeout(() => {
        setIsDisplayable(false);
      }, 500);
    }
  }, [isVisible])
  //Render
  if (!isDisplayable) return <></>;
  return ReactDOM.createPortal(
    <div
      className={styles["blured-background"]}
      data-is-visible={isVisible}
      onClick={() => {
        if (forced) return;
        setIsVisible(false);
        if (onClose) onClose();
      }}
    >
      <div>
        <div
          className={styles["modal"]}
          data-closed={!visibility}
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
