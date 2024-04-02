import React, { useState, useEffect } from "react";
import styles from "./ScreenSteps.module.scss";

type Step = {
  component: React.ReactNode;
  innerText: string;
  outterText?: string;
};

type ScreenStepsProps = {
  steps: Step[];
  defaultStep?: number;
  onStepChange?: (step: number) => void;
  overrideStep?: number;
};

const ScreenSteps = ({
  steps,
  defaultStep = 0,
  onStepChange = () => {},
  overrideStep,
}: ScreenStepsProps) => {
  const [currentStep, setCurrentStep] = useState(defaultStep);
  const stepClassName = (index: number) => {
    let className = styles["step"];
    const isCompleted = index < currentStep;
    if (isCompleted) {
      className += ` ${styles["completed"]}`;
    }
    const isCurrent = index === currentStep;
    if (isCurrent) {
      className += ` ${styles["current"]}`;
    }
    return className;
  };
  const stepContentStyle = (): React.CSSProperties => {
    const translatePercentage = 100 / steps.length;
    return {
      width: `${steps.length * 100}%`,
      transform: `translateX(-${translatePercentage * currentStep}%)`,
    };
  };
  useEffect(() => {
    const isValidStep =
      overrideStep !== undefined &&
      overrideStep < steps.length &&
      overrideStep >= 0 &&
      overrideStep !== currentStep;
    if (isValidStep) setCurrentStep(overrideStep);
  }, [overrideStep]);
  return (
    <section className={styles["screen-steps"]}>
      <nav className={styles["steps"]}>
        {steps.map((step, index) => (
          <div
            key={step.innerText}
            className={stepClassName(index)}
            onClick={() => {
              setCurrentStep(index);
              onStepChange(index);
            }}
          >
            {step.innerText}
          </div>
        ))}
      </nav>
      <p className={styles["outer-text"]}>{steps[currentStep].outterText}</p>
      <div className={styles["frame"]}>
        <div className={styles["steps-content"]} style={stepContentStyle()}>
          {steps.map((step) => (
            <div
              key={step.innerText}
              className={styles["step-component"]}
              style={{ width: `${100 / steps.length}%` }}
            >
              {step.component}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScreenSteps;
