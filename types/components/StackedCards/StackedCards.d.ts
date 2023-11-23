import React from "react";
type Card = {
    title: JSX.Element;
    content: JSX.Element;
};
type StackedCardsProps = {
    cards: Card[];
    initialCard: number;
    onCardChangeByUser?: (cardIndex: number) => void;
    overrideSelectedCard?: number;
    stackingOrientation?: number;
    cardHeight?: number;
    cardWidth?: number;
};
declare const StackedCards: ({ cards, initialCard, onCardChangeByUser, overrideSelectedCard, stackingOrientation, cardWidth, cardHeight, }: StackedCardsProps) => React.JSX.Element;
export default StackedCards;
