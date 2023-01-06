import { ReactListElementChildrenType } from "../../../types";

export interface ListElementsColumnPropsType {
  ReactListElementChildren: ReactListElementChildrenType;
  listHeight: number | string;
  yOffset: number;
  elementsHeight: number;
  idsArray: string[] | number[];
}
