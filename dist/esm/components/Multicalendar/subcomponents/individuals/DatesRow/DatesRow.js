import React from "react";
import "./DatesRow.css";
const DatesRow = ({ visibleDates, width, height, cellsWidth, cellsHeight, offset, language, }) => {
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
    return (React.createElement("div", { className: "dates-row", style: {
            width: width,
            height: height,
            paddingLeft: offset * cellsWidth,
        } }, visibleDates.length > 0 &&
        visibleDates.map((dateObject) => (React.createElement("div", { className: "date-cell", style: {
                width: cellsWidth,
                height: cellsHeight,
            } },
            React.createElement("div", { className: dateObject.getDate() === new Date().getDate() &&
                    dateObject.getMonth() === new Date().getMonth() &&
                    dateObject.getFullYear() === new Date().getFullYear()
                    ? "div-date-cell-today"
                    : "div-date-cell" },
                React.createElement("div", null,
                    React.createElement("p", null, weekdaysAbreviations[dateObject.getDay()]),
                    React.createElement("p", null, dateObject.getDate()))),
            dateObject.getDate() === 1 && (React.createElement("div", { className: "month-start" },
                React.createElement("p", null,
                    monthsNames[dateObject.getMonth()],
                    " ",
                    dateObject.getFullYear()))))))));
};
export default DatesRow;
//# sourceMappingURL=DatesRow.js.map