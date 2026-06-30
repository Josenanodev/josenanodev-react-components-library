import React from "react";
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
declare const Modal: ({ children, overrideOpenState, forced, onOpen, onClose, }: ModalProps) => React.JSX.Element;
export default Modal;
