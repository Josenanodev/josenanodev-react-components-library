import React from "react";
type DatesRowProps = {
    visibleDates: Date[];
    width: number;
    height: number;
    cellsWidth: number;
    cellsHeight: number;
    offset: number;
    language: "es_ES" | "en_EN";
};
declare const DatesRow: ({ visibleDates, width, height, cellsWidth, cellsHeight, offset, language, }: DatesRowProps) => React.JSX.Element;
export default DatesRow;
