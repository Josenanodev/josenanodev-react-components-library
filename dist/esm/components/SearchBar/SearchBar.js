import React, { useState, useEffect } from "react";
import "./SearchBar.css";
//Icons
import { BsSearch, BsSliders } from "react-icons/bs";
const SearchBar = ({ actionOnEnter = () => { }, actionOnAlteringText = () => { }, actionOnEmptyText = () => { }, optionsButtonVisible, actionOnClickOptionsButton = () => { }, placeholder = "", initialValue = "", disabled = false, }) => {
    //Estados
    const [searchValue, setSearchValue] = useState(initialValue);
    const [cachedSearchValue, setCachedSearchValue] = useState(initialValue);
    //useEffect
    useEffect(() => {
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
    return (React.createElement("form", { className: "search-bar", onSubmit: (e) => {
            e.preventDefault();
            let searchElement = e.target.elements.namedItem("search-bar-name");
            if (searchElement !== null)
                actionOnEnter(searchElement.value);
        } },
        React.createElement("div", { className: "div-search-bar" },
            React.createElement("div", null,
                React.createElement(BsSearch, null)),
            React.createElement("input", { name: "search-bar-name", type: "text", placeholder: placeholder, disabled: disabled, onChange: (e) => {
                    setSearchValue(e.target.value);
                    if (e.target.value)
                        actionOnAlteringText();
                    if (!e.target.value)
                        actionOnEmptyText();
                }, value: searchValue }),
            optionsButtonVisible && (React.createElement("div", { className: disabled
                    ? "icono-search-bar-opciones icono-search-bar-opciones-disabled"
                    : "icono-search-bar-opciones", onClick: () => actionOnClickOptionsButton() },
                React.createElement(BsSliders, null))))));
};
export default SearchBar;
