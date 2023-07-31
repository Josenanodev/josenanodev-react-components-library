import React from "react";
type IntegerControlProps = {
    onChange: (value: number) => void;
    defaultValue?: number;
    minimumValue?: number;
    maximumValue?: number;
    customStyle?: React.CSSProperties;
};
declare const IntegerControl: ({ onChange, defaultValue, minimumValue, maximumValue, customStyle, }: IntegerControlProps) => React.JSX.Element;
export default IntegerControl;
