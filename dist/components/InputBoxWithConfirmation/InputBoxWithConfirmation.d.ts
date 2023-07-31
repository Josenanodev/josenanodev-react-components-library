import React from "react";
type InputBoxWithConfirmationPropsType = {
    onConfirmAction: (inputCurrentValue: string) => void;
    inputType?: "text" | "number";
    minimumValue?: HTMLInputElement["min"];
    maximumValue?: HTMLInputElement["max"];
    maxLength?: HTMLInputElement["maxLength"];
    placeholder?: HTMLInputElement["placeholder"];
    divWrapperCustomStyle?: React.CSSProperties;
    inputBoxCustomStyle?: React.CSSProperties;
    defaultValue?: string | number;
    overrideCurrentValue?: string | number | null;
    showConfirmationButton?: boolean;
    disabled?: boolean;
};
declare const InputBoxWithConfirmation: ({ onConfirmAction, inputType, minimumValue, maximumValue, maxLength, placeholder, divWrapperCustomStyle, inputBoxCustomStyle, defaultValue, overrideCurrentValue, showConfirmationButton, disabled, }: InputBoxWithConfirmationPropsType) => React.JSX.Element;
export default InputBoxWithConfirmation;
