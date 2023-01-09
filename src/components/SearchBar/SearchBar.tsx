import React, { useState, useEffect } from "react";
import "./SearchBar.css";

//Icons
import { BsSearch, BsSliders } from "react-icons/bs";

//Types
import { SearchBarPropsType } from "./types";

const SearchBar = ({
  actionOnEnter = () => {},
  actionOnAlteringText = () => {},
  actionOnEmptyText = () => {},
  optionsButtonVisible,
  actionOnClickOptionsButton = () => {},
  placeholder = "",
  initialValue = "",
  disabled = false,
}: SearchBarPropsType) => {
  //Estados
  const [searchValue, setSearchValue] = useState<string>(initialValue);
  const [cachedSearchValue, setCachedSearchValue] = useState<string>(initialValue);
  //useEffect
  useEffect(() => {
    if (searchValue !== cachedSearchValue) {
      if (searchValue !== "") {
        actionOnAlteringText(searchValue);
      } else if (searchValue === "") {
        actionOnEmptyText();
      }
      setCachedSearchValue(searchValue);
    }
  }, [searchValue, cachedSearchValue, actionOnAlteringText, actionOnEmptyText]);
  return (
    <form
      className="search-bar"
      onSubmit={(e) => {
        e.preventDefault();
        let searchElement = (e.target as HTMLFormElement).elements.namedItem(
          "search-bar-name"
        ) as HTMLInputElement;
        if (searchElement !== null) actionOnEnter(searchElement.value);
      }}
    >
      <div className="div-search-bar">
        <div>
          <BsSearch />
        </div>
        <input
          name="search-bar-name"
          type="text"
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => {
            setSearchValue(e.target.value);
            if (e.target.value) actionOnAlteringText();
            if (!e.target.value) actionOnEmptyText();
          }}
          value={searchValue}
        />
        {optionsButtonVisible && (
          <div
            className={
              disabled
                ? "icono-search-bar-opciones icono-search-bar-opciones-disabled"
                : "icono-search-bar-opciones"
            }
            onClick={() => actionOnClickOptionsButton()}
          >
            <BsSliders />
          </div>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
