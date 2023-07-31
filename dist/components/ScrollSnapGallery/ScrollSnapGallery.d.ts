import React from "react";
import { IconType } from "react-icons/lib";
type ScrollSnapGalleryProps = {
    urls: string[];
    width?: string;
    height?: string;
    IndicatorIcon?: IconType;
    positionIndicatorSize?: number;
    iconSize?: number;
    showArrows?: boolean;
    frameStyle?: React.CSSProperties;
};
declare const ScrollSnapGallery: ({ urls, width, height, IndicatorIcon, positionIndicatorSize, iconSize, showArrows, frameStyle, }: ScrollSnapGalleryProps) => React.JSX.Element;
export default ScrollSnapGallery;
