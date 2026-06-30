import type { Meta, StoryObj } from "@storybook/react-webpack5";
import AlertModal from "../components/AlertModal/AlertModal";
import {
  alertModalArgTypes,
  componentDescriptions,
  storyDescription,
  storyDescriptions,
} from "./documentation";

const meta: Meta<typeof AlertModal> = {
  title: "AlertModal",
  component: AlertModal,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: componentDescriptions.AlertModal,
      },
    },
  },
  argTypes: alertModalArgTypes,
};

export default meta;
type Story = StoryObj<typeof AlertModal>;

export const Default: Story = {
  parameters: storyDescription(storyDescriptions.AlertModalDefault),
  args: {
    overrideOpenState: true,
    type: "success",
    title: "Success",
    message: "This is a success message",
    confirmButton: true,
    confirmText: "OK",
    cancelButton: true,
    cancelText: "Cancel",
  },
};
