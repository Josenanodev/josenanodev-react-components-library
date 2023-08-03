"use client";
import React, { useState } from "react";
import styles from "./IntegerControl.module.scss";

//icons
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";

type IntegerControlProps = {
  onChange: (value: number) => void;
  defaultValue?: number;
  minimumValue?: number;
  maximumValue?: number;
  customStyle?: React.CSSProperties;
};

const IntegerControl = ({
  onChange = () => {},
  defaultValue = 0,
  minimumValue,
  maximumValue,
  customStyle,
}: IntegerControlProps) => {
  const [currentValue, setCurrentValue] = useState(defaultValue);
  return (
    <div
      className={`${styles["integer-control"]} ${
        currentValue === defaultValue ? styles["default"] : ""
      }`}
      style={customStyle}
    >
      <button
        onClick={() => {
          setCurrentValue(currentValue - 1);
          onChange(currentValue - 1);
        }}
      >
        <AiFillMinusCircle />
      </button>
      <input
        onChange={(event) => {
          const numericValue = Number(event.target.value);
          setCurrentValue(numericValue);
          onChange(numericValue);
        }}
        value={currentValue}
        type="number"
        defaultValue={String(defaultValue)}
        min={String(minimumValue)}
        max={String(maximumValue)}
        style={{ width: currentValue.toString().length + 1 + "ch" }}
      />
      <button
        onClick={() => {
          setCurrentValue(currentValue + 1);
          onChange(currentValue + 1);
        }}
      >
        <AiFillPlusCircle />
      </button>
    </div>
  );
};

export default IntegerControl;
