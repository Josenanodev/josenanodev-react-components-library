import React, { useState, useEffect } from "react";
import styles from "./ScrollSnapGallery.module.scss";

//Icons
import { GoDotFill } from "react-icons/go";
import { IconType } from "react-icons/lib";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";

const frameRandomId = Math.random().toString(36).substring(7);

type ScrollSnapGalleryProps = {
  urls: string[];
  alts?: string[];
  width?: string;
  height?: string;
  IndicatorIcon?: IconType;
  positionIndicatorSize?: number;
  iconSize?: number;
  showArrows?: boolean;
  frameStyle?: React.CSSProperties;
  onSlideChange?: (index: number) => void;
  autoChange?: boolean;
};

const ScrollSnapGallery = ({
  urls = [],
  alts,
  width = "400px",
  height = "300px",
  IndicatorIcon = GoDotFill,
  positionIndicatorSize = Math.min(urls.length, 6),
  iconSize = 16,
  showArrows = false,
  frameStyle = {},
  onSlideChange = () => {},
  autoChange = false,
}: ScrollSnapGalleryProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [minimumVisibleIndicator, setMinimumVisibleIndicator] = useState(0);
  const [maximumVisibleIndicator, setMaximumVisibleIndicator] = useState(
    positionIndicatorSize - 1
  );
  const [positionIndicatorXtranslateValue, setPositionIndicatorXtranslateValue] =
    useState(0);
  const indicatorIconStyle = (index: number) => {
    let className = styles["indicator-icon"];
    if (currentSlide === index) {
      className += ` ${styles["current"]}`;
    }
    const isMinimumNotFirst =
      minimumVisibleIndicator !== 0 && index === minimumVisibleIndicator;
    const isMaximumNotLast =
      maximumVisibleIndicator !== urls.length - 1 && index === maximumVisibleIndicator;
    if (isMinimumNotFirst || isMaximumNotLast) {
      className += ` ${styles["full-shrunken"]}`;
    }
    const isOneAfterMinimumNotSecond =
      minimumVisibleIndicator !== 0 && index === minimumVisibleIndicator + 1;
    const isOneBeforeMaximumNotSecond =
      maximumVisibleIndicator !== urls.length - 1 &&
      index === maximumVisibleIndicator - 1;
    if (isOneAfterMinimumNotSecond || isOneBeforeMaximumNotSecond) {
      className += ` ${styles["medium-shrunken"]}`;
    }
    if (index < minimumVisibleIndicator || index > maximumVisibleIndicator) {
      className += ` ${styles["hidden"]}`;
    }
    return className;
  };
  const handleScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const { scrollLeft, clientWidth } = event.target as HTMLDivElement;
    const slideWidth = clientWidth;
    const slideIndex = Math.round(scrollLeft / slideWidth);
    setCurrentSlide(slideIndex);
    if (slideIndex <= minimumVisibleIndicator) {
      const minumum = Math.max(slideIndex - 1, 0);
      const maximum = minumum + positionIndicatorSize - 1;
      setMinimumVisibleIndicator(minumum);
      setMaximumVisibleIndicator(maximum);
    } else if (slideIndex >= maximumVisibleIndicator) {
      const maximum = Math.min(slideIndex + 1, urls.length - 1);
      const minumum = maximum - positionIndicatorSize + 1;
      setMaximumVisibleIndicator(maximum);
      setMinimumVisibleIndicator(minumum);
    }
  };
  useEffect(() => {
    setPositionIndicatorXtranslateValue(minimumVisibleIndicator * iconSize);
  }, [minimumVisibleIndicator]);
  useEffect(() => {
    onSlideChange(currentSlide);
  }, [currentSlide]);
  useEffect(() => {
    if (autoChange) {
      const interval = setInterval(() => {
        const frame = document.getElementById(`frame-${frameRandomId}`);
        if (frame && frame.scrollLeft === frame.scrollWidth - frame.clientWidth) {
          frame.scrollLeft = 0;
        } else if (frame) {
          frame.scrollLeft += frame.clientWidth;
        }
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [autoChange]);
  return (
    <section className={styles["scroll-snap-gallery"]}>
      <div
        id={`frame-${frameRandomId}`}
        className={styles["frame"]}
        style={{ ...frameStyle, width, height }}
        onScroll={handleScroll}
      >
        {urls.map((url, index) => {
          return (
            <img
              key={url + index}
              src={url}
              alt={alts ? alts[index] : "gallery picture"}
            />
          );
        })}
      </div>
      <div className={styles["arrow-controls"]}>
        {showArrows && (
          <BsArrowLeftCircle
            className={styles["arrow"]}
            onClick={() => {
              const frame = document.querySelector(
                `.${styles["frame"]}`
              ) as HTMLDivElement;
              frame.scrollLeft -= frame.clientWidth;
            }}
          />
        )}
        <div
          className={styles["position-indicator"]}
          style={{
            transform: `translateX(calc(50% - ${positionIndicatorXtranslateValue}px - ${
              (iconSize * positionIndicatorSize) / 2
            }px))`,
          }}
        >
          {urls.map((url, index) => (
            <IndicatorIcon
              key={url + index}
              className={indicatorIconStyle(index)}
              style={{ width: iconSize, height: iconSize }}
            />
          ))}
        </div>
        {showArrows && (
          <BsArrowRightCircle
            className={styles["arrow"]}
            onClick={() => {
              const frame = document.querySelector(
                `.${styles["frame"]}`
              ) as HTMLDivElement;
              frame.scrollLeft += frame.clientWidth;
            }}
          />
        )}
      </div>
    </section>
  );
};

export default ScrollSnapGallery;
