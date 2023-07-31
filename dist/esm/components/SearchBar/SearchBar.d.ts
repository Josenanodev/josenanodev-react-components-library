import React from "react";
import "./SearchBar.css";
import { SearchBarPropsType } from "./types";
declare const SearchBar: ({ actionOnEnter, actionOnAlteringText, actionOnEmptyText, optionsButtonVisible, actionOnClickOptionsButton, placeholder, initialValue, disabled, }: SearchBarPropsType) => React.JSX.Element;
export default SearchBar;
