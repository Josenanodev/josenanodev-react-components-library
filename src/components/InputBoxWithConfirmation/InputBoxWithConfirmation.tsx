import React, { useState, useEffect, useRef, Fragment } from "react";
import styles from "./InputBoxWithConfirmation.module.scss";

//Hooks
import useOutsideClick from "../../hooks/useOutsideClick";

//Icons
import { BsCheckLg, BsPencil } from "react-icons/bs";

type InputBoxWithConfirmationPropsType = {
  /** Called with the committed value after confirmation, Enter, or blur. */
  onConfirmAction: (inputCurrentValue: string) => void;
  /** Native input type used by the inner input. */
  inputType?: "text" | "number";
  /** Minimum value passed to the native input and enforced for number inputs. */
  minimumValue?: HTMLInputElement["min"];
  /** Maximum value passed to the native input and enforced for number inputs. */
  maximumValue?: HTMLInputElement["max"];
  /** Maximum number of accepted characters. */
  maxLength?: HTMLInputElement["maxLength"];
  /** Placeholder shown while the input is empty. */
  placeholder?: HTMLInputElement["placeholder"];
  /** Inline styles applied to the outer clickable wrapper. */
  divWrapperCustomStyle?: React.CSSProperties;
  /** Inline styles applied to the inner input element. */
  inputBoxCustomStyle?: React.CSSProperties;
  /** Initial value shown before the user edits. */
  defaultValue?: string | number;
  /** Controlled value override. Pass null to clear the input. */
  overrideCurrentValue?: string | number | null;
  /** Shows explicit edit/confirm buttons instead of confirming directly on blur. */
  showConfirmationButton?: boolean;
  /** Disables editing and hides the confirmation controls. */
  disabled?: boolean;
};

const InputBoxWithConfirmation = ({
  onConfirmAction,
  inputType = "text",
  minimumValue = "",
  maximumValue = "",
  maxLength,
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
  const currentValueValidated = () => {
    if (!currentValue && currentValue !== "0" && currentValue !== "") {
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
    const currentValue = currentValueValidated();
    setCurrentValue(currentValue);
    if (currentValue) {
      onConfirmAction(currentValue);
      setCachedValue(currentValue);
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
      onClick={() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }}
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
        maxLength={maxLength}
        placeholder={placeholder}
        value={focused ? currentValue : cachedValue}
        onClick={(event) => {
          event.stopPropagation();
        }}
        onChange={(event) => {
          let value = event.target.value;
          if (maxLength && value.length > maxLength) {
            value = value.slice(0, maxLength);
          }
          setCurrentValue(value);
        }}
        onFocus={(event) => {
          setCachedValue(event.target.value);
          setCurrentValue(event.target.value);
          setFocused(true);
        }}
        onKeyDown={(event) => {
          if (
            event.key === "Enter" ||
            event.key === "NumpadEnter" ||
            event.key === "Tab"
          ) {
            onConfirmActionHandler();
            setFocused(false);
            if (inputRef.current) {
              inputRef.current.blur();
            }
          } else if (event.key === "Escape" || event.key === "Esc") {
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
              title="Confirm"
              type="button"
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
              title="Edit"
              type="button"
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
