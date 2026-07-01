import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import LabeledInput from "../components/LabeledInput/LabeledInput";
import {
  componentDescriptions,
  labeledInputArgTypes,
  storyDescription,
  storyDescriptions,
} from "./documentation";

const meta: Meta<typeof LabeledInput> = {
  title: "Forms And Inputs/LabeledInput",
  component: LabeledInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: componentDescriptions.LabeledInput,
      },
    },
  },
  argTypes: labeledInputArgTypes,
};

export default meta;
type Story = StoryObj<typeof LabeledInput>;

export const Default: Story = {
  parameters: storyDescription(storyDescriptions.LabeledInputDefault),
  args: {
    label: "Name",
    onChange: (value: string) => console.log(value),
  },
};

export const DifferentBackground: Story = {
  parameters: storyDescription(storyDescriptions.LabeledInputDifferentBackground),
  args: {
    label: "Name",
    backgroundColor: "#ffebeb",
    onChange: (value: string) => console.log(value),
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "30px" }}>
        <Story />
      </div>
    ),
  ],
};

export const WithError: Story = {
  parameters: storyDescription(storyDescriptions.LabeledInputWithError),
  args: {
    label: "Name",
    highlightError: true,
    errorMessage: "This field is required",
    onChange: (value: string) => console.log(value),
  },
};
