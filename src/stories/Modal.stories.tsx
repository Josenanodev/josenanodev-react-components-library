import React from "react";
import "./css-presets.css";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Modal from "../components/Modal/Modal";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Modal",
  component: Modal,
} as ComponentMeta<typeof Modal>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Modal> = (args) => (
  <div
    id="div-wrapper-modal-storybook"
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    }}
  >
    <Modal {...args}>
      <p
        style={{
          width: 300,
          height: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Introduce your components here
      </p>
    </Modal>
  </div>
);

// export const Primary = Template.bind({});
// // More on args: https://storybook.js.org/docs/react/writing-stories/args
// Primary.args = {
//   visibility: true,
//   parentElement: document.getElementById("storybook-preview-wrapper"),
//   forced: false,
//   onOpen: () => {},
//   onClose: () => {},
//   transitionTime: 500,
// };
