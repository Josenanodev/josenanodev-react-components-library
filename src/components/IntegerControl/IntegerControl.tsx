import React, { useState } from "react";
import styles from "./IntegerControl.module.scss";

//icons
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";

type IntegerControlProps = {
  /** Called with the clamped value after the user changes it. */
  onChange: (value: number) => void;
  /** Initial value and visual baseline for the default state. */
  defaultValue?: number;
  /** Lowest value the control can emit. */
  minimumValue?: number;
  /** Highest value the control can emit. */
  maximumValue?: number;
  /** Inline style applied to the root control. */
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
    if ((minimumValue || minimumValue === 0) && value < minimumValue) {
      valueClone = minimumValue;
    } else if ((maximumValue || maximumValue === 0) && value > maximumValue) {
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
