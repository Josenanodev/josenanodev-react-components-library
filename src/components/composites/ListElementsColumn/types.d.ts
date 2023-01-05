import { DestinyType } from "../../../common/types";
import { ReactListElementChildrenType } from "../../../Multicalendar/types";

export interface ListElementsColumnPropsType {
  ReactListElementChildren: ReactListElementChildrenType;
  listHeight: number | string;
  yOffset: number;
  elementsHeight: number;
  idsArray: string[] | number[];
}
