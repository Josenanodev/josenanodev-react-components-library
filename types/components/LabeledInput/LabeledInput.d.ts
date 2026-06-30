import React from "react";
type SpecialType = "credit-card-number" | "expiration-date" | "cvv" | "phone";
type LabeledInputProps = {
    /** Floating label displayed over the input. */
    label: string;
    /** Initial uncontrolled input value. */
    defaultValue?: string;
    /** Called with the current formatted value whenever the user types. */
    onChange?: (value: string) => void;
    /** CSS width applied to the root wrapper. */
    width?: string;
    /** CSS height applied to the root wrapper. */
    height?: string;
    /** Background color applied to the wrapper and label gap. */
    backgroundColor?: string;
    /** Text alignment for the native input. */
    textAlign?: "left" | "center" | "right";
    /** Enables the error border and label color. */
    highlightError?: boolean;
    /** Error text displayed below the input when highlightError is true. */
    errorMessage?: string;
    /** Additional props forwarded to the native input element. */
    inputProps?: React.ComponentProps<"input">;
    /** Optional built-in formatter applied while typing. */
    specialType?: SpecialType;
};
declare const LabeledInput: ({ label, defaultValue, onChange, width, height, backgroundColor, textAlign, highlightError, errorMessage, inputProps, specialType, }: LabeledInputProps) => React.JSX.Element;
export default LabeledInput;
