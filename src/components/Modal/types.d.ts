export interface ModalPropsType {
  children: JSX.Element;
  visibility: boolean;
  forced?: boolean;
  onOpen?: Function;
  onClose?: Function;
  transitionTime?: number;
}
