import React from "react";
const CellChildrenMock = ({ date, listElementId }) => {
    return (React.createElement("div", { style: { userSelect: "none" } },
        date,
        React.createElement("br", null),
        listElementId));
};
export default CellChildrenMock;
