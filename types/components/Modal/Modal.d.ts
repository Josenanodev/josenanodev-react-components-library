import React from "react";
type ModalProps = {
    children: React.ReactNode;
    overrideOpenState?: boolean;
    forced?: boolean;
    onOpen?: Function;
    onClose?: Function;
    transitionTime?: number;
};
declare const Modal: ({ children, overrideOpenState, forced, onOpen, onClose, }: ModalProps) => React.JSX.Element;
export default Modal;
