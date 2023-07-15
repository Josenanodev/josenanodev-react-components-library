export interface InputBoxWithConfirmationPropsType {
  onConfirmAction: (inputCurrentValue: string) => void;
  inputType?: "text" | "number";
  minimumValue?: HTMLInputElement["min"],
  maximumValue?: HTMLInputElement["max"],
  placeholder?: HTMLInputElement["placeholder"],
  aditionalClass?: string;
  defaultValue?: string | number;
  overrideCurrentValue?: string | number | null;
  showConfirmationButton?: boolean;
  disabled?: boolean;
}
