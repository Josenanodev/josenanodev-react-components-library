import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import StackedCards from "../components/StackedCards/StackedCards";
import {
  componentDescriptions,
  stackedCardsArgTypes,
  storyDescription,
  storyDescriptions,
} from "./documentation";

const meta: Meta<typeof StackedCards> = {
  title: "StackedCards",
  component: StackedCards,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: componentDescriptions.StackedCards,
      },
    },
  },
  argTypes: stackedCardsArgTypes,
};

export default meta;
type Story = StoryObj<typeof StackedCards>;

export const Default: Story = {
  parameters: storyDescription(storyDescriptions.StackedCardsDefault),
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

export const TwoCards: Story = {
  parameters: storyDescription(storyDescriptions.StackedCardsTwoCards),
  args: {
    cards: [
      { title: <strong>Card One</strong>, content: <p>Card one content</p> },

      {
        title: <strong>Card Seven</strong>,
        content: <img src="https://picsum.photos/300/350" alt="pic" />,
      },
    ],
    initialCard: 0,
  },
};
