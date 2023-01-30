import React, { useState, useRef, useEffect, Fragment } from "react";
import * as ownFunctions from "./SliderOwnFunctions";
import "./Slider.css";

//iconos
import { SliderPropsType } from "./types";

const Slider = ({
  minimumValue,
  maximumValue,
  onChange,
  initialValue = 0,
  value,
  showValueInsideButton,
  editableValueInsideButton,
  height = 40,
  width = 300,
  sufix,
  prefix,
}: SliderPropsType) => {
  //Refs
  const sliderRef = useRef<HTMLDivElement | null>(null);
  //Estados
  const [position, setPosition] = useState(
    initialValue !== undefined
      ? ownFunctions.definePostionByValue(initialValue, width, maximumValue, minimumValue)
      : width / 2
  );
  const [visibleValue, setVisibleValue] = useState<number>(initialValue);
  const [temporalVisibleValue, setTemporalVisibleValue] =
    useState<number | undefined>(undefined);
  const [cancelTransition, setCancelTransition] = useState<boolean>(false);
  useEffect(() => {
    if (value !== undefined) {
      setVisibleValue(value);
      setPosition(
        ownFunctions.definePostionByValue(value, width, maximumValue, minimumValue)
      );
    }
  }, [value, width, maximumValue, minimumValue]);
  return (
    <div
      ref={sliderRef}
      style={{ width: width, height: height }}
      className="slider"
      onMouseDown={(event1) => {
        var nuevovisibleValue: number;
        if (sliderRef.current !== null && sliderRef.current !== undefined) {
          setCancelTransition(false);
          const newPosition =
            event1.clientX - sliderRef.current.getBoundingClientRect().x;
          setPosition(newPosition);
          nuevovisibleValue = ownFunctions.defineVisibleValue(
            newPosition,
            width,
            maximumValue,
            minimumValue
          );
          setVisibleValue(nuevovisibleValue);
        }
        function repositioning(event2: MouseEvent) {
          setCancelTransition(true);
          if (sliderRef.current !== null && sliderRef.current !== undefined) {
            setTemporalVisibleValue(undefined);
            let newPosition =
              event2.clientX - sliderRef.current.getBoundingClientRect().x;
            if (newPosition < 0) newPosition = 0;
            if (newPosition > width) newPosition = width;
            setPosition(newPosition);
            nuevovisibleValue = ownFunctions.defineVisibleValue(
              newPosition,
              width,
              maximumValue,
              minimumValue
            );
            setVisibleValue(nuevovisibleValue);
          }
        }
        document.addEventListener(
          "mousemove",
          repositioning
        );
        function removeEventListeners() {
          document.removeEventListener(
            "mousemove",
            repositioning
          );
          document.removeEventListener(
            "mouseup",
            removeEventListeners
          );
          setCancelTransition(false);
          onChange(nuevovisibleValue);
        }
        document.addEventListener(
          "mouseup",
          removeEventListeners
        );
      }}
      onTouchStart={(event1) => {
        var nuevovisibleValue: number;
        if (sliderRef.current !== null && sliderRef.current !== undefined) {
          setCancelTransition(false);
          const newPosition =
            event1.touches[0].clientX - sliderRef.current.getBoundingClientRect().x;
          setPosition(newPosition);
          nuevovisibleValue = ownFunctions.defineVisibleValue(
            newPosition,
            width,
            maximumValue,
            minimumValue
          );
          setVisibleValue(nuevovisibleValue);
        }
        function repositioning(event2: TouchEvent) {
          setCancelTransition(true);
          if (sliderRef.current !== null && sliderRef.current !== undefined) {
            setTemporalVisibleValue(undefined);
            let newPosition =
              event2.touches[0].clientX - sliderRef.current.getBoundingClientRect().x;
            if (newPosition < 0) newPosition = 0;
            if (newPosition > width) newPosition = width;
            setPosition(newPosition);
            nuevovisibleValue = ownFunctions.defineVisibleValue(
              newPosition,
              width,
              maximumValue,
              minimumValue
            );
            setVisibleValue(nuevovisibleValue);
          }
        }
        document.addEventListener(
          "touchmove",
          repositioning
        );
        function removeEventListeners() {
          document.removeEventListener(
            "touchmove",
            repositioning
          );
          document.removeEventListener(
            "touchend",
            removeEventListeners
          );
          setCancelTransition(false);
          onChange(nuevovisibleValue);
        }
        document.addEventListener(
          "touchend",
          removeEventListeners
        );
      }}
    >
      <div
        style={{
          width: position,
          height: height * 0.8,
          borderTopLeftRadius: (height * 0.8) / 2,
          borderBottomLeftRadius: (height * 0.8) / 2,
          marginRight: -height / 2,
          transition: cancelTransition ? "none" : "all 0.3s",
        }}
        className="left-fill"
      ></div>
      <div style={{ width: height, height: height }} className="sphere">
        {showValueInsideButton && (
          <Fragment>
            {prefix !== undefined && <p>{prefix}</p>}
            <input
              disabled={!editableValueInsideButton}
              type="number"
              min={minimumValue}
              max={maximumValue}
              value={
                temporalVisibleValue !== undefined ? temporalVisibleValue : visibleValue
              }
              onChange={(event) => {
                setTemporalVisibleValue(Number(event.target.value));
              }}
              onFocus={() => {
                setTemporalVisibleValue(visibleValue);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" && temporalVisibleValue !== undefined) {
                  let nuevovalue = temporalVisibleValue;
                  if (nuevovalue < minimumValue) nuevovalue = minimumValue;
                  if (nuevovalue > maximumValue) nuevovalue = maximumValue;
                  const newPosition = ownFunctions.definePostionByValue(
                    nuevovalue,
                    width,
                    maximumValue,
                    minimumValue
                  );
                  setPosition(newPosition);
                  const nuevovisibleValue = ownFunctions.defineVisibleValue(
                    newPosition,
                    width,
                    maximumValue,
                    minimumValue
                  );
                  setVisibleValue(nuevovisibleValue);
                  onChange(nuevovisibleValue);
                  setTemporalVisibleValue(undefined);
                }
                if (event.key === "Escape") {
                  setPosition(
                    ownFunctions.definePostionByValue(
                      visibleValue,
                      width,
                      maximumValue,
                      minimumValue
                    )
                  );
                  setTemporalVisibleValue(undefined);
                }
              }}
              onBlur={() => {
                if (temporalVisibleValue !== undefined) {
                  let nuevovalue = temporalVisibleValue;
                  if (nuevovalue < minimumValue) nuevovalue = minimumValue;
                  if (nuevovalue > maximumValue) nuevovalue = maximumValue;
                  const newPosition = ownFunctions.definePostionByValue(
                    nuevovalue,
                    width,
                    maximumValue,
                    minimumValue
                  );
                  setPosition(newPosition);
                  const nuevovisibleValue = ownFunctions.defineVisibleValue(
                    newPosition,
                    width,
                    maximumValue,
                    minimumValue
                  );
                  setVisibleValue(nuevovisibleValue);
                  onChange(nuevovisibleValue);
                  setTemporalVisibleValue(undefined);
                }
              }}
            />
            {sufix !== undefined && <p>{sufix}</p>}
          </Fragment>
        )}
      </div>
      <div
        style={{
          width: width - position,
          height: height * 0.8,
          borderTopRightRadius: (height * 0.8) / 2,
          borderBottomRightRadius: (height * 0.8) / 2,
          marginLeft: -height / 2,
          transition: cancelTransition ? "none" : "all 0.3s",
        }}
        className="right-fill"
      ></div>
    </div>
  );
};

export default Slider;
