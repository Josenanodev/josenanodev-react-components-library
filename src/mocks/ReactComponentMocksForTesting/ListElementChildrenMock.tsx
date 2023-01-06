import React from "react";
import { ListElementChildrenPropsType } from "../../components/Multicalendar/types";

const ListElementChildrenMock = ({ listElementId }: ListElementChildrenPropsType) => {
  return <div>{listElementId}</div>;
};

export default ListElementChildrenMock;
