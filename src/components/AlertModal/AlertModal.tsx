import React, { useState, useEffect } from "react";
import styles from "./AlertModal.module.scss";
import Modal from "../Modal";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
import { IoWarningOutline } from "react-icons/io5";
import { PiWarningCircle } from "react-icons/pi";
import { GoQuestion } from "react-icons/go";

type AlertModalProps = {
  /** Visual intent used to select the default status icon and color. */
  type?: "success" | "error" | "warning" | "info" | "question";
  /** Optional heading displayed above the modal message. */
  title?: string;
  /** Short body copy displayed below the title. */
  message?: string;
  /** Custom content rendered between the message and action buttons. */
  customChildren?: React.ReactNode;
  /** Text rendered in the confirm action button. */
  confirmText?: string;
  /** Text rendered in the cancel action button. */
  cancelText?: string;
  /** Shows or hides the confirm action button. */
  confirmButton?: boolean;
  /** Shows or hides the cancel action button. */
  cancelButton?: boolean;
  /** Controlled open state. Set to true to display the modal. */
  overrideOpenState?: boolean;
  /** Prevents closing the modal by clicking the backdrop. */
  forced?: boolean;
  /** Icon size in pixels. */
  iconSize?: number;
  /** Overrides the default icon color for the selected type. */
  iconColor?: string;
  /** Called after the confirm button is clicked. */
  onConfirm?: () => void;
  /** Called after the cancel button is clicked. */
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
