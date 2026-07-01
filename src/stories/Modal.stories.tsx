import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { fn } from "storybook/test";
import Modal from "../components/Modal/Modal";
import {
  componentDescriptions,
  modalArgTypes,
  storyDescription,
  storyDescriptions,
} from "./documentation";

const meta: Meta<typeof Modal> = {
  title: "Overlays And Navigation/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: componentDescriptions.Modal,
      },
    },
  },
  argTypes: modalArgTypes,
  args: {
    onOpen: fn(),
    onClose: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  parameters: storyDescription(storyDescriptions.ModalDefault),
  args: {
    overrideOpenState: true,
    children: (
      <div
        style={{
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
          borderRadius: "8px",
          color: "dimgray",
          padding: "16px",
        }}
      >
        <h1>Modal</h1>
        <p>This is a modal</p>
        <p>Click outside to close</p>
      </div>
    ),
  },
};

export const Forced: Story = {
  parameters: storyDescription(storyDescriptions.ModalForced),
  decorators: [
    (Story) => {
      const [visibility, setVisibility] = useState(false);
      return (
        <>
          <button type="button" onClick={() => setVisibility(true)}>
            Open Modal
          </button>
          <Story
            args={{
              overrideOpenState: visibility,
              forced: true,
              children: (
                <div
                  style={{
                    backgroundColor: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                    borderRadius: "8px",
                    color: "dimgray",
                    padding: "16px",
                  }}
                >
                  <h1>Modal</h1>
                  <p>This is a modal</p>
                  <button type="button" onClick={() => setVisibility(false)}>
                    Close Modal
                  </button>
                </div>
              ),
              onClose: () => setVisibility(false),
            }}
          />
        </>
      );
    },
  ],
};
