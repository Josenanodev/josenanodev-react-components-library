import React, { useState, useEffect } from "react";
import "./MultipleJoinedButtonsBar.css";
import { MultipleJoinedButtonsBarPropsType } from "./types";

const MultipleJoinedButtonsBar = ({
  options,
  onSelectOption,
  initialSelectedValue,
  externalSelectedValue,
}: MultipleJoinedButtonsBarPropsType) => {
  //States
  const [selectedValue, setSelectedValue] =
    useState<string | undefined>(initialSelectedValue);
  //Effects
  useEffect(() => {
    if (
      externalSelectedValue &&
      options.map((option) => option._id).includes(externalSelectedValue)
    ) {
      setSelectedValue(externalSelectedValue);
    }
  }, [externalSelectedValue]);
  return (
    <div className="multiple-joined-buttons-bar">
      {options.map((option, index) => (
        <button
          key={option._id}
          className={
            (selectedValue === option._id ? "selected" : "") +
            (index === 0
              ? " left-side-button"
              : index === options.length - 1
              ? " right-side-button"
              : "")
          }
          onClick={() => {
            setSelectedValue(option._id);
            onSelectOption(option._id);
          }}
        >
          {option.visibleValue}
        </button>
      ))}
    </div>
  );
};

export default MultipleJoinedButtonsBar;
