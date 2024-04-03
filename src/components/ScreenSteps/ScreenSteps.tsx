import React, { useState, useEffect, useRef } from "react";
import styles from "./ScreenSteps.module.scss";
import { useResizeObserver } from "../../hooks";

type Step = {
  component: React.ReactNode;
  innerText: string;
  outterText?: string;
};

type ScreenStepsProps = {
  steps: Step[];
  defaultStep?: number;
  onStepChange?: (step: number) => void;
  canNavigate?: boolean;
  overrideStep?: number;
};

const ScreenSteps = ({
  steps,
  defaultStep = 0,
  onStepChange = () => {},
  canNavigate,
  overrideStep,
}: ScreenStepsProps) => {
  const stepsContentRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(defaultStep);
  const [_stepsContentWidth, stepsContentHeight] = useResizeObserver(stepsContentRef);
  useEffect(() => {
    const isValidStep =
      overrideStep !== undefined &&
      overrideStep < steps.length &&
      overrideStep >= 0 &&
      overrideStep !== currentStep;
    if (isValidStep) setCurrentStep(overrideStep);
  }, [overrideStep]);
  const stepContentStyle = (): React.CSSProperties => {
    const translatePercentage = 100 / steps.length;
    return {
      width: `${steps.length * 100}%`,
      transform: `translateX(-${translatePercentage * currentStep}%)`,
    };
  };
  return (
    <section className={styles["screen-steps"]}>
      <nav className={styles["steps"]}>
        {steps.map((step, index) => (
          <div
            key={step.innerText}
            className={styles["step"]}
            data-is-completed={index < currentStep}
            data-is-current={index === currentStep}
            data-can-navigate={canNavigate}
            onClick={() => {
              if (!canNavigate) return;
              setCurrentStep(index);
              onStepChange(index);
            }}
          >
            {step.innerText}
          </div>
        ))}
      </nav>
      <p className={styles["outer-text"]}>{steps[currentStep].outterText}</p>
      <div
        className={styles["frame"]}
        style={{
          height: stepsContentHeight ? stepsContentHeight : "100%",
        }}
      >
        <div
          ref={stepsContentRef}
          className={styles["steps-content"]}
          style={stepContentStyle()}
        >
          {steps.map((step, index) => (
            <div
              key={step.innerText}
              className={styles["step-component"]}
              data-is-current={index === currentStep}
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
