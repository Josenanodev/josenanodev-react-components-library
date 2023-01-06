import React from "react"
import "./Cell.css";

//Types
import { CellPropsType } from "./types";

const Cell = ({ date, listElementId, width, heigth, ReactCellChildren }: CellPropsType) => {
  return (
    <div className="cell" style={{ width: width, height: heigth }}>
      <ReactCellChildren date={date} listElementId={listElementId} />
    </div>
  );
};

export default React.memo(Cell);
