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
  const handleValueChange = (value: number) => {
    let valueClone = value;
    if (minimumValue && value < minimumValue) {
      valueClone = minimumValue;
    } else if (maximumValue && value > maximumValue) {
      valueClone = maximumValue;
    }
    setCurrentValue(valueClone);
    onChange(valueClone);
  };
  return (
    <div
      className={`${styles["integer-control"]} ${
        currentValue === defaultValue ? styles["default"] : ""
      }`}
      style={customStyle}
    >
      <button onClick={() => handleValueChange(currentValue - 1)}>
        <AiFillMinusCircle />
      </button>
      <input
        onChange={(event) => handleValueChange(Number(event.target.value))}
        value={currentValue}
        type="number"
        min={String(minimumValue)}
        max={String(maximumValue)}
        style={{ width: currentValue.toString().length + 1 + "ch" }}
      />
      <button onClick={() => handleValueChange(currentValue + 1)}>
        <AiFillPlusCircle />
      </button>
    </div>
  );
};

export default IntegerControl;
