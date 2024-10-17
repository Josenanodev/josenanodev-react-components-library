import React from "react";
type SpecialType = "credit-card-number" | "expiration-date" | "cvv" | "phone";
type LabeledInputProps = {
    label: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    width?: string;
    height?: string;
    backgroundColor?: string;
    textAlign?: "left" | "center" | "right";
    highlightError?: boolean;
    errorMessage?: string;
    inputProps?: React.ComponentProps<"input">;
    specialType?: SpecialType;
};
declare const LabeledInput: ({ label, defaultValue, onChange, width, height, backgroundColor, textAlign, highlightError, errorMessage, inputProps, specialType, }: LabeledInputProps) => React.JSX.Element;
export default LabeledInput;
