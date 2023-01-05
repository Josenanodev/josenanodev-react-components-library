import "./DatesRow.css";

//Redux
import { useSelector } from "react-redux";
import { languageSelector } from "../../../redux/state/features/AppSettings/AppSettingsReducer";

//Types
import { DatesRowPropsType } from "./types";

const DatesRow = ({
  visibleDates,
  width,
  height,
  cellsWidth,
  cellsHeight,
  offset,
}: DatesRowPropsType) => {
  //Redux
  const language = useSelector(languageSelector);
  //Variables
  const weekdaysAbreviations = [
    language["sunday"].slice(0, 2),
    language["monday"].slice(0, 2),
    language["tuesday"].slice(0, 2),
    language["wednesday"].slice(0, 2),
    language["thursday"].slice(0, 2),
    language["friday"].slice(0, 2),
    language["saturday"].slice(0, 2),
  ];
  const monthsNames = [
    language["january"],
    language["february"],
    language["march"],
    language["april"],
    language["may"],
    language["june"],
    language["july"],
    language["august"],
    language["september"],
    language["october"],
    language["november"],
    language["december"],
  ];
  return (
    <div
      className="dates-row"
      style={{
        width: width,
        height: height,
        paddingLeft: offset * cellsWidth,
      }}
    >
      {visibleDates.length > 0 &&
        visibleDates.map((dateObject) => (
          <div
            className="date-cell"
            style={{
              width: cellsWidth,
              height: cellsHeight,
            }}
          >
            <div
              className={
                dateObject.getDate() === new Date().getDate() &&
                dateObject.getMonth() === new Date().getMonth() &&
                dateObject.getFullYear() === new Date().getFullYear()
                  ? "div-date-cell-today"
                  : "div-date-cell"
              }
            >
              <div>
                <p>{weekdaysAbreviations[dateObject.getDay()]}</p>
                <p>{dateObject.getDate()}</p>
              </div>
            </div>
            {dateObject.getDate() === 1 && (
              <div className="month-start">
                <p>
                  {monthsNames[dateObject.getMonth()]} {dateObject.getFullYear()}
                </p>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default DatesRow;
