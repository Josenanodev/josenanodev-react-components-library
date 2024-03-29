import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Modal from "../components/Modal/Modal";

const meta: Meta<typeof Modal> = {
  title: "Modal",
  component: Modal,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
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
