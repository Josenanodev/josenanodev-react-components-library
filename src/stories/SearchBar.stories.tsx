import React from "react";
import "./css-presets.css";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import SearchBar from "../components/SearchBar/SearchBar";

//Types
import { SearchBarPropsType } from "../components/SearchBar/types";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "SearchBar",
  component: SearchBar,
} as ComponentMeta<typeof SearchBar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SearchBar> = (args) => (
  <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
    <SearchBar {...args} />
  </div>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  actionOnEnter: () => {},
  actionOnAlteringText: () => {},
  actionOnEmptyText: () => {},
  optionsButtonVisible: true,
  actionOnClickOptionsButton: () => {},
  placeholder: "Placeholder",
  initialValue: "Initial value",
  disabled: false,
} as SearchBarPropsType;
