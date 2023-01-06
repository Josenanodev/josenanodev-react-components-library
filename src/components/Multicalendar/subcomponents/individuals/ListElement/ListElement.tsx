import React from "react"
import "./ListElement.css";

//Types
import { ListElementPropsType } from "./types";

const ListElement = ({
  listElementId,
  ReactListElementChildren,
  height,
}: ListElementPropsType) => {
  return (
    <div
      className="list-element"
      style={{
        height: height,
      }}
    >
      <ReactListElementChildren listElementId={listElementId} />
    </div>
  );
};

export default React.memo(ListElement);
