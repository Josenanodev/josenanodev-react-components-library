import type { Meta, StoryObj } from "@storybook/react-webpack5";
import CalendarDatePickerMask from "./CalendarDatePickerMask";
import {
  calendarDatePickerArgTypes,
  componentDescriptions,
  storyDescription,
  storyDescriptions,
} from "./documentation";

const meta: Meta<typeof CalendarDatePickerMask> = {
  title: "CalendarDatePicker",
  component: CalendarDatePickerMask,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: componentDescriptions.CalendarDatePicker,
      },
    },
  },
  argTypes: calendarDatePickerArgTypes,
};

export default meta;
type Story = StoryObj<typeof CalendarDatePickerMask>;

export const Default: Story = {
  parameters: storyDescription(storyDescriptions.CalendarDatePickerDefault),
  args: {
    mode: "single",
    language: "en",
    onSelectedDatesChange(dates) {
      console.log(dates);
    },
    customDates: [
      {
        color: "#C9C9C9",
        dates: [new Date(2024, 9, 23), new Date(2024, 9, 26)],
        selectable: false,
        crossed: true,
      },
      {
        color: "#FFCACA",
        dates: [new Date(2024, 10, 24), new Date(2024, 10, 25)],
        selectable: false,
        crossed: false,
        clearSelectionIfClicked: true,
        clickSideEffect: (date) => {
          alert(`You clicked on ${date.toDateString()}`);
        },
      },
    ],
    minimumDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    maximumDate: new Date(new Date().getFullYear() + 5, 3, 25),
    customStyle: {
      width: "100%",
    },
  },
};

export const Single: Story = {
  parameters: storyDescription(storyDescriptions.CalendarDatePickerSingle),
  args: {
    mode: "single",
    onSelectedDatesChange(dates) {
      console.log(dates);
    },
  },
};

export const Range: Story = {
  parameters: storyDescription(storyDescriptions.CalendarDatePickerRange),
  args: {
    mode: "range",
    onSelectedDatesChange(dates) {
      console.log(dates);
    },
  },
};

export const Multiple: Story = {
  parameters: storyDescription(storyDescriptions.CalendarDatePickerMultiple),
  args: {
    mode: "multiple",
    onSelectedDatesChange(dates) {
      console.log(dates);
    },
  },
};

export const Booking: Story = {
  parameters: storyDescription(storyDescriptions.CalendarDatePickerBooking),
  args: {
    mode: "booking",
    onSelectedDatesChange(dates) {
      console.log(dates);
    },
  },
};
