import React from "react";
import "./css-presets.css";
import { ComponentStory, ComponentMeta } from "@storybook/react";

//Types
import MultipleJoinedButtonsBar from "../components/MultipleJoinedButtonsBar/MultipleJoinedButtonsBar";
import { MultipleJoinedButtonsBarPropsType } from "../components/MultipleJoinedButtonsBar/types";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "MultipleJoinedButtonsBar",
  component: MultipleJoinedButtonsBar,
} as ComponentMeta<typeof MultipleJoinedButtonsBar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof MultipleJoinedButtonsBar> = (args) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <MultipleJoinedButtonsBar {...args} />
  </div>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  options: [
    { _id: "option_1", visibleValue: "Option 1" },
    { _id: "option_2", visibleValue: "Option 2" },
    { _id: "option_3", visibleValue: "Option 3" },
  ],
  onSelectOption: (selectedValue) => {},
} as MultipleJoinedButtonsBarPropsType;
