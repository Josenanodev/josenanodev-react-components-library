import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import BubbleMenu from "../components/BubbleMenu/BubbleMenu";
import CalendarDatePicker from "../components/CalendarDatePicker/CalendarDatePicker";
import { BsHouse, BsPerson, BsSearch } from "react-icons/bs";

const meta: Meta<typeof BubbleMenu> = {
  title: "BubbleMenu",
  component: BubbleMenu,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ minHeight: 400, minWidth: 360 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BubbleMenu>;

export const Default: Story = {
  args: {
    options: [
      {
        icon: <BsSearch />,
        text: "Search",
        visible: true,
        optionCallback: () => console.log("Search"),
      },
      {
        icon: <BsPerson />,
        text: "Profile",
        visible: true,
        optionCallback: () => console.log("Profile"),
      },
      {
        icon: <BsHouse />,
        text: "Home",
        visible: true,
        optionCallback: () => console.log("Home"),
      },
    ],
  },
};

export const AEP: Story = {
  args: {
    options: [
      {
        icon: <BsSearch />,
        text: "Search",
        visible: true,
        optionCallback: () => console.log("Search"),
      },
      {
        icon: <BsPerson />,
        text: "Profile",
        visible: true,
        optionCallback: () => console.log("Profile"),
      },
      {
        icon: <BsHouse />,
        text: "Home",
        visible: true,
        optionCallback: () => console.log("Home"),
      },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: 400, minWidth: 360 }}>
        <Story />
        <CalendarDatePicker
          mode="range"
          onSelectedDatesChange={(dates) => console.log(dates)}
        />
      </div>
    ),
  ],
};
