import React from "react";
import "./css-presets.css";
import { ComponentStory, ComponentMeta } from "@storybook/react";

//Types
import ExportToExcelButton from "../components/ExportToExcelButton/ExportToExcelButton";
import { ExportToExcelButtonPropsType } from "../components/ExportToExcelButton/types";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ExportToExcelButton",
  component: ExportToExcelButton,
} as ComponentMeta<typeof ExportToExcelButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ExportToExcelButton> = (args) => (
  <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
    <ExportToExcelButton {...args} />
  </div>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  headers: {a : [{value: "Test"}]},
  data: { a: [[{ value: 4 }]] },
} as ExportToExcelButtonPropsType;
