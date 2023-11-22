import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import StackedCards from "../components/StackedCards/StackedCards";

const meta: Meta<typeof StackedCards> = {
  title: "StackedCards",
  component: StackedCards,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StackedCards>;

export const Default: Story = {
  args: {
    cards: [
      { title: <strong>Card One</strong>, content: <p>Card one content</p> },
      { title: <strong>Card Two</strong>, content: <p>Card two content</p> },
      { title: <strong>Card Three</strong>, content: <p>Card three content</p> },
      {
        title: <strong>Card Four</strong>,
        content: <img src="https://picsum.photos/300/350" alt="pic" />,
      },
      {
        title: <strong>Card Five</strong>,
        content: <img src="https://picsum.photos/300/350" alt="pic" />,
      },
      {
        title: <strong>Card Six</strong>,
        content: <img src="https://picsum.photos/300/350" alt="pic" />,
      },
      {
        title: <strong>Card Seven</strong>,
        content: <img src="https://picsum.photos/300/350" alt="pic" />,
      },
      { title: <strong>Card Eight</strong>, content: <p>Card eight content</p> },
      { title: <strong>Card Nine</strong>, content: <p>Card nine content</p> },
      { title: <strong>Card Ten</strong>, content: <p>Card ten content</p> },
    ],
    initialCard: 0,
  },
};
