import React from "react";
import "./Modal.css";
import { ModalPropsType } from "./types";
declare const Modal: ({ children, visibility, forced, onOpen, onClose, transitionTime, }: ModalPropsType) => React.JSX.Element;
export default Modal;
