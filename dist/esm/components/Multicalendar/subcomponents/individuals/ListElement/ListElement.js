import React from "react";
import "./ListElement.css";
const ListElement = ({ listElementId, ReactListElementChildren, height, }) => {
    return (React.createElement("div", { className: "list-element", style: {
            height: height,
        } },
        React.createElement(ReactListElementChildren, { listElementId: listElementId })));
};
export default React.memo(ListElement);
