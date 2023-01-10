export interface PopUpProps {
  children: JSX.Element | JSX.Element[];
  open: boolean;
  closeAction?: Function;
  outBoundClickClosesPopUp?: boolean;
  aditionalInlineStyle?: React.CSSProperties;
  aditionalClass?: string;
}
