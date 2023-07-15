import React from "react"
import "./DropdownMonthNavigation.css";

//Utils
import jsToSqlDate from "../../../../../utils/jsToSqlDate";

//Types
import { DropdownMonthNavigationPropsType } from "./types";
const DropdownMonthNavigation = ({
  visibleMonth,
  visibleYear,
  onChangeAction,
  options,
}: DropdownMonthNavigationPropsType) => {
  return (
    <select
      className="dropdown-month-navigation"
      value={jsToSqlDate(
        new Date(
          visibleYear,
          visibleMonth,
          1,
          12,
          0,
          0,
          0
        )
      )}
      onChange={(e) => onChangeAction(e.target.value)}
    >
      {options}
    </select>
  );
};

export default DropdownMonthNavigation;
