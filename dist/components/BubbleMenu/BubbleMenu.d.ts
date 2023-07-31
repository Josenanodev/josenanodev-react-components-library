import React from "react";
type BubbleMenuProps = {
    options: {
        icon: JSX.Element;
        text: string;
        visible: boolean;
        optionCallback: () => void;
    }[];
    language?: "en" | "es";
};
declare const BubbleMenu: ({ options, language }: BubbleMenuProps) => React.JSX.Element;
export default BubbleMenu;
