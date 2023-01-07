"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authomaticScrollInGrid = exports.startAuthomaticScrollInGrid = exports.defineMonthsArray = exports.defineListElementsArrayVisibleList = exports.defineYOffset = exports.defineVisibleDatesArray = exports.defineXOffset = exports.defineMinimalVisibleDate = exports.minimalDateMilliseconds = exports.scrollByDate = void 0;
const react_1 = __importDefault(require("react"));
//Utils
const jsToSqlDate_1 = __importDefault(require("../../utils/jsToSqlDate"));
const monthYearString_1 = __importDefault(require("../../utils/monthYearString"));
//Variables
const constants_1 = require("../../common/constants");
/**
 *
 * @param dateObject Date Object
 * @param elementRef ref of the element that will be scrolled
 * @param leftPagination number of cells to the left
 * @param cellsWidth width of cells
 */
function scrollByDate(dateObject, elementRef, leftPagination, cellsWidth) {
    //nueva posicion de scroll horizontal = cantidad de dias hasta hoy * ancho de celda
    if (elementRef.current !== null) {
        elementRef.current.scrollLeft =
            ((Date.parse(dateObject.toString()) -
                (Date.parse(new Date().toString()) -
                    (leftPagination + 1) * constants_1.millisecondsOfOneDay)) /
                constants_1.millisecondsOfOneDay) *
                cellsWidth;
    }
}
exports.scrollByDate = scrollByDate;
/**
 *
 * @param xPosition position X of grid
 * @param cellsWidth width of grid cells
 * @param leftPagination number of cells to the left
 * @param initialDateOffset offset of cells for the initial date
 * @returns milliseconds of the minimal date
 */
function minimalDateMilliseconds(xPosition, cellsWidth, leftPagination, initialDateOffset) {
    let minimalDate = new Date(Date.parse(new Date().toString()) +
        constants_1.millisecondsOfOneDay *
            (Math.floor(xPosition / cellsWidth) - leftPagination - initialDateOffset));
    minimalDate.setHours(12, 0, 0, 0);
    return Date.parse(minimalDate.toString());
}
exports.minimalDateMilliseconds = minimalDateMilliseconds;
/**
 *
 * @param millisecondsOfMinimalDate milliseconds of the minimal date
 * @param initialDateOffset offset of number of cells for initial date
 * @returns The minimal visible date object
 */
function defineMinimalVisibleDate(millisecondsOfMinimalDate, initialDateOffset) {
    return new Date(millisecondsOfMinimalDate + initialDateOffset * constants_1.millisecondsOfOneDay);
}
exports.defineMinimalVisibleDate = defineMinimalVisibleDate;
/**
 *
 * @param xPosition current x position in the grid horizontal scroll
 * @param cellsWidth width of grid cells
 * @param chunkRenderX extra rendered cells in a row
 * @returns number X offset
 */
function defineXOffset(xPosition, cellsWidth, chunkRenderX) {
    return Math.floor(xPosition / cellsWidth) - chunkRenderX;
}
exports.defineXOffset = defineXOffset;
/**
 *
 * @param paginationWidth width of pagination of horizontal axis of the grid
 * @param chunkRenderX extra rendered cells in every row
 * @param minimalDateMilliseconds milliseconds of the minimal date
 * @returns an array containing all the dates that should be rendered base on position of x scroll
 */
function defineVisibleDatesArray(paginationWidth, chunkRenderX, minimalDateMilliseconds) {
    let array = [];
    for (let index = 0; index < paginationWidth + chunkRenderX * 2; index++) {
        array[index] = new Date(minimalDateMilliseconds + constants_1.millisecondsOfOneDay * (index + 1));
    }
    return array;
}
exports.defineVisibleDatesArray = defineVisibleDatesArray;
/**
 *
 * @param yPosition current y position in the grid vertical scroll
 * @param cellsHeight height of grid cells
 * @param chunkRenderY extra rendered cells in every column
 * @returns number Y offset
 */
