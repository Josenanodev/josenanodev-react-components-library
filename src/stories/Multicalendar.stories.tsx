import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Multicalendar from "../components/Multicalendar";

const meta: Meta<typeof Multicalendar> = {
  title: "Multicalendar",
  component: Multicalendar,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: "100%", height: 500 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Multicalendar>;

export const Default: Story = {
  args: {
    multicalendarId: "multicalendar-storybook-default",
    ReactCellChildren: ({ date, listElementId }) => (
      <div>
        <div>{date}</div>
        <div>{listElementId}</div>
      </div>
    ),
    ReactListElementChildren: ({ listElementId }) => (
      <div>
        <div>{listElementId}</div>
      </div>
    ),
    listElementsIdsArray: ["listElementId1", "listElementId2", "listElementId3"],
    language: "es_ES",
  },
};
