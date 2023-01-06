"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./DropdownMonthNavigation.css");
//Utils
const jsToSqlDate_1 = __importDefault(require("../../../../../utils/jsToSqlDate"));
const DropdownMonthNavigation = ({ minimumVisibleDate, onChangeAction, options, }) => {
    return (react_1.default.createElement("select", { className: "dropdown-month-navigation", value: (0, jsToSqlDate_1.default)(new Date(minimumVisibleDate.getFullYear(), minimumVisibleDate.getMonth(), 1, 12, 0, 0, 0)), onChange: (e) => onChangeAction(e.target.value) }, options));
};
exports.default = DropdownMonthNavigation;
//# sourceMappingURL=DropdownMonthNavigation.js.map