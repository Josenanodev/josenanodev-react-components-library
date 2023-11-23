import React from "react";
import { ListElementChildrenProps } from "../../components/Multicalendar/types";

const ListElementChildrenMock = ({ listElementId }: ListElementChildrenProps) => {
  return <div>{listElementId}</div>;
};

export default ListElementChildrenMock;
