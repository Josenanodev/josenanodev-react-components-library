export interface PopUpProps {
  children: JSX.Element;
  callingButton?: React.MutableRefObject<HTMLButtonElement | null>
  aditionalClass?: String;
  visibility: boolean;
  onCloseAction?: Function
}
