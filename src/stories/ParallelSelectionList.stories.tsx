import React from "react";
import "./css-presets.css";
import { ComponentStory, ComponentMeta } from "@storybook/react";

//Types
import ParallelSelectionList from "../components/ParallelSelectionList/ParallelSelectionList";
import { ParallelSelctionListPropsTypes } from "../components/ParallelSelectionList/types";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ParallelSelectionList",
  component: ParallelSelectionList,
} as ComponentMeta<typeof ParallelSelectionList>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ParallelSelectionList> = (args) => (
  <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
    <ParallelSelectionList {...args} />
  </div>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  dataList: [
    { _id: "1", visibleDefaultName: "Elemento 1", searchValue: "Elemento 1" },
    { _id: "2", visibleDefaultName: "Elemento 2", searchValue: "Elemento 2" },
    { _id: "3", visibleDefaultName: "Elemento 3", searchValue: "Elemento 3" },
    { _id: "4", visibleDefaultName: "Elemento 4", searchValue: "Elemento 4" },
    { _id: "5", visibleDefaultName: "Elemento 5", searchValue: "Elemento 5" },
    { _id: "6", visibleDefaultName: "Elemento 6", searchValue: "Elemento 6" },
    { _id: "7", visibleDefaultName: "Elemento 7", searchValue: "Elemento 7" },
    { _id: "8", visibleDefaultName: "Elemento 8", searchValue: "Elemento 8" },
    { _id: "9", visibleDefaultName: "Elemento 9", searchValue: "Elemento 9" },
    { _id: "10", visibleDefaultName: "Elemento 10", searchValue: "Elemento 10" },
  ],
  applyAction: (dataListIds) => alert("Selected Ids: " + dataListIds),
  cancelAction: () => alert("Cancel clicked"),
  searchBarsVisible: true,
  leftListTitle: "Disponibles",
  rightListTitle: "Seleccionados",
} as ParallelSelctionListPropsTypes;
