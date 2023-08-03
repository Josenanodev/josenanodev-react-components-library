import React, { useEffect, useState, useRef } from "react";
import "./ProgressBar.css";

//Types
import { ProgressBarPropsType } from "./types";

const ProgressBar = ({
  totalSize,
  currentValue,
  color = "var(--secondary-color)",
}: ProgressBarPropsType) => {
  //useRef
  const fillableBodyRef = useRef<HTMLDivElement | null>(null);
  //useStates
  const [currentPercentage, setCurrentPercentage] = useState<number>(
    totalSize !== 0 ? currentValue / totalSize : 0
  );
  const [barWidth, setBarWidth] = useState<number>(0);
  //useEffects
  useEffect(() => {
    if (totalSize !== 0) {
      setCurrentPercentage(currentValue / totalSize);
    } else {
      setCurrentPercentage(0);
    }
  }, [totalSize, currentValue]);
  useEffect(() => {
    if (fillableBodyRef.current !== null) {
      setBarWidth(fillableBodyRef.current.clientWidth);
    }
  }, [fillableBodyRef.current?.clientHeight]);
  return (
    <div className="trc-progress-bar">
      <div ref={fillableBodyRef} className="fillable-body">
        <div
          className="filler"
          style={{ width: barWidth * currentPercentage, backgroundColor: color }}
        ></div>
        <p>{(currentPercentage * 100).toFixed(0)}%</p>
      </div>
    </div>
  );
};

export default ProgressBar;
