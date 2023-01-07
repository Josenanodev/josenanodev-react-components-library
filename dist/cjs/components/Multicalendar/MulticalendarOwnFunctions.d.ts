import React from "react";
import { languageType } from "../../languages/types";
/**
 *
 * @param dateObject Date Object
 * @param elementRef ref of the element that will be scrolled
 * @param leftPagination number of cells to the left
 * @param cellsWidth width of cells
 */
export declare function scrollByDate(dateObject: Date, elementRef: React.RefObject<HTMLDivElement>, leftPagination: number, cellsWidth: number): void;
/**
 *
 * @param xPosition position X of grid
 * @param cellsWidth width of grid cells
 * @param leftPagination number of cells to the left
 * @param initialDateOffset offset of cells for the initial date
 * @returns milliseconds of the minimal date
 */
export declare function minimalDateMilliseconds(xPosition: number, cellsWidth: number, leftPagination: number, initialDateOffset: number): number;
/**
 *
 * @param millisecondsOfMinimalDate milliseconds of the minimal date
 * @param initialDateOffset offset of number of cells for initial date
 * @returns The minimal visible date object
 */
export declare function defineMinimalVisibleDate(millisecondsOfMinimalDate: number, initialDateOffset: number): Date;
/**
 *
 * @param xPosition current x position in the grid horizontal scroll
 * @param cellsWidth width of grid cells
 * @param chunkRenderX extra rendered cells in a row
 * @returns number X offset
 */
export declare function defineXOffset(xPosition: number, cellsWidth: number, chunkRenderX: number): number;
/**
 *
 * @param paginationWidth width of pagination of horizontal axis of the grid
 * @param chunkRenderX extra rendered cells in every row
 * @param minimalDateMilliseconds milliseconds of the minimal date
 * @returns an array containing all the dates that should be rendered base on position of x scroll
 */
export declare function defineVisibleDatesArray(paginationWidth: number, chunkRenderX: number, minimalDateMilliseconds: number): Date[];
/**
 *
 * @param yPosition current y position in the grid vertical scroll
 * @param cellsHeight height of grid cells
 * @param chunkRenderY extra rendered cells in every column
 * @returns number Y offset
 */
export declare function defineYOffset(yPosition: number, cellsHeight: number, chunkRenderY: number): number;
/**
 *
 * @param paginationHeight height of pagination of the vertical axis of the grid
 * @param chunkRenderY extra rendered cells in every column
 * @param offset offset from top of the list
 * @param listElementsIds all ids array
 * @returns Array of the destinies that will be rendered
 */
export declare function defineListElementsArrayVisibleList(paginationHeight: number, chunkRenderY: number, offset: number, listElementsIds: string[] | number[]): string[] | number[];
/**
 *
 * @param leftPagination number of cells to the left
 * @param language language object for traductions
 * @returns string of the date, month followed by year
 */
export declare function defineMonthsArray(leftPagination: number, rightPagination: number, language: languageType): JSX.Element[];
/**
 *
 * @param holdingClic boolean to know if mouse id down
 * @param xClientPosition position x of the client
 * @param yClientPosition position y of the client
 * @param widthHorizontalBorder horizontal border of activation
 * @param widthVerticalBorder vertical border of activation
 * @param gridRef ref ofthe grid container
 */
export declare function startAuthomaticScrollInGrid(holdingClic: boolean, xClientPosition: number, yClientPosition: number, widthHorizontalBorder: number, widthVerticalBorder: number, gridRef: React.RefObject<HTMLDivElement>): void;
/**
 *
 * @param holdingClic boolean to know if mouse id down
 * @param xClientPosition position x of the client
 * @param yClientPosition position y of the client
 * @param widthHorizontalBorder horizontal border of activation
 * @param widthVerticalBorder vertical border of activation
 * @param gridContainer grid container
 */
export declare function authomaticScrollInGrid(holdingClic: boolean, xClientPosition: number | undefined, yClientPosition: number | undefined, widthHorizontalBorder: number, widthVerticalBorder: number, gridContainer: HTMLDivElement): void;
