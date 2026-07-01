import type { Meta, StoryObj } from "@storybook/react-webpack5";
import IntegerControl from "../components/IntegerControl/IntegerControl";
import {
  componentDescriptions,
  integerControlArgTypes,
  storyDescription,
  storyDescriptions,
} from "./documentation";

const meta: Meta<typeof IntegerControl> = {
  title: "Forms And Inputs/IntegerControl",
  component: IntegerControl,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: componentDescriptions.IntegerControl,
      },
    },
  },
  argTypes: integerControlArgTypes,
};

export default meta;
type Story = StoryObj<typeof IntegerControl>;

export const Default: Story = {
  parameters: storyDescription(storyDescriptions.IntegerControlDefault),
  args: {
    onChange: (value) => console.log(value),
  },
};
