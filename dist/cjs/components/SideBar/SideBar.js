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
require("./SideBar.css");
//Hooks
const useOutsideClick_1 = __importDefault(require("../../hooks/useOutsideClick"));
const useResizeObserver_1 = __importDefault(require("../../hooks/useResizeObserver"));
//Icons
const bs_1 = require("react-icons/bs");
/**
 * NOTE: Parent Node must have position: relative, to work correctly with the side bar
 */
const SideBar = ({ side, open = false, children, closeAction, outBoundClickClosesSideBar, aditionalInlineStyle = {}, }) => {
    //Refs
    const sideBarRef = (0, react_1.useRef)(null);
    //Hooks
    const [elementWidth] = (0, useResizeObserver_1.default)(sideBarRef);
    (0, useOutsideClick_1.default)(sideBarRef, () => {
        if (outBoundClickClosesSideBar)
            if (closeAction) {
                closeAction();
            }
            else {
                setOpenState(false);
            }
    });
    //useState
    const [openState, setOpenState] = (0, react_1.useState)(open);
    return (react_1.default.createElement("div", { ref: sideBarRef, className: "side-bar", style: Object.assign({ [side === "left" ? "right" : "left"]: (closeAction && open) || (!closeAction && openState)
                ? `calc(100% - ${elementWidth}px)`
                : closeAction
                    ? "100%"
                    : `calc(100% - 30px)` }, aditionalInlineStyle) },
        react_1.default.createElement("button", { style: side === "left" ? { right: 0 } : { left: 0 }, className: "sidebar-close-button", onClick: () => {
                if (closeAction) {
                    closeAction();
                }
                else {
                    setOpenState(!openState);
                }
            } }, side === "left" ? (react_1.default.createElement(bs_1.BsChevronLeft, { className: (closeAction && open) || (!closeAction && openState) ? "open" : "close" })) : (react_1.default.createElement(bs_1.BsChevronRight, { className: (closeAction && open) || (!closeAction && openState) ? "open" : "close" }))),
        children));
};
exports.default = SideBar;
