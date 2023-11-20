import React from "react"
import styles from "./ListElement.module.scss"

//Types
import { ReactListElementChildren } from "../../../types";

type ListElementProps= {
  listElementId: string | number;
  ReactListElementChildren: ReactListElementChildren;
  height: number;
}

const ListElement = ({
  listElementId,
  ReactListElementChildren,
  height,
}: ListElementProps) => {
  return (
    <div
      className={styles["list-element"]}
      style={{
        height: height,
      }}
    >
      <ReactListElementChildren listElementId={listElementId} />
    </div>
  );
};

export default React.memo(ListElement);
