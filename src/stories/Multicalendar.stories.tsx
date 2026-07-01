import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { fn } from "storybook/test";
import Multicalendar from "../components/Multicalendar";
import {
  componentDescriptions,
  multicalendarArgTypes,
  storyDescription,
  storyDescriptions,
} from "./documentation";

const meta: Meta<typeof Multicalendar> = {
  title: "Booking And Availability/Multicalendar",
  component: Multicalendar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: componentDescriptions.Multicalendar,
      },
    },
  },
  argTypes: multicalendarArgTypes,
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
  parameters: storyDescription(storyDescriptions.MulticalendarDefault),
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
    onScrollTopChanges: fn(),
    onScrollLeftChanges: fn(),
  },
};
