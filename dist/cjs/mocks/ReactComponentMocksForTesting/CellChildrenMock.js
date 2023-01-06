"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const CellChildrenMock = ({ date, listElementId }) => {
    return (react_1.default.createElement("div", null,
        date,
        react_1.default.createElement("br", null),
        listElementId));
};
exports.default = CellChildrenMock;
//# sourceMappingURL=CellChildrenMock.js.map