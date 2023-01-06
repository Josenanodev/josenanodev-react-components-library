"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./ListElementsColumn.css");
const ListElement_1 = __importDefault(require("../../individuals/ListElement/ListElement"));
const ListElementsColumn = ({ ReactListElementChildren, listHeight, yOffset, elementsHeight, idsArray, }) => {
    return (react_1.default.createElement("div", { className: "destinies-column", style: {
            height: listHeight,
            paddingTop: yOffset * elementsHeight,
        } }, idsArray.map((listElementId) => (react_1.default.createElement(ListElement_1.default, { key: listElementId, height: elementsHeight, listElementId: listElementId, ReactListElementChildren: ReactListElementChildren })))));
};
exports.default = ListElementsColumn;
//# sourceMappingURL=ListElementsColumn.js.map