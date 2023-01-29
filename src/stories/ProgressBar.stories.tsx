import React from "react";
import "./css-presets.css";
import { ComponentStory, ComponentMeta } from "@storybook/react";


//Types
import ProgressBar from "../components/ProgressBar/ProgressBar";
import { ProgressBarPropsType } from "../components/ProgressBar/types";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ProgressBar",
  component: ProgressBar,
} as ComponentMeta<typeof ProgressBar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ProgressBar> = (args) => (
  <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
    <ProgressBar {...args} />
  </div>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  totalSize: 100,
  currentValue: 30,
  color: "cyan"
} as ProgressBarPropsType;
