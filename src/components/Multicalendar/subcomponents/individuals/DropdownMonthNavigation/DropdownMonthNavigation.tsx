import React from "react";
import styles from "./DropdownMonthNavigation.module.scss";

//Utils
import { jsToSqlDate } from "josenanodev-generic-utils";

type DropdownMonthNavigationProps = {
  visibleMonth: number;
  visibleYear: number;
  onChangeAction: Function;
  options: JSX.Element[];
};

const DropdownMonthNavigation = ({
  visibleMonth,
  visibleYear,
  onChangeAction,
  options,
}: DropdownMonthNavigationProps) => {
  return (
    <select
      title="Select a month"
      className={styles["dropdown-month-navigation"]}
      value={jsToSqlDate(new Date(visibleYear, visibleMonth, 1, 12, 0, 0, 0))}
      onChange={(e) => onChangeAction(e.target.value)}
    >
      {options}
    </select>
  );
};

export default DropdownMonthNavigation;
