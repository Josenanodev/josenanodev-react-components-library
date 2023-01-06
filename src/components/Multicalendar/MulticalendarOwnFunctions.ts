import React from "react";

//Utils
import jsToSqlDate from "../../utils/jsToSqlDate";
import monthYearString from "../../utils/monthYearString";

//Variables
import { millisecondsOfOneDay } from "../../common/constants";

//Types
import { languageType } from "../../languages/types";

/**
 *
 * @param dateObject Date Object
 * @param elementRef ref of the element that will be scrolled
 * @param leftPagination number of cells to the left
 * @param cellsWidth width of cells
 */
export function scrollByDate(
  dateObject: Date,
  elementRef: React.RefObject<HTMLDivElement>,
  leftPagination: number,
  cellsWidth: number
) {
  //nueva posicion de scroll horizontal = cantidad de dias hasta hoy * ancho de celda
  if (elementRef.current !== null) {
    elementRef.current.scrollLeft =
      ((Date.parse(dateObject.toString()) -
        (Date.parse(new Date().toString()) -
          (leftPagination + 1) * millisecondsOfOneDay)) /
        millisecondsOfOneDay) *
      cellsWidth;
  }
}

/**
 *
 * @param xPosition position X of grid
 * @param cellsWidth width of grid cells
 * @param leftPagination number of cells to the left
 * @param initialDateOffset offset of cells for the initial date
 * @returns milliseconds of the minimal date
 */
export function minimalDateMilliseconds(
  xPosition: number,
  cellsWidth: number,
  leftPagination: number,
  initialDateOffset: number
) {
  let minimalDate = new Date(
    Date.parse(new Date().toString()) +
      millisecondsOfOneDay *
        (Math.floor(xPosition / cellsWidth) - leftPagination - initialDateOffset)
  );
  minimalDate.setHours(12, 0, 0, 0);
  return Date.parse(minimalDate.toString());
}

/**
 *
 * @param millisecondsOfMinimalDate milliseconds of the minimal date
 * @param initialDateOffset offset of number of cells for initial date
 * @returns The minimal visible date object
 */
export function defineMinimalVisibleDate(
  millisecondsOfMinimalDate: number,
  initialDateOffset: number
) {
  return new Date(millisecondsOfMinimalDate + initialDateOffset * millisecondsOfOneDay);
}

/**
 *
 * @param xPosition current x position in the grid horizontal scroll
 * @param cellsWidth width of grid cells
 * @param chunkRenderX extra rendered cells in a row
 * @returns number X offset
 */
export function defineXOffset(
  xPosition: number,
  cellsWidth: number,
  chunkRenderX: number
) {
  return Math.floor(xPosition / cellsWidth) - chunkRenderX;
}

/**
 *
 * @param paginationWidth width of pagination of horizontal axis of the grid
 * @param chunkRenderX extra rendered cells in every row
 * @param minimalDateMilliseconds milliseconds of the minimal date
 * @returns an array containing all the dates that should be rendered base on position of x scroll
 */
export function defineVisibleDatesArray(
  paginationWidth: number,
  chunkRenderX: number,
  minimalDateMilliseconds: number
) {
  let array: Date[] = [];
  for (let index = 0; index < paginationWidth + chunkRenderX * 2; index++) {
    array[index] = new Date(minimalDateMilliseconds + millisecondsOfOneDay * (index + 1));
  }
  return array;
}

/**
 *
 * @param yPosition current y position in the grid vertical scroll
 * @param cellsHeight height of grid cells
 * @param chunkRenderY extra rendered cells in every column
 * @returns number Y offset
 */
export function defineYOffset(
  yPosition: number,
  cellsHeight: number,
  chunkRenderY: number
) {
  let desfase = Math.floor(yPosition / cellsHeight) - chunkRenderY;
  if (desfase < 0) desfase = 0;
  return desfase;
}

/**
 *
 * @param paginationHeight height of pagination of the vertical axis of the grid
 * @param chunkRenderY extra rendered cells in every column
 * @param offset offset from top of the list
 * @param listElementsIds all ids array
 * @returns Array of the destinies that will be rendered
 */
