export interface MultipleJoinedButtonsBarPropsType {
  options: { _id: string; visibleValue: string }[];
  onSelectOption: (selectedValue: string) => void;
  initialSelectedValue?: string;
  externalSelectedValue?: string;
}
