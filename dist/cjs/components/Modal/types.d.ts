export interface ModalPropsType {
  children: JSX.Element;
  parentElement: HTMLElement;
  visibility: boolean;
  forced?: boolean;
  onOpen?: Function;
  onClose?: Function;
  transitionTime?: number;
}
