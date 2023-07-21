import React, { useState, useEffect, useRef, Fragment } from "react";
import styles from "./InputBoxWithConfirmation.module.scss";

//Hooks
import useOutsideClick from "../../hooks/useOutsideClick";

//Icons
import { BsCheckLg, BsPencil } from "react-icons/bs";

type InputBoxWithConfirmationPropsType = {
  onConfirmAction: (inputCurrentValue: string) => void;
  inputType?: "text" | "number";
  minimumValue?: HTMLInputElement["min"];
  maximumValue?: HTMLInputElement["max"];
  placeholder?: HTMLInputElement["placeholder"];
  divWrapperCustomStyle?: React.CSSProperties;
  inputBoxCustomStyle?: React.CSSProperties;
  defaultValue?: string | number;
  overrideCurrentValue?: string | number | null;
  showConfirmationButton?: boolean;
  disabled?: boolean;
};

const InputBoxWithConfirmation = ({
  onConfirmAction,
  inputType = "text",
  minimumValue = "",
  maximumValue = "",
  placeholder = "",
  divWrapperCustomStyle,
  inputBoxCustomStyle,
  defaultValue,
  overrideCurrentValue,
  showConfirmationButton,
  disabled,
}: InputBoxWithConfirmationPropsType) => {
  //Refs
  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  //States
  const [cachedValue, setCachedValue] = useState<string>(
    defaultValue !== undefined ? String(defaultValue) : ""
  );
  const [currentValue, setCurrentValue] = useState<string>(
    defaultValue !== undefined ? String(defaultValue) : ""
  );
  const [focused, setFocused] = useState<boolean>(false);
  //Functions
  const currentValueValueValidated = () => {
    if (!currentValue) {
      return cachedValue;
    }
    if (inputType === "number") {
      let numericValue: number = Number(currentValue);
      if (minimumValue !== "" && numericValue < Number(minimumValue)) {
        numericValue = Number(minimumValue);
      } else if (maximumValue !== "" && numericValue > Number(maximumValue)) {
        numericValue = Number(maximumValue);
      }
      return String(numericValue);
    } else {
      return currentValue;
    }
  };
  const onConfirmActionHandler = () => {
    setCurrentValue(currentValueValueValidated());
    if (currentValueValueValidated()) {
      onConfirmAction(currentValueValueValidated());
      setCachedValue(currentValueValueValidated());
    }
  };
  //Hooks
  useOutsideClick(containerRef, () => {
    if (focused) {
      if (showConfirmationButton) {
        setCurrentValue(cachedValue);
      } else {
        onConfirmActionHandler();
      }
      setFocused(false);
    }
  });
  //Effects
  useEffect(() => {
    if (overrideCurrentValue !== undefined) {
      setCurrentValue(String(overrideCurrentValue));
      setCachedValue(String(overrideCurrentValue));
    } else if (overrideCurrentValue === null) {
      setCurrentValue("");
      setCachedValue("");
    }
  }, [overrideCurrentValue]);
  return (
    <div
      ref={containerRef}
      style={divWrapperCustomStyle}
      className={`${styles["div-wrapper"]} ${focused ? styles["focused"] : ""}`}
    >
      <input
        ref={inputRef}
        disabled={disabled}
        className={styles["input-box-with-confirmation"]}
        type={inputType}
        style={{
          width: `${(currentValue?.length ? currentValue.length : 0) + 7}ch`,
          ...inputBoxCustomStyle,
        }}
        min={minimumValue}
        max={maximumValue}
        placeholder={placeholder}
        value={focused ? currentValue : cachedValue}
        onChange={(event) => {
          setCurrentValue(event.target.value);
        }}
        onFocus={(event) => {
          setCachedValue(event.target.value);
          setCurrentValue(event.target.value);
          setFocused(true);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            onConfirmActionHandler();
            setFocused(false);
            if (inputRef.current) {
              inputRef.current.blur();
            }
          } else if (event.key === "Tab") {
            onConfirmActionHandler();
            setFocused(false);
            if (inputRef.current) {
              inputRef.current.blur();
            }
          } else if (event.key === "Escape") {
            setCurrentValue(cachedValue);
            setFocused(false);
            if (inputRef.current) {
              inputRef.current.blur();
            }
          }
        }}
      />
      {!disabled && showConfirmationButton && (
        <Fragment>
          {focused ? (
            <button
              className={styles["button-for-input-box-with-confirmation"]}
              onClick={() => {
                onConfirmActionHandler();
                setFocused(false);
              }}
            >
              <BsCheckLg />
            </button>
          ) : (
            <button
              className={styles["button-for-input-box-with-confirmation"]}
              onClick={() => {
                if (inputRef.current) {
                  inputRef.current.focus();
                }
              }}
            >
              <BsPencil />
            </button>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default InputBoxWithConfirmation;
