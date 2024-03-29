import type { Meta, StoryObj } from "@storybook/react";
import AlertModal from "../components/AlertModal/AlertModal";

const meta: Meta<typeof AlertModal> = {
  title: "AlertModal",
  component: AlertModal,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AlertModal>;

export const Default: Story = {
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
