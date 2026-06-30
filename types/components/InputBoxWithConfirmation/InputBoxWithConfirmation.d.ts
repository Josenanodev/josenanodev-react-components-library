import React from "react";
type InputBoxWithConfirmationPropsType = {
    /** Called with the committed value after confirmation, Enter, or blur. */
    onConfirmAction: (inputCurrentValue: string) => void;
    /** Native input type used by the inner input. */
    inputType?: "text" | "number";
    /** Minimum value passed to the native input and enforced for number inputs. */
    minimumValue?: HTMLInputElement["min"];
    /** Maximum value passed to the native input and enforced for number inputs. */
    maximumValue?: HTMLInputElement["max"];
    /** Maximum number of accepted characters. */
    maxLength?: HTMLInputElement["maxLength"];
    /** Placeholder shown while the input is empty. */
    placeholder?: HTMLInputElement["placeholder"];
    /** Inline styles applied to the outer clickable wrapper. */
    divWrapperCustomStyle?: React.CSSProperties;
    /** Inline styles applied to the inner input element. */
    inputBoxCustomStyle?: React.CSSProperties;
    /** Initial value shown before the user edits. */
    defaultValue?: string | number;
    /** Controlled value override. Pass null to clear the input. */
    overrideCurrentValue?: string | number | null;
    /** Shows explicit edit/confirm buttons instead of confirming directly on blur. */
    showConfirmationButton?: boolean;
    /** Disables editing and hides the confirmation controls. */
    disabled?: boolean;
};
declare const InputBoxWithConfirmation: ({ onConfirmAction, inputType, minimumValue, maximumValue, maxLength, placeholder, divWrapperCustomStyle, inputBoxCustomStyle, defaultValue, overrideCurrentValue, showConfirmationButton, disabled, }: InputBoxWithConfirmationPropsType) => React.JSX.Element;
export default InputBoxWithConfirmation;
