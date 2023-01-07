import React from "react";
import { CellChildrenPropsType } from "../../components/Multicalendar/types";

const CellChildrenMock = ({ date, listElementId }: CellChildrenPropsType) => {
  return (
    <div style={{userSelect: "none"}}>
      {date}
      <br />
      {listElementId}
    </div>
  );
};

export default CellChildrenMock;
