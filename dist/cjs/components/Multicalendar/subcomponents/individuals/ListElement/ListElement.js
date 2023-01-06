"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./ListElement.css");
const ListElement = ({ listElementId, ReactListElementChildren, height, }) => {
    return (react_1.default.createElement("div", { className: "list-element", style: {
            height: height,
        } },
        react_1.default.createElement(ReactListElementChildren, { listElementId: listElementId })));
};
exports.default = react_1.default.memo(ListElement);
