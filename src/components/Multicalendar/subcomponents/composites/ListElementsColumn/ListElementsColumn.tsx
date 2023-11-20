import React from "react";
import styles from "./ListElementsColumn.module.scss";

//Components
import ListElement from "../../individuals/ListElement/ListElement";

//Types
import { ReactListElementChildren } from "../../../types";

type ListElementsColumnProps = {
  ReactListElementChildren: ReactListElementChildren;
  listHeight: number | string;
  yOffset: number;
  elementsHeight: number;
  idsArray: string[] | number[];
}

const ListElementsColumn = ({
  ReactListElementChildren,
  listHeight,
  yOffset,
  elementsHeight,
  idsArray,
}: ListElementsColumnProps) => {
  return (
    <div
      className={styles["list-element-column"]}
      style={{
        height: listHeight,
        paddingTop: yOffset * elementsHeight,
      }}
    >
      {idsArray.map((listElementId) => (
        <ListElement
          key={listElementId}
          height={elementsHeight}
          listElementId={listElementId}
          ReactListElementChildren={ReactListElementChildren}
        />
      ))}
    </div>
  );
};

export default ListElementsColumn;
