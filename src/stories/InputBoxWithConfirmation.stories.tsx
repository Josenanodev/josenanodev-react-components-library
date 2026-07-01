import type { Meta, StoryObj } from "@storybook/react-webpack5";
import InputBoxWithConfirmation from "../components/InputBoxWithConfirmation/InputBoxWithConfirmation";
import {
  componentDescriptions,
  inputBoxWithConfirmationArgTypes,
  storyDescription,
  storyDescriptions,
} from "./documentation";

const meta: Meta<typeof InputBoxWithConfirmation> = {
  title: "Forms And Inputs/InputBoxWithConfirmation",
  component: InputBoxWithConfirmation,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: componentDescriptions.InputBoxWithConfirmation,
      },
    },
  },
  argTypes: inputBoxWithConfirmationArgTypes,
};

export default meta;
type Story = StoryObj<typeof InputBoxWithConfirmation>;

export const Default: Story = {
  parameters: storyDescription(storyDescriptions.InputBoxWithConfirmationDefault),
  args: {
    onConfirmAction: (inputValue) => alert(`The value is: ${inputValue}`),
  },
};
