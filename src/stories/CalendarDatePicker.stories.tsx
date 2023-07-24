import type { Meta, StoryObj } from "@storybook/react";
import CalendarDatePickerMask from "./CalendarDatePickerMask";

const meta: Meta<typeof CalendarDatePickerMask> = {
  title: "CalendarDatePicker",
  component: CalendarDatePickerMask,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CalendarDatePickerMask>;

export const Default: Story = {
  args: {
    mode: "single",
    language: "en",
    title: "Select your trip dates",
    onSelectedDatesChange(dates) {
      console.log(dates);
    },
    customDates: [
      {
        color: "#C9C9C9",
        dates: [new Date(2023, 6, 23), new Date(2023, 6, 26)],
        selectable: false,
        crossed: true,
      },
      {
        color: "#FFCACA",
        dates: [new Date(2023, 6, 24), new Date(2023, 6, 25)],
        selectable: false,
        crossed: false,
        clickSideEffect: (date) => {
          alert(`You clicked on ${date.toDateString()}`);
        },
      },
    ],
    minimumDate: new Date(new Date().getFullYear(), new Date().getMonth(), 21),
    maximumDate: new Date(new Date().getFullYear() + 2, 3, 25),
  },
};
