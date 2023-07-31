export interface SliderPropsType {
  minimumValue: number;
  maximumValue: number;
  onChange: (newValue: number) => void;
  initialValue?: number;
  value?: number;
  showValueInsideButton?: boolean;
  editableValueInsideButton?: boolean;
  height?: number;
  width?: number;
  sufix?: string;
  prefix?: string;
  disabled?: boolean;
}
