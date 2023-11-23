import React from "react";
import { ReactCellChildren } from "../../../types";
type CellProps = {
    date: string;
    /**Date in SQL format, i.e. 1993-03-29 */
    listElementId: string | number;
    width: number;
    heigth: number;
    ReactCellChildren: ReactCellChildren;
};
declare const _default: React.MemoExoticComponent<({ date, listElementId, width, heigth, ReactCellChildren }: CellProps) => React.JSX.Element>;
export default _default;
