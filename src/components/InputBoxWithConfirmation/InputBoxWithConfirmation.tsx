import React, { useState, useRef } from "react";
import "./InputBoxWithConfirmation.css";

//Hooks
import useOutsideClick from "../../hooks/useOutsideClick";

//Icons
import { BsCheckLg, BsPencil } from "react-icons/bs";

//Types
import { InputBoxWithConfirmationPropsType } from "./types";

const InputBoxWithConfirmation = ({
  onConfirmAction,
  inputType = "text",
  aditionalClass,
  defaultValue,
}: InputBoxWithConfirmationPropsType) => {
  //Refs
  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  //States
  const [cachedValue, setCachedValue] = useState<string | undefined>(
    String(defaultValue)
  );
  const [currentValue, setCurrentValue] = useState<string | undefined>(
    String(defaultValue)
  );
  const [focused, setFocused] = useState<boolean>(false);
  //Hooks
  useOutsideClick(containerRef, () => {
    setCurrentValue(cachedValue);
    setFocused(false);
  });
  //Variables
  return (
    <div
      ref={containerRef}
      className={`div-wrapper-input-box-with-confirmation ${focused ? "focused" : ""} ${
        aditionalClass ? aditionalClass : ""
      }`}
    >
      <input
        ref={inputRef}
        className="input-box-with-confirmation"
        type={inputType}
        style={{ width: `${(currentValue?.length ? currentValue.length : 0) + 7}ch` }}
        value={focused ? currentValue : cachedValue}
        onChange={(event) => setCurrentValue(event.target.value)}
        onFocus={(event) => {
          setCachedValue(event.target.value);
          setCurrentValue(event.target.value);
          setFocused(true);
        }}
      />
      {focused ? (
        <button
          className="button-for-input-box-with-confirmation"
          onClick={() => {
            if (currentValue) {
              onConfirmAction(currentValue);
              setCachedValue(currentValue);
            }
            setFocused(false);
          }}
        >
          <BsCheckLg />
        </button>
      ) : (
        <button
          className="button-for-input-box-with-confirmation"
          onClick={() => {
            if (inputRef.current) {
              inputRef.current.focus();
            }
          }}
        >
          <BsPencil />
        </button>
      )}
    </div>
  );
};

export default InputBoxWithConfirmation;
