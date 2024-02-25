import React, { useState, useRef } from "react";
import styles from "./LabeledInput.module.scss";
import {
  formatValueToCVV,
  formatValueToCreditCard,
  formatValueToExpirationDate,
} from "./valueFormatters";

type SpecialType = "credit-card-number" | "expiration-date" | "cvv";

type LabeledInputProps = {
  label: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  width?: string;
  height?: string;
  backgroundColor?: string;
  textAlign?: "left" | "center" | "right";
  highlightError?: boolean;
  errorMessage?: string;
  inputProps?: React.ComponentProps<"input">;
  specialType?: SpecialType;
};

const LabeledInput = ({
  label,
  defaultValue,
  onChange = () => {},
  width = "328px",
  height = "66px",
  backgroundColor = "white",
  textAlign = "left",
  highlightError = false,
  errorMessage,
  inputProps,
  specialType,
}: LabeledInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [shrinkLabel, setShrinkLabel] = useState(defaultValue ? true : false);
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    switch (specialType) {
      case "credit-card-number":
        value = formatValueToCreditCard(value);
        break;
      case "expiration-date":
        value = formatValueToExpirationDate(value);
        break;
      case "cvv":
        value = formatValueToCVV(value);
        break;
      default:
        break;
    }
    event.target.value = value;
    onChange(value);
  };
  return (
    <div
      className={styles["labeled-input"]}
      data-has-error={highlightError}
      onClick={() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }}
      style={{ width, height, backgroundColor }}
    >
      <label data-is-shrinked={shrinkLabel} style={{ backgroundColor }}>
        {label}
      </label>
      <input
        ref={inputRef}
        {...inputProps}
        onFocus={() => setShrinkLabel(true)}
        onBlur={(event) => {
          if (!event.target.value) {
            setShrinkLabel(false);
          }
        }}
        defaultValue={defaultValue}
        onChange={onChangeHandler}
        style={{ textAlign }}
      />
      {highlightError && errorMessage && (
        <p className={styles["error-message"]}>{errorMessage}</p>
      )}
    </div>
  );
};

export default LabeledInput;