export function defineListElementsArrayVisibleList(
  paginationHeight: number,
  chunkRenderY: number,
  offset: number,
  listElementsIds: string[] | number[]
): string[] | number[] {
  let array: string[] | number[] = [];
  for (let index = 0; index < paginationHeight + chunkRenderY * 2; index++) {
    if (listElementsIds[index + offset] && index + offset >= 0)
      array[index] = Object.assign({}, listElementsIds[index + offset]);
  }
  return array;
}

/**
 *
 * @param leftPagination number of cells to the left
 * @param language language object for traductions
 * @returns string of the date, month followed by year
 */
export function defineMonthsArray(leftPagination: number, language: languageType) {
  let minimumDateMilliseconds =
    Date.parse(new Date().toString()) - leftPagination * millisecondsOfOneDay;
  let maximumDateMilliseconds =
    Date.parse(new Date().toString()) + leftPagination * millisecondsOfOneDay;
  let array: JSX.Element[] = [];
  let sideArray: string[] = [];
  for (
    let index = 0;
    index * millisecondsOfOneDay + minimumDateMilliseconds < maximumDateMilliseconds;
    index++
  ) {
    let dateObject = new Date(millisecondsOfOneDay * index + minimumDateMilliseconds);
    let firstDayOfTheMonth = dateObject;
    firstDayOfTheMonth.setDate(1);
    firstDayOfTheMonth.setHours(12, 0, 0, 0);
    let dateString = monthYearString(dateObject, language);
    if (!sideArray.includes(dateString)) {
      sideArray.push(dateString);
      array.push(
        React.createElement(
          "option",
          {
            key: jsToSqlDate(firstDayOfTheMonth),
            value: jsToSqlDate(firstDayOfTheMonth),
          },
          dateString
        )
      );
    }
  }
  return array;
}

/**
 *
 * @param holdingClic boolean to know if mouse id down
 * @param xClientPosition position x of the client
 * @param yClientPosition position y of the client
 * @param widthHorizontalBorder horizontal border of activation
 * @param widthVerticalBorder vertical border of activation
 * @param gridRef ref ofthe grid container
 */
export function startAuthomaticScrollInGrid(
  holdingClic: boolean,
  xClientPosition: number,
  yClientPosition: number,
  widthHorizontalBorder: number,
  widthVerticalBorder: number,
  gridRef: React.RefObject<HTMLDivElement>
) {
  if (holdingClic && gridRef.current !== null) {
    if (xClientPosition < widthHorizontalBorder) gridRef.current.scrollLeft -= 10;
    if (xClientPosition > gridRef.current.offsetWidth - widthHorizontalBorder)
      gridRef.current.scrollLeft += 10;
    if (yClientPosition < widthVerticalBorder) gridRef.current.scrollTop -= 10;
    if (yClientPosition > gridRef.current.offsetHeight - widthVerticalBorder)
      gridRef.current.scrollTop += 10;
  }
}

/**
 *
 * @param holdingClic boolean to know if mouse id down
 * @param xClientPosition position x of the client
 * @param yClientPosition position y of the client
 * @param widthHorizontalBorder horizontal border of activation
 * @param widthVerticalBorder vertical border of activation
 * @param gridContainer grid container
 */
export function authomaticScrollInGrid(
  holdingClic: boolean,
  xClientPosition: number | undefined,
  yClientPosition: number | undefined,
  widthHorizontalBorder: number,
  widthVerticalBorder: number,
  gridContainer: HTMLDivElement
) {
  if (holdingClic) {
    if (xClientPosition) {
      if (xClientPosition < widthHorizontalBorder)
        gridContainer.scrollLeft -= widthHorizontalBorder - xClientPosition;
      if (xClientPosition > gridContainer.offsetWidth - widthHorizontalBorder)
        gridContainer.scrollLeft +=
          xClientPosition + widthHorizontalBorder - gridContainer.offsetWidth;
    }
    if (yClientPosition) {
      if (yClientPosition < widthVerticalBorder)
        gridContainer.scrollTop -= widthVerticalBorder - yClientPosition;
      if (yClientPosition > gridContainer.offsetHeight - widthVerticalBorder)
        gridContainer.scrollTop +=
          yClientPosition + widthVerticalBorder - gridContainer.offsetHeight;
    }
  }
}
