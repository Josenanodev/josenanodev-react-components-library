import React from "react";
import { ReactListElementChildren } from "../../../types";
type ListElementsColumnProps = {
    ReactListElementChildren: ReactListElementChildren;
    listHeight: number | string;
    yOffset: number;
    elementsHeight: number;
    idsArray: string[] | number[];
};
declare const ListElementsColumn: ({ ReactListElementChildren, listHeight, yOffset, elementsHeight, idsArray, }: ListElementsColumnProps) => React.JSX.Element;
export default ListElementsColumn;
