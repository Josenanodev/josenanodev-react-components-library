import React from "react";
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
declare const AlertModal: ({ type, title, message, customChildren, confirmText, cancelText, confirmButton, cancelButton, overrideOpenState, forced, iconSize, iconColor, onConfirm, onCancel, }: AlertModalProps) => React.JSX.Element;
export default AlertModal;
