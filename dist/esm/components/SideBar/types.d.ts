export interface SideBarPropsType {
  side: "left" | "right";
  children: JSX.Element | JSX.Element[];
  open: boolean;
  closeAction?: Function;
  outBoundClickClosesSideBar?: boolean;
  aditionalInlineStyle?: React.CSSProperties;
}
