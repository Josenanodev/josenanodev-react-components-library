import React from "react";
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
declare const ScreenSteps: ({ steps, defaultStep, onStepChange, canNavigate, overrideStep, }: ScreenStepsProps) => React.JSX.Element;
export default ScreenSteps;
