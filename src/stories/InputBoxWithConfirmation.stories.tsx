import type { Meta, StoryObj } from "@storybook/react";
import InputBoxWithConfirmation from "../components/InputBoxWithConfirmation/InputBoxWithConfirmation";

const meta: Meta<typeof InputBoxWithConfirmation> = {
  title: "InputBoxWithConfirmation",
  component: InputBoxWithConfirmation,
};

export default meta;
type Story = StoryObj<typeof InputBoxWithConfirmation>;

export const Default: Story = {
  args: {
    onConfirmAction: (inputValue) => alert(`The value is: ${inputValue}`),
  },
};
