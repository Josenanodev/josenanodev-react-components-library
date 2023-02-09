import React from "react";
import "./css-presets.css";
import { ComponentStory, ComponentMeta } from "@storybook/react";

//Types
import InputBoxWithConfirmation from "../components/InputBoxWithConfirmation/InputBoxWithConfirmation";
import { InputBoxWithConfirmationPropsType } from "../components/InputBoxWithConfirmation/types";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "InputBoxWithConfirmation",
  component: InputBoxWithConfirmation,
} as ComponentMeta<typeof InputBoxWithConfirmation>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof InputBoxWithConfirmation> = (args) => (
  <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
    <InputBoxWithConfirmation {...args} />
  </div>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  onConfirmAction: (inputValue) => alert(inputValue),
  inputType: "number",
  defaultValue: 10,
} as InputBoxWithConfirmationPropsType;
