import React from "react";
import { CellChildrenPropsType } from "../../Multicalendar/types";

const CellChildrenMock = ({ date, listElementId }: CellChildrenPropsType) => {
  return (
    <div>
      {date}
      <br />
      {listElementId}
    </div>
  );
};

export default CellChildrenMock;
