export interface SearchBarPropsType {
  actionOnEnter?: function;
  actionOnAlteringText?: function;
  actionOnEmptyText?: function;
  optionsButtonVisible: boolean;
  actionOnClickOptionsButton?: function;
  placeholder: string;
  initialValue?: string;
  disabled?: boolean;
}
