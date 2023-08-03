import React, { useState, useRef } from "react";
import styles from "./LabeledInput.module.scss";

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
}: LabeledInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [shrinkLabel, setShrinkLabel] = useState(defaultValue ? true : false);
  return (
    <div
      className={styles["labeled-input"] + (highlightError ? ` ${styles["error"]}` : "")}
      onClick={() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }}
      style={{ width, height, backgroundColor }}
    >
      <label className={shrinkLabel ? styles["focused"] : ""}>{label}</label>
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
        onChange={(event) => onChange(event.target.value)}
        style={{ textAlign }}
      />
      {highlightError && errorMessage && (
        <p className={styles["error-message"]}>{errorMessage}</p>
      )}
    </div>
  );
};

export default LabeledInput;
