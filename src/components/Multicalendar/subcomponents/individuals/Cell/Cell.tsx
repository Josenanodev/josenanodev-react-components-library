import React from "react";
import styles from "./Cell.module.scss";

//Types
import { ReactCellChildren } from "../../../types";

type CellProps = {
  date: string;
  /**Date in SQL format, i.e. 1993-03-29 */
  listElementId: string | number;
  width: number;
  heigth: number;
  ReactCellChildren: ReactCellChildren;
}

const Cell = ({ date, listElementId, width, heigth, ReactCellChildren }: CellProps) => {
  return (
    <div className={styles["cell"]} style={{ width: width, height: heigth }}>
      <ReactCellChildren date={date} listElementId={listElementId} />
    </div>
  );
};

export default React.memo(Cell);
