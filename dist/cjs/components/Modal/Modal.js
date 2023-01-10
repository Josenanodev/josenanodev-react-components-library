"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
require("./Modal.css");
//Hooks
const useOutsideClick_1 = __importDefault(require("../../hooks/useOutsideClick"));
const Modal = ({ children, parentElement, visibility, forced = false, onOpen, onClose, transitionTime = 500, }) => {
    //Refs
    const modalRef = (0, react_1.useRef)(null);
    //Estados
    const [visible, setVisible] = (0, react_1.useState)(visibility);
    //Hooks
    (0, useOutsideClick_1.default)(modalRef, () => {
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
    (0, react_1.useEffect)(() => {
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
        return react_dom_1.default.createPortal(react_1.default.createElement("div", { ref: modalRef, className: visibility ? "modal" : "close-modal", style: { animationDuration: `${transitionTime}ms` }, onClick: (event) => {
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
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
};
exports.default = Modal;
