import React from "react";
import "./Cell.css";
const Cell = ({ date, listElementId, width, heigth, ReactCellChildren }) => {
    return (React.createElement("div", { className: "cell", style: { width: width, height: heigth } },
        React.createElement(ReactCellChildren, { date: date, listElementId: listElementId })));
};
export default React.memo(Cell);
