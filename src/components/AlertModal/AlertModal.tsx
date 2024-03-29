import React, { useState, useEffect } from "react";
import styles from "./AlertModal.module.scss";
import Modal from "../Modal";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
import { IoWarningOutline } from "react-icons/io5";
import { PiWarningCircle } from "react-icons/pi";
import { GoQuestion } from "react-icons/go";

type AlertModalProps = {
  type?: "success" | "error" | "warning" | "info" | "question";
  title?: string;
  message?: string;
  customChildren?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  confirmButton?: boolean;
  cancelButton?: boolean;
  overrideOpenState?: boolean;
  forced?: boolean;
  iconSize?: number;
  iconColor?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

const AlertModal = ({
  type,
  title,
  message,
  customChildren,
  confirmText = "OK",
  cancelText = "Cancel",
  confirmButton = true,
  cancelButton = true,
  overrideOpenState = false,
  forced = false,
  iconSize = 64,
  iconColor,
  onConfirm = () => {},
  onCancel = () => {},
}: AlertModalProps) => {
  const [isOpen, setIsOpen] = useState(overrideOpenState);
  useEffect(() => {
    if (overrideOpenState !== isOpen) setIsOpen(overrideOpenState);
  }, [overrideOpenState]);
  return (
    <Modal overrideOpenState={isOpen} forced={forced} onClose={() => setIsOpen(false)}>
      <div className={styles["alert-modal"]}>
        <section className={styles["icon-section"]}>
          {type === "success" && (
            <BsCheckCircle size={iconSize} color={iconColor ?? "green"} />
          )}
          {type === "error" && <BsXCircle size={iconSize} color={iconColor ?? "red"} />}
          {type === "warning" && (
            <IoWarningOutline size={iconSize} color={iconColor ?? "orange"} />
          )}
          {type === "info" && (
            <PiWarningCircle size={iconSize} color={iconColor ?? "blue"} />
          )}
          {type === "question" && (
            <GoQuestion size={iconSize} color={iconColor ?? "gray"} />
          )}
        </section>
        {title && <h1 className={styles["title"]}>{title}</h1>}
        {message && <p className={styles["message"]}>{message}</p>}
        {customChildren}
        <section className={styles["button-section"]}>
          {cancelButton && (
            <button
            className={styles["cancel-button"]}
            onClick={() => {
                setIsOpen(false);
                onCancel();
              }}
              >
              {cancelText}
            </button>
          )}
          {confirmButton && (
            <button
              className={styles["confirm-button"]}
              onClick={() => {
                setIsOpen(false);
                onConfirm();
              }}
            >
              {confirmText}
            </button>
          )}
        </section>
      </div>
    </Modal>
  );
};

export default AlertModal;
