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
    onSelectedDatesChange(dates) {
      console.log(dates);
    },
    minimumDate: new Date(new Date().getFullYear(), new Date().getMonth(), 21),
    maximumDate: new Date(new Date().getFullYear() + 2, 3, 25),
  },
};
