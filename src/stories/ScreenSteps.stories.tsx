import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import ScreenSteps from "../components/ScreenSteps/ScreenSteps";

const meta: Meta<typeof ScreenSteps> = {
  title: "ScreenSteps",
  component: ScreenSteps,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 390 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ScreenSteps>;

const styleOne: React.CSSProperties = {
  border: "dashed 2px dimgray",
  borderRadius: 6,
  width: "100%",
  height: "100%",
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "lightblue",
};

const styleTwo: React.CSSProperties = {
  border: "dashed 2px dimgray",
  borderRadius: 6,
  width: "100%",
  height: 100,
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "lightcoral",
};

const styleThree: React.CSSProperties = {
  border: "dashed 2px dimgray",
  borderRadius: 6,
  width: "100%",
  height: 200,
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "lightgreen",
};

export const Default: Story = {
  args: {
    steps: [
      {
        component: <div style={styleOne}>Step 1</div>,
        innerText: "1",
        outterText: "Step 1 of 3",
      },
      {
        component: <div style={styleTwo}>Step 2</div>,
        innerText: "2",
        outterText: "Step 2 of 3",
      },
      {
        component: <div style={styleThree}>Step 3</div>,
        innerText: "3",
        outterText: "Step 3 of 3",
      },
    ],
    onStepChange: (step: number) => console.log(step),
  },
};
