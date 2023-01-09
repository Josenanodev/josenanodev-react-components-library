import React from "react";
import "./css-presets.css";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import SideBar from "../components/SideBar/SideBar";

//Types
import { SideBarPropsType } from "../components/SideBar/types";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "SideBar",
  component: SideBar,
} as ComponentMeta<typeof SideBar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SideBar> = (args) => (
  <div
    style={{
      height: "90vh",
      overflow: "hidden",
      position: "relative",
      border: "solid 2px #c2c9d6",
    }}
  >
    <SideBar {...args} />
  </div>
);

export const Left = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Left.args = {
  side: "left",
  open: true,
  children: (
    <div
      style={{
        width: 300,
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p>Introduce your component here</p>
    </div>
  ),
  outBoundClickClosesSideBar: true,
} as SideBarPropsType;
