export interface PopUpPropsType {
  children: React.ReactNode | React.ReactNode[];
  open: boolean;
  closeAction?: Function;
  outBoundClickClosesPopUp?: boolean;
  aditionalInlineStyle?: React.CSSProperties;
  aditionalClass?: string;
  activationButtonRef?: React.MutableRefObject<HTMLElement | null>;
}
