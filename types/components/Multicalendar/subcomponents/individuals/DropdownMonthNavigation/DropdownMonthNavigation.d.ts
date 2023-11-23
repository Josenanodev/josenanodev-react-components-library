import React from "react";
type DropdownMonthNavigationProps = {
    visibleMonth: number;
    visibleYear: number;
    onChangeAction: Function;
    options: JSX.Element[];
};
declare const DropdownMonthNavigation: ({ visibleMonth, visibleYear, onChangeAction, options, }: DropdownMonthNavigationProps) => React.JSX.Element;
export default DropdownMonthNavigation;
