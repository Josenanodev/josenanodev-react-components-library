import React from "react";
import "./ListElementsColumn.css";
import ListElement from "../../individuals/ListElement/ListElement";
const ListElementsColumn = ({ ReactListElementChildren, listHeight, yOffset, elementsHeight, idsArray, }) => {
    return (React.createElement("div", { className: "destinies-column", style: {
            height: listHeight,
            paddingTop: yOffset * elementsHeight,
        } }, idsArray.map((listElementId) => (React.createElement(ListElement, { key: listElementId, height: elementsHeight, listElementId: listElementId, ReactListElementChildren: ReactListElementChildren })))));
};
export default ListElementsColumn;
//# sourceMappingURL=ListElementsColumn.js.map