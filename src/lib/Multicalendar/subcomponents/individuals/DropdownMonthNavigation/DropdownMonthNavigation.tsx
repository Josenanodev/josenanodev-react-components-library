import "./DropdownMonthNavigation.css";

//Utils
import jsToSqlDate from "../../../../utils/jsToSqlDate";

//Types
import { DropdownMonthNavigationPropsType } from "./types";
const DropdownMonthNavigation = ({
  minimumVisibleDate,
  onChangeAction,
  options,
}: DropdownMonthNavigationPropsType) => {
  return (
    <select
      className="dropdown-month-navigation"
      value={jsToSqlDate(
        new Date(
          minimumVisibleDate.getFullYear(),
          minimumVisibleDate.getMonth(),
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
