import React from "react";
type Card = {
    /** Header content rendered at the top of the card. */
    title: React.ReactNode;
    /** Main content rendered inside the card body. */
    content: React.ReactNode;
};
type StackedCardsProps = {
    /** Cards available in the stack. */
    cards: Card[];
    /** Initial selected card index. */
    initialCard: number;
    /** Called when the user selects a different card. */
    onCardChangeByUser?: (cardIndex: number) => void;
    /** Controlled selected card index from the parent. */
    overrideSelectedCard?: number;
    /** Stack spread direction in degrees. */
    stackingOrientation?: number;
    /** Height in pixels for each card. */
    cardHeight?: number;
    /** Width in pixels for each card. */
    cardWidth?: number;
};
declare const StackedCards: ({ cards, initialCard, onCardChangeByUser, overrideSelectedCard, stackingOrientation, cardWidth, cardHeight, }: StackedCardsProps) => React.JSX.Element;
export default StackedCards;
