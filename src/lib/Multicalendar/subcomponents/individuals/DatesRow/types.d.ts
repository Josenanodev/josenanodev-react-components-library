import { languageType } from "../../../../assets/languages/types";

export interface DatesRowPropsType {
    visibleDates: Date[];
    width: number;
    height: number;
    cellsWidth: number;
    cellsHeight: number;
    offset: number;
    language: languageType;
  }