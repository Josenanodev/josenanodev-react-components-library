export interface InputBoxWithConfirmationPropsType {
  onConfirmAction: (inputCurrentValue: string) => void;
  inputType?: HTMLInputElement["type"];
  aditionalClass?: string;
  defaultValue?: string | number;
}
