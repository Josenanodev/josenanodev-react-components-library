import React from "react";
import { CellChildrenProps } from "../../components/Multicalendar/types";

const CellChildrenMock = ({ date, listElementId }: CellChildrenProps) => {
  return (
    <div style={{userSelect: "none"}}>
      {date}
      <br />
      {listElementId}
    </div>
  );
};

export default CellChildrenMock;
