import React from "react";
type ModalProps = {
    children: JSX.Element;
    visibility: boolean;
    forced?: boolean;
    onOpen?: Function;
    onClose?: Function;
    transitionTime?: number;
};
declare const Modal: ({ children, visibility, forced, onOpen, onClose }: ModalProps) => React.JSX.Element;
export default Modal;
