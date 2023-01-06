import React from "react";
import "./DropdownMonthNavigation.css";
//Utils
import jsToSqlDate from "../../../../../utils/jsToSqlDate";
const DropdownMonthNavigation = ({ minimumVisibleDate, onChangeAction, options, }) => {
    return (React.createElement("select", { className: "dropdown-month-navigation", value: jsToSqlDate(new Date(minimumVisibleDate.getFullYear(), minimumVisibleDate.getMonth(), 1, 12, 0, 0, 0)), onChange: (e) => onChangeAction(e.target.value) }, options));
};
export default DropdownMonthNavigation;
