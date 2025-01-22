export interface SideBarPropsType {
  side: "left" | "right";
  children: React.ReactNode | React.ReactNode[];
  open: boolean;
  closeAction?: Function;
  outBoundClickClosesSideBar?: boolean;
  aditionalInlineStyle?: React.CSSProperties;
}
