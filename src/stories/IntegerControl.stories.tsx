import type { Meta, StoryObj } from "@storybook/react";
import IntegerControl from "../components/IntegerControl/IntegerControl";

const meta: Meta<typeof IntegerControl> = {
  title: "IntegerControl",
  component: IntegerControl,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof IntegerControl>;

export const Default: Story = {
  args: {
    onChange: (value) => console.log(value),
  },
};
