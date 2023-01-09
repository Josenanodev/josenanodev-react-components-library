/// <reference types="react" />
import "./SideBar.css";
import { SideBarPropsType } from "./types";
/**
 * NOTE: Parent Node must have position: relative, to work correctly with the side bar
 */
declare const SideBar: ({ side, open, children, closeAction, outBoundClickClosesSideBar, aditionalInlineStyle, }: SideBarPropsType) => JSX.Element;
export default SideBar;
