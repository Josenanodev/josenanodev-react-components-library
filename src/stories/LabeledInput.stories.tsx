import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import LabeledInput from "../components/LabeledInput/LabeledInput";

const meta: Meta<typeof LabeledInput> = {
  title: "LabeledInput",
  component: LabeledInput,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LabeledInput>;

export const Default: Story = {
  args: {
    label: "Name",
    onChange: (value: string) => console.log(value),
  },
};

export const DifferentBackground: Story = {
  args: {
    label: "Name",
    backgroundColor: "#ffebeb",
    onChange: (value: string) => console.log(value),
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "30px", backgroundColor: "#ffebeb" }}>
        <Story />
      </div>
    ),
  ],
};

export const WithError: Story = {
  args: {
    label: "Name",
    highlightError: true,
    errorMessage: "This field is required",
    onChange: (value: string) => console.log(value),
  },
};
