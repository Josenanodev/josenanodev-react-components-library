export interface MultipleJoinedButtonsBarPropsType {
  options: { _id: string; visibleValue: string }[];
  onSelectOption: (selectedValue: string) => Function;
  initialSelectedValue?: string;
  externalSelectedValue?: string;
}
