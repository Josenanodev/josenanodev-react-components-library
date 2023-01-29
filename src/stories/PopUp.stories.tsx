import React, { useState } from "react";
import "./css-presets.css";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import PopUp from "../components/PopUp/PopUp";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "PopUp",
  component: PopUp,
} as ComponentMeta<typeof PopUp>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PopUp> = (args) => {
  const [openPopUp, setOpenPopUp] = useState(false);

  return (
    <div
      style={{
        width: "100%",
        height: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <PopUp
        {...args}
        open={openPopUp}
        closeAction={() => {
          setOpenPopUp(false);
        }}
      >
        <p
          style={{
            fontWeight: 600,
            textAlign: "center",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Click outside to close
        </p>
      </PopUp>
      <button onClick={() => setOpenPopUp(!openPopUp)}>Toogle PopUp</button>
    </div>
  );
};

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  outBoundClickClosesPopUp: true,
  aditionalInlineStyle: {
    width: 300,
    height: 350,
    backgroundColor: "#cab1f1",
    color: "black",
    borderRadius: "8px",
  },
};
