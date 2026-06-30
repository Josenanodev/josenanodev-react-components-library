import React from "react";
type IntegerControlProps = {
    /** Called with the clamped value after the user changes it. */
    onChange: (value: number) => void;
    /** Initial value and visual baseline for the default state. */
    defaultValue?: number;
    /** Lowest value the control can emit. */
    minimumValue?: number;
    /** Highest value the control can emit. */
    maximumValue?: number;
    /** Inline style applied to the root control. */
    customStyle?: React.CSSProperties;
};
declare const IntegerControl: ({ onChange, defaultValue, minimumValue, maximumValue, customStyle, }: IntegerControlProps) => React.JSX.Element;
export default IntegerControl;
