/// <reference types="react" />
import "./Modal.css";
import { ModalPropsType } from "./types";
declare const Modal: ({ children, parentElement, visibility, forced, onOpen, onClose, transitionTime, }: ModalPropsType) => JSX.Element;
export default Modal;
