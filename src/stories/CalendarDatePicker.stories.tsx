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
    minimumDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    maximumDate: new Date(new Date().getFullYear() + 5, 3, 25),
    customStyle: {
      width: "100%",
    }
  },
};

export const Single: Story = {
  args: {
    mode: "single",
    onSelectedDatesChange(dates) {
      console.log(dates);
    },
  },
};

export const Range: Story = {
  args: {
    mode: "range",
    onSelectedDatesChange(dates) {
      console.log(dates);
    }
  },
};

export const Multiple: Story = {
  args: {
    mode: "multiple",
    onSelectedDatesChange(dates) {
      console.log(dates);
    }
  },
};

export const Booking: Story = {
  args: {
    mode: "booking",
    onSelectedDatesChange(dates) {
      console.log(dates);
    },
  },
};
