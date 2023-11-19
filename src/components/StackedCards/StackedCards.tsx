import React, { useState } from "react";
import style from "./StackedCards.module.scss";

type StackedCardsProps = {
  cards: {
    title: JSX.Element;
    content: JSX.Element;
  }[];
  initialCard: number;
  stackingOrientation?: number;
};

const StackedCards = ({
  cards,
  initialCard,
  stackingOrientation = 60,
}: StackedCardsProps) => {
  const uniformedStackingOrientation = stackingOrientation % 360;
  const [currentCard, setCurrentCard] = useState(initialCard);
  const positioningStyleOfCardByIndex = (index: number): React.CSSProperties => {
    const cardsLenght = cards.length;
    const cssObject: React.CSSProperties = {};
    let horizontalOffset: number = 0;
    let verticalOffset: number = 0;
    let zIndex: number = 0;
    const radians = (Math.PI / 180) * stackingOrientation;
    const horizontalOffsetPercentageStepSize = (20 * Math.cos(radians)) / cardsLenght;
    const verticalOffsetPercentageStepSize = (20 * Math.sin(radians)) / cardsLenght;
    if (index === currentCard) {
      horizontalOffset = 0;
      verticalOffset = 0;
      zIndex = cardsLenght + 1;
    } else if (index < currentCard) {
      horizontalOffset = horizontalOffsetPercentageStepSize * (index + 1);
      verticalOffset = verticalOffsetPercentageStepSize * (index + 1);
      zIndex = cardsLenght - index;
    } else {
      horizontalOffset = horizontalOffsetPercentageStepSize * index;
      verticalOffset = verticalOffsetPercentageStepSize * index;
      zIndex = cardsLenght - index;
    }
    cssObject["zIndex"] = zIndex;
    if (uniformedStackingOrientation >= 0 && uniformedStackingOrientation <= 90) {
      cssObject["right"] = `${horizontalOffset}%`;
      cssObject["bottom"] = `${verticalOffset}%`;
    } else if (uniformedStackingOrientation > 90 && uniformedStackingOrientation <= 180) {
      cssObject["left"] = `${-horizontalOffset}%`;
      cssObject["bottom"] = `${verticalOffset}%`;
    } else if (uniformedStackingOrientation > 180 && uniformedStackingOrientation <= 270) {
      cssObject["left"] = `${-horizontalOffset}%`;
      cssObject["top"] = `${-verticalOffset}%`;
    } else if (uniformedStackingOrientation > 270 && uniformedStackingOrientation <= 360) {
      cssObject["right"] = `${horizontalOffset}%`;
      cssObject["top"] = `${-verticalOffset}%`;
    }
    return cssObject;
  };
  return (
    <div className={style["stacked-cards"]}>
      {cards.map((card, index) => {
        return (
          <div
            className={style["card"]}
            key={index}
            data-is-selectable={index !== currentCard}
            data-should-card-rise={
              uniformedStackingOrientation >= 0 && uniformedStackingOrientation <= 180
            }
            style={positioningStyleOfCardByIndex(index)}
            onClick={() => {
              if (currentCard !== index) setCurrentCard(index);
            }}
          >
            <div className={style["title"]}>{card.title}</div>
            <div className={style["content"]}>{card.content}</div>
          </div>
        );
      })}
    </div>
  );
};

export default StackedCards;
