export interface MultipleJoinedButtonsBarPropsType<T> {
  options: { _id: T; visibleValue: string }[];
  onSelectOption: (selectedValue: T) => void;
  initialSelectedValue?: T;
  externalSelectedValue?: T;
}
