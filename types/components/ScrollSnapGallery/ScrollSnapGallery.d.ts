import React from "react";
import { IconType } from "react-icons/lib";
type ScrollSnapGalleryProps = {
    /** Image URLs rendered as slides. */
    urls: string[];
    /** Optional alt text array matched by slide index. */
    alts?: string[];
    /** CSS width applied to the scroll frame. */
    width?: string;
    /** CSS height applied to the scroll frame. */
    height?: string;
    /** Icon component used for position indicators. */
    IndicatorIcon?: IconType;
    /** Number of indicator icons emphasized at one time. */
    positionIndicatorSize?: number;
    /** Indicator icon size in pixels. */
    iconSize?: number;
    /** Shows previous and next arrow controls. */
    showArrows?: boolean;
    /** Inline styles applied to the image frame. */
    frameStyle?: React.CSSProperties;
    /** Called with the active slide index after scrolling. */
    onSlideChange?: (index: number) => void;
    /** Automatically advances the gallery every 3 seconds. */
    autoChange?: boolean;
};
declare const ScrollSnapGallery: ({ urls, alts, width, height, IndicatorIcon, positionIndicatorSize, iconSize, showArrows, frameStyle, onSlideChange, autoChange, }: ScrollSnapGalleryProps) => React.JSX.Element;
export default ScrollSnapGallery;