function defineYOffset(yPosition, cellsHeight, chunkRenderY) {
    let desfase = Math.floor(yPosition / cellsHeight) - chunkRenderY;
    if (desfase < 0)
        desfase = 0;
    return desfase;
}
exports.defineYOffset = defineYOffset;
/**
 *
 * @param paginationHeight height of pagination of the vertical axis of the grid
 * @param chunkRenderY extra rendered cells in every column
 * @param offset offset from top of the list
 * @param listElementsIds all ids array
 * @returns Array of the destinies that will be rendered
 */
function defineListElementsArrayVisibleList(paginationHeight, chunkRenderY, offset, listElementsIds) {
    let array = [];
    for (let index = 0; index < paginationHeight + chunkRenderY * 2; index++) {
        if (listElementsIds[index + offset] && index + offset >= 0)
            array[index] = listElementsIds[index + offset];
    }
    return array;
}
exports.defineListElementsArrayVisibleList = defineListElementsArrayVisibleList;
/**
 *
 * @param leftPagination number of cells to the left
 * @param language language object for traductions
 * @returns string of the date, month followed by year
 */
function defineMonthsArray(leftPagination, rightPagination, language) {
    let minimumDateMilliseconds = Date.parse(new Date().toString()) - leftPagination * constants_1.millisecondsOfOneDay;
    let maximumDateMilliseconds = Date.parse(new Date().toString()) + rightPagination * constants_1.millisecondsOfOneDay;
    let array = [];
    let sideArray = [];
    for (let index = 0; index * constants_1.millisecondsOfOneDay + minimumDateMilliseconds < maximumDateMilliseconds; index++) {
        let dateObject = new Date(constants_1.millisecondsOfOneDay * index + minimumDateMilliseconds);
        let firstDayOfTheMonth = dateObject;
        firstDayOfTheMonth.setDate(1);
        firstDayOfTheMonth.setHours(12, 0, 0, 0);
        let dateString = (0, monthYearString_1.default)(dateObject, language);
        if (!sideArray.includes(dateString)) {
            sideArray.push(dateString);
            array.push(react_1.default.createElement("option", {
                key: (0, jsToSqlDate_1.default)(firstDayOfTheMonth),
                value: (0, jsToSqlDate_1.default)(firstDayOfTheMonth),
            }, dateString));
        }
    }
    return array;
}
exports.defineMonthsArray = defineMonthsArray;
/**
 *
 * @param holdingClic boolean to know if mouse id down
 * @param xClientPosition position x of the client
 * @param yClientPosition position y of the client
 * @param widthHorizontalBorder horizontal border of activation
 * @param widthVerticalBorder vertical border of activation
 * @param gridRef ref ofthe grid container
 */
function startAuthomaticScrollInGrid(holdingClic, xClientPosition, yClientPosition, widthHorizontalBorder, widthVerticalBorder, gridRef) {
    if (holdingClic && gridRef.current !== null) {
        if (xClientPosition < widthHorizontalBorder)
            gridRef.current.scrollLeft -= 10;
        if (xClientPosition > gridRef.current.offsetWidth - widthHorizontalBorder)
            gridRef.current.scrollLeft += 10;
        if (yClientPosition < widthVerticalBorder)
            gridRef.current.scrollTop -= 10;
        if (yClientPosition > gridRef.current.offsetHeight - widthVerticalBorder)
            gridRef.current.scrollTop += 10;
    }
}
exports.startAuthomaticScrollInGrid = startAuthomaticScrollInGrid;
/**
 *
 * @param holdingClic boolean to know if mouse id down
 * @param xClientPosition position x of the client
 * @param yClientPosition position y of the client
 * @param widthHorizontalBorder horizontal border of activation
 * @param widthVerticalBorder vertical border of activation
 * @param gridContainer grid container
 */
function authomaticScrollInGrid(holdingClic, xClientPosition, yClientPosition, widthHorizontalBorder, widthVerticalBorder, gridContainer) {
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
exports.authomaticScrollInGrid = authomaticScrollInGrid;
