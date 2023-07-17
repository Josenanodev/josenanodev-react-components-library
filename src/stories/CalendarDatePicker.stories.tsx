import type { Meta, StoryObj } from "@storybook/react";
import CalendarDatePicker from "../components/CalendarDatePicker/CalendarDatePicker";

const meta: Meta<typeof CalendarDatePicker> = {
  title: "CalendarDatePicker",
  component: CalendarDatePicker,
};

export default meta;
type Story = StoryObj<typeof CalendarDatePicker>;

export const TripPicker: Story = {
  args: {
    mode: "booking",
    language: "en",
    title: "Select your trip dates",
  },
};
