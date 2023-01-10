import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
//Hooks
import useOutsideClick from "../../hooks/useOutsideClick";
const Modal = ({ children, parentElement, visibility, forced = false, onOpen, onClose, transitionTime = 500, }) => {
    //Refs
    const modalRef = useRef(null);
    //Estados
    const [visible, setVisible] = useState(visibility);
    //Hooks
    useOutsideClick(modalRef, () => {
        if (modalRef.current !== null && !forced) {
            modalRef.current.className = "close-modal";
            setTimeout(() => {
                setVisible(false);
                if (onClose)
                    onClose();
            }, transitionTime - 50);
        }
    });
    //UseEffect
    useEffect(() => {
        if (visibility) {
            setVisible(true);
            if (onOpen)
                onOpen();
        }
        else if (!visibility) {
            setTimeout(() => {
                setVisible(false);
                if (onClose)
                    onClose();
            }, transitionTime - 50);
        }
    }, [visibility, transitionTime, onOpen, onClose]);
    //Render
    if (visible) {
        return ReactDOM.createPortal(React.createElement("div", { ref: modalRef, className: visibility ? "modal" : "close-modal", style: { animationDuration: `${transitionTime}ms` }, onClick: (event) => {
                if (event.target.id === "modal" && !forced) {
                    event.target.id = "close-modal";
                    setTimeout(() => {
                        setVisible(false);
                        if (onClose)
                            onClose();
                    }, transitionTime - 50);
                }
            } }, children), parentElement);
    }
    else {
        return React.createElement(React.Fragment, null);
    }
};
export default Modal;
