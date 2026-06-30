import React from "react";
type Step = {
    /** React panel rendered for this step. */
    component: React.ReactNode;
    /** Text rendered inside the step navigation marker. */
    innerText: string;
    /** Optional descriptive text rendered above the active step panel. */
    outterText?: string;
};
type ScreenStepsProps = {
    /** Ordered list of steps in the flow. */
    steps: Step[];
    /** Initial active step index. */
    defaultStep?: number;
    /** Called when the active step changes through user navigation. */
    onStepChange?: (step: number) => void;
    /** Allows users to click step markers to navigate. */
    canNavigate?: boolean;
    /** Controlled active step index from the parent. */
    overrideStep?: number;
};
declare const ScreenSteps: ({ steps, defaultStep, onStepChange, canNavigate, overrideStep, }: ScreenStepsProps) => React.JSX.Element;
export default ScreenSteps;
