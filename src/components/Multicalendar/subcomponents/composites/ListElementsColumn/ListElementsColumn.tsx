import React from "react"
import "./ListElementsColumn.css";

//Types
import { ListElementsColumnPropsType } from "./types";
import ListElement from "../../individuals/ListElement/ListElement";

const ListElementsColumn = ({
  ReactListElementChildren,
  listHeight,
  yOffset,
  elementsHeight,
  idsArray,
}: ListElementsColumnPropsType) => {
  return (
    <div
      className="list-element-column"
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
