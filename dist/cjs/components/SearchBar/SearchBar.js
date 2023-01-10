"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
require("./SearchBar.css");
//Icons
const bs_1 = require("react-icons/bs");
const SearchBar = ({ actionOnEnter = () => { }, actionOnAlteringText = () => { }, actionOnEmptyText = () => { }, optionsButtonVisible, actionOnClickOptionsButton = () => { }, placeholder = "", initialValue = "", disabled = false, }) => {
    //Estados
    const [searchValue, setSearchValue] = (0, react_1.useState)(initialValue);
    const [cachedSearchValue, setCachedSearchValue] = (0, react_1.useState)(initialValue);
    //useEffect
    (0, react_1.useEffect)(() => {
        if (searchValue !== cachedSearchValue) {
            if (searchValue !== "") {
                actionOnAlteringText(searchValue);
            }
            else if (searchValue === "") {
                actionOnEmptyText();
            }
            setCachedSearchValue(searchValue);
        }
    }, [searchValue, cachedSearchValue, actionOnAlteringText, actionOnEmptyText]);
    return (react_1.default.createElement("form", { className: "search-bar", onSubmit: (e) => {
            e.preventDefault();
            let searchElement = e.target.elements.namedItem("search-bar-name");
            if (searchElement !== null)
                actionOnEnter(searchElement.value);
        } },
        react_1.default.createElement("div", { className: "div-search-bar" },
            react_1.default.createElement("div", null,
                react_1.default.createElement(bs_1.BsSearch, null)),
            react_1.default.createElement("input", { name: "search-bar-name", type: "text", placeholder: placeholder, disabled: disabled, onChange: (e) => {
                    setSearchValue(e.target.value);
                    if (e.target.value)
                        actionOnAlteringText();
                    if (!e.target.value)
                        actionOnEmptyText();
                }, value: searchValue }),
            optionsButtonVisible && (react_1.default.createElement("div", { className: disabled
                    ? "icono-search-bar-opciones icono-search-bar-opciones-disabled"
                    : "icono-search-bar-opciones", onClick: () => actionOnClickOptionsButton() },
                react_1.default.createElement(bs_1.BsSliders, null))))));
};
exports.default = SearchBar;
