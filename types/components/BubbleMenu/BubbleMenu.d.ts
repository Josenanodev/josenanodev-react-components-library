import React from "react";
type BubbleMenuProps = {
    /** Menu actions displayed when the floating menu is open. */
    options: {
        /** Icon rendered above the option text. */
        icon: React.ReactNode;
        /** Label rendered inside the circular option button. */
        text: string;
        /** Controls whether this option is shown. */
        visible: boolean;
        /** Called after the menu close animation delay. */
        optionCallback: () => void;
    }[];
    /** Language used for the floating menu toggle label. */
    language?: "en" | "es";
};
declare const BubbleMenu: ({ options, language }: BubbleMenuProps) => React.JSX.Element;
export default BubbleMenu;
