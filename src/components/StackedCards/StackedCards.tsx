import React, { useState } from "react";
import style from "./StackedCards.module.scss";

type Card = {
  title: JSX.Element;
  content: JSX.Element;
};

type StackedCardsProps = {
  cards: Card[];
  initialCard: number;
  stackingOrientation?: number;
  cardHeight?: number;
  cardWidth?: number;
};

const degreesInOneCircle = 360;
const degreesInOneRightAngle = 90;
const degreesInOneStraightAngle = 180;
const degreesInOneObtuseAngle = 270;

const StackedCards = ({
  cards,
  initialCard,
  stackingOrientation = 60,
  cardWidth = 300,
  cardHeight = 350,
}: StackedCardsProps) => {
  const [currentCard, setCurrentCard] = useState(initialCard);
  const uniformedStackingOrientation =
    stackingOrientation > 0
      ? stackingOrientation % degreesInOneCircle
      : degreesInOneCircle + (stackingOrientation % degreesInOneCircle);
  const radians = (Math.PI / degreesInOneStraightAngle) * stackingOrientation;
  const calculateCardOffsetByIndex = (
    index: number
  ): {
    horizontalOffset: number;
    verticalOffset: number;
  } => {
    const separationFactor = 80;
    const horizontalOffsetPercentageStepSize =
      (separationFactor * Math.cos(radians)) / cards.length;
    const verticalOffsetPercentageStepSize =
      (separationFactor * Math.sin(radians)) / cards.length;
    const horizontalOffset = horizontalOffsetPercentageStepSize * index;
    const verticalOffset = verticalOffsetPercentageStepSize * index;
    return { horizontalOffset, verticalOffset };
  };
  const cardStackContainerStyleSize = (): React.CSSProperties => {
    const horizontalOffset = calculateCardOffsetByIndex(cards.length).horizontalOffset;
    const verticalOffset = calculateCardOffsetByIndex(cards.length).verticalOffset;
    const width = cardWidth + Math.abs(horizontalOffset);
    const height = cardHeight + Math.abs(verticalOffset);
    return { width, height };
  };
  const positioningStyleOfCardByIndex = (index: number): React.CSSProperties => {
    const cssObject: React.CSSProperties = {};
    let horizontalOffset: number = 0;
    let verticalOffset: number = 0;
    let zIndex: number = 0;
    const cardOffset = calculateCardOffsetByIndex(
      index < currentCard ? index + 1 : index
    );
    if (index === currentCard) {
      zIndex = cards.length + 1;
    } else {
      horizontalOffset = cardOffset.horizontalOffset;
      verticalOffset = cardOffset.verticalOffset;
      zIndex = cards.length - index;
    }
    cssObject["zIndex"] = zIndex;
    const modifyCssObjectPositioning = (input: {
      right: string;
      bottom: string;
      left: string;
      top: string;
    }) => {
      cssObject["right"] = input.right;
      cssObject["bottom"] = input.bottom;
      cssObject["left"] = input.left;
      cssObject["top"] = input.top;
    };
    const isBottomRight =
      uniformedStackingOrientation >= 0 &&
      uniformedStackingOrientation <= degreesInOneRightAngle;
    const isBottomLeft =
      uniformedStackingOrientation > degreesInOneRightAngle &&
      uniformedStackingOrientation <= degreesInOneStraightAngle;
    const isTopLeft =
      uniformedStackingOrientation > degreesInOneStraightAngle &&
      uniformedStackingOrientation <= degreesInOneObtuseAngle;
    const isTopRight =
      uniformedStackingOrientation > degreesInOneObtuseAngle &&
      uniformedStackingOrientation <= degreesInOneCircle;
    if (isBottomRight) {
      modifyCssObjectPositioning({
        right: `${horizontalOffset}px`,
        bottom: `${verticalOffset}px`,
        left: "",
        top: "",
      });
    } else if (isBottomLeft) {
      modifyCssObjectPositioning({
        right: "",
        bottom: `${verticalOffset}px`,
        left: `${-horizontalOffset}px`,
        top: "",
      });
    } else if (isTopLeft) {
      modifyCssObjectPositioning({
        right: "",
        bottom: "",
        left: `${-horizontalOffset}px`,
        top: `${-verticalOffset}px`,
      });
    } else if (isTopRight) {
      modifyCssObjectPositioning({
        right: `${horizontalOffset}px`,
        bottom: "",
        left: "",
        top: `${-verticalOffset}px`,
      });
    }
    return cssObject;
  };
  return (
    <div className={style["stacked-cards"]} style={cardStackContainerStyleSize()}>
      {cards.map((card, index) => {
        return (
          <div
            className={style["card"]}
            key={index}
            data-is-selectable={index !== currentCard}
            data-should-card-rise={
              uniformedStackingOrientation >= 0 && uniformedStackingOrientation <= 180
            }
            style={{
              height: cardHeight,
              width: cardWidth,
              ...positioningStyleOfCardByIndex(index),
            }}
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
