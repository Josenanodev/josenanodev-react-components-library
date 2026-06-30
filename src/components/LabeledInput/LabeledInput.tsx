import React, { useState, useRef, useEffect } from "react";
import styles from "./LabeledInput.module.scss";
import {
  formatValueToCVV,
  formatValueToCreditCard,
  formatValueToExpirationDate,
  formatValueToPhone,
} from "./valueFormatters";

type SpecialType = "credit-card-number" | "expiration-date" | "cvv" | "phone";

type LabeledInputProps = {
  /** Floating label displayed over the input. */
  label: string;
  /** Initial uncontrolled input value. */
  defaultValue?: string;
  /** Called with the current formatted value whenever the user types. */
  onChange?: (value: string) => void;
  /** CSS width applied to the root wrapper. */
  width?: string;
  /** CSS height applied to the root wrapper. */
  height?: string;
  /** Background color applied to the wrapper and label gap. */
  backgroundColor?: string;
  /** Text alignment for the native input. */
  textAlign?: "left" | "center" | "right";
  /** Enables the error border and label color. */
  highlightError?: boolean;
  /** Error text displayed below the input when highlightError is true. */
  errorMessage?: string;
  /** Additional props forwarded to the native input element. */
  inputProps?: React.ComponentProps<"input">;
  /** Optional built-in formatter applied while typing. */
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
  const [shrinkLabel, setShrinkLabel] = useState(false);
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
      case "phone":
        value = formatValueToPhone(value);
      default:
        break;
    }
    event.target.value = value;
    onChange(value);
  };
  useEffect(() => {
    if (defaultValue) {
      setShrinkLabel(true);
    }
  }, [defaultValue]);
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
