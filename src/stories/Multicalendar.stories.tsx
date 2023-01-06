import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Multicalendar from "../components/Multicalendar/Multicalendar";
import { MulticalendarPropsType } from "../components/Multicalendar/types";

//Mocks
import CellChildrenMock from "../mocks/ReactComponentMocksForTesting/CellChildrenMock";
import ListElementChildrenMock from "../mocks/ReactComponentMocksForTesting/ListElementChildrenMock";

//Language
import es_ES from "../languages/es-ES";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Multicalendario",
  component: Multicalendar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Multicalendar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Multicalendar> = (args) => (
  <Multicalendar {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  multicalendarId: "storybook-calendar",
  ReactCellChildren: CellChildrenMock,
  ReactListElementChildren: ListElementChildrenMock,
  listElementsIdsArray: [
    "List element 1",
    "List element 2",
    "List element 3",
    "List element 4",
    "List element 5",
    "List element 6",
  ],
  language: es_ES,
} as MulticalendarPropsType;