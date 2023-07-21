import type { Meta, StoryObj } from "@storybook/react";
import CalendarDatePicker from "../components/CalendarDatePicker/CalendarDatePicker";

const meta: Meta<typeof CalendarDatePicker> = {
  title: "CalendarDatePicker",
  component: CalendarDatePicker,
  argTypes: {
    minimumDate: {
      table: {
        disable: true,
      },
    },
    maximumDate: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CalendarDatePicker>;

export const TripPicker: Story = {
  args: {
    mode: "booking",
    language: "en",
    title: "Select your trip dates",
    onChange(dates) {
      console.log(dates);
    },
  },
};
