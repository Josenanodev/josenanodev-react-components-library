export interface InputBoxWithConfirmationPropsType {
  onConfirmAction: (inputCurrentValue: string) => void;
  inputType?: "text" | "number";
  minimumValue?: HTMLInputElement["min"],
  maximumValue?: HTMLInputElement["max"],
  aditionalClass?: string;
  defaultValue?: string | number;
  showConfirmationButton?: boolean;
}
