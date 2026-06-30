import React from "react";
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
declare const AlertModal: ({ type, title, message, customChildren, confirmText, cancelText, confirmButton, cancelButton, overrideOpenState, forced, iconSize, iconColor, onConfirm, onCancel, }: AlertModalProps) => React.JSX.Element;
export default AlertModal;
