import React from "react";
import { IconType } from "react-icons/lib";
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
declare const ScrollSnapGallery: ({ urls, alts, width, height, IndicatorIcon, positionIndicatorSize, iconSize, showArrows, frameStyle, onSlideChange, autoChange, }: ScrollSnapGalleryProps) => React.JSX.Element;
export default ScrollSnapGallery;
