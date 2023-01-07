import React, { useEffect, useState, useRef } from "react";
import * as Funciones from "./MulticalendarOwnFunctions";
import "./Multicalendar.css";
//Assets
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
//Componentes
import DatesRow from "./subcomponents/individuals/DatesRow/DatesRow";
import ListElementsColumn from "./subcomponents/composites/ListElementsColumn/ListElementsColumn";
import DatesGrid from "./subcomponents/composites/DatesGrid/DatesGrid";
import DropdownMonthNavigation from "./subcomponents/individuals/DropdownMonthNavigation/DropdownMonthNavigation";
//Hooks
import useWindowSize from "../../hooks/useWindowsSize";
//Utils
import sqlToJsDate from "../../utils/sqlToJsDate";
//Services
import { eraseMulticalendarYScrollPosition, getMulticalendarYScrollPosition, } from "../../Services/MulticalendarStatesAndSettings";
const Multicalendar = ({ multicalendarId, ReactCellChildren, ReactListElementChildren, listElementsIdsArray, language, pastDatesVisible = true, cellsWidth = 120, cellsHeight = 80, verticalAxisWidth = 280, horizontalAxisHeight = 148, pastDaysInitialQuantity = 365, futureDaysInitialQuantity = 365, chunkRenderX = 0, chunkRenderY = 0, dynamicDaysQuantity = false, draggingOverDateCells = false, waitTimeForCalls = 500, callsOnScrollingMoves, callsOnScrollingStops, aditionalControlsComponents, upperLeftComponent, }) => {
    //Constantes del componente
    const origin = {
        x: pastDatesVisible ? Math.ceil(pastDaysInitialQuantity) * cellsWidth : 0,
        y: 0,
    };
    const initialDateOffset = 2 + chunkRenderX;
    //Refs
    const datesRowRef = useRef(null);
    const destiniesColumnRef = useRef(null);
    const gridWrapperRef = useRef(null);
    //Estados
    const [firtsCall, setFirtsCall] = useState(false);
    const [windowWidth, windowHeight] = useWindowSize();
    const [futureDaysQuantity, setFutureDaysQuantity] = useState(Math.ceil(futureDaysInitialQuantity));
    const [pastDaysQuantity, setPastDaysQuantity] = useState(pastDatesVisible ? Math.ceil(pastDaysInitialQuantity) : 0);
    const [paginationWidth, setPaginationWidth] = useState(0);
    const [paginationHeight, setPaginationHeight] = useState(0);
    const [xOffset, setXOffset] = useState(1);
    const [yOffset, setYOffset] = useState(0);
    const [visibleDates, setVisibleDates] = useState([]);
    const [visibleListElementsIds, setVisibleListElementsIds] = useState([]);
    const [updateList, setUpdateList] = useState(false);
    const [xPosition, setXPosition] = useState(origin.x);
    const [yPosition, setYPosition] = useState(origin.y);
    const [renderCoordinates, setRenderCoordinates] = useState({
        x: origin.x,
        y: origin.y,
    });
    const [minimumVisibleDate, setMinimumVisibleDate] = useState(new Date());
    const [idTimeoutForCalls, setIdTimeoutForCalls] = useState(undefined);
    const [clientXPositionOnGrid, setClientXPositionOnGrid] = useState(undefined);
    const [clientYPositionOnGrid, setClientYPositionOnGrid] = useState(undefined);
    const [scrollingOnCourse, setScrollingOnCourse] = useState(false);
    //UseEffects
    useEffect(() => {
        if (pastDatesVisible) {
            setPastDaysQuantity(Math.ceil(pastDaysInitialQuantity));
        }
        else {
            setPastDaysQuantity(0);
        }
    }, [pastDatesVisible, pastDaysInitialQuantity]);
    useEffect(() => {
        //Delegamos un cambio de estado a los primero renderes para evitar duplicado de llamadas a la API
        if (!firtsCall) {
            setFirtsCall(true);
            //Cached Y position
            let newYPosition = getMulticalendarYScrollPosition(multicalendarId);
            if (newYPosition !== null && newYPosition !== "0") {
                if (gridWrapperRef.current) {
                    gridWrapperRef.current.scrollTop = Number(newYPosition);
                    eraseMulticalendarYScrollPosition(multicalendarId);
                }
            }
        }
    }, [firtsCall]);
    useEffect(() => {
        // Posicionamiento inicial en X
        if (gridWrapperRef.current !== null) {
            gridWrapperRef.current.scrollLeft = origin.x;
        }
    }, [origin.x]);
    useEffect(() => {
        setUpdateList(true);
        // Dimensiones de paginacion, requiere agregar 1 para no ver espacios en blanco
        setPaginationWidth(Math.ceil((windowWidth - verticalAxisWidth) / cellsWidth) + 1);
        setPaginationHeight(Math.ceil((windowHeight - horizontalAxisHeight) / cellsHeight) + 1);
        // Redefinicion de posicion X ante cambios en el tamaño de la ventana
        if (gridWrapperRef.current !== null) {
            setXPosition(gridWrapperRef.current.scrollLeft);
            setRenderCoordinates({
                x: gridWrapperRef.current.scrollLeft,
                y: gridWrapperRef.current.scrollTop,
            });
            setXOffset(Math.floor(gridWrapperRef.current.scrollLeft / cellsWidth) - chunkRenderX);
        }
    }, [
        windowWidth,
        windowHeight,
        verticalAxisWidth,
        horizontalAxisHeight,
        cellsHeight,
        cellsWidth,
        chunkRenderX,
    ]);
    useEffect(() => {
        // Definicion de visibilidad y renderizacion del Eje Y
        if ((renderCoordinates.x === origin.x && renderCoordinates.y === origin.y) ||
            Math.abs(renderCoordinates.y - yPosition) / cellsHeight > chunkRenderY ||
            updateList) {
            if (!(renderCoordinates.x === origin.x && renderCoordinates.y === origin.y)) {
                if (gridWrapperRef.current !== null)
                    setRenderCoordinates({
                        x: gridWrapperRef.current.scrollLeft,
                        y: gridWrapperRef.current.scrollTop,
                    });
            }
            let desfase = Funciones.defineYOffset(yPosition, cellsHeight, chunkRenderY);
            setYOffset(desfase);
            setVisibleListElementsIds(Funciones.defineListElementsArrayVisibleList(paginationHeight, chunkRenderY, desfase, listElementsIdsArray));
            if (updateList)
                setUpdateList(false);
        }
    }, [
        updateList,
        yPosition,
        cellsHeight,
        chunkRenderY,
        origin.x,
        origin.y,
        paginationHeight,
        renderCoordinates.x,
        renderCoordinates.y,
        listElementsIdsArray,
    ]);
    useEffect(() => {
        // Definicion de visibilidad y renderizacion del Eje X
        if ((renderCoordinates.x === origin.x && renderCoordinates.y === origin.y) ||
            xPosition < cellsWidth ||
            Math.abs(renderCoordinates.x - xPosition) / cellsWidth > chunkRenderX ||
            updateList) {
            setVisibleDates([]);
            if (!(renderCoordinates.x === origin.x && renderCoordinates.y === origin.y)) {
                if (gridWrapperRef.current !== null)
                    setRenderCoordinates({
                        x: gridWrapperRef.current.scrollLeft,
                        y: gridWrapperRef.current.scrollTop,
                    });
            }
            setXOffset(Funciones.defineXOffset(xPosition, cellsWidth, chunkRenderX));
            const fechaMinimaMilisegundos = Funciones.minimalDateMilliseconds(xPosition, cellsWidth, pastDaysQuantity, initialDateOffset);
            setMinimumVisibleDate(Funciones.defineMinimalVisibleDate(fechaMinimaMilisegundos, initialDateOffset));
            if (updateList)
                setUpdateList(false);
            setVisibleDates(Funciones.defineVisibleDatesArray(paginationWidth, chunkRenderX, fechaMinimaMilisegundos));
        }
    }, [
        updateList,
        paginationWidth,
        xPosition,
        chunkRenderX,
        cellsWidth,
        initialDateOffset,
        pastDaysQuantity,
        renderCoordinates.x,
        renderCoordinates.y,
        origin.x,
        origin.y,
    ]);
    useEffect(() => {
        setScrollingOnCourse(true);
        clearTimeout(idTimeoutForCalls);
        setIdTimeoutForCalls(undefined);
        // eslint-disable-next-line
    }, [xPosition, yPosition]);
    useEffect(() => {
        if (idTimeoutForCalls === undefined) {
            let _id = setTimeout(() => setScrollingOnCourse(false), waitTimeForCalls);
            setIdTimeoutForCalls(_id);
        }
    }, [xPosition, yPosition, idTimeoutForCalls, waitTimeForCalls]);
    useEffect(() => {
        if (scrollingOnCourse && callsOnScrollingMoves) {
            callsOnScrollingMoves();
        }
        else if (!scrollingOnCourse && callsOnScrollingStops) {
            callsOnScrollingStops();
        }
        // eslint-disable-next-line
    }, [scrollingOnCourse]);
    //Cancelar idIntervalo Autoscroll de rango cuando se deja de seleccionar
    useEffect(() => {
        if (!draggingOverDateCells) {
            if (clientXPositionOnGrid !== undefined)
                setClientXPositionOnGrid(undefined);
            if (clientYPositionOnGrid !== undefined)
                setClientYPositionOnGrid(undefined);
        }
    }, [draggingOverDateCells, clientXPositionOnGrid, clientYPositionOnGrid]);
    //Render
    return (React.createElement("div", { "data-testid": "multicalendar", className: "multicalendar", style: {
            gridTemplateColumns: `${verticalAxisWidth}px`,
            gridTemplateRows: `70px ${horizontalAxisHeight - 70}px calc(100% - ${horizontalAxisHeight}px`,
        } },
        React.createElement("div", { className: "controls" },
            React.createElement("div", { className: "div-dates-navigation" },
                React.createElement(DropdownMonthNavigation, { minimumVisibleDate: minimumVisibleDate, onChangeAction: (valorDeOpcion) => {
                        Funciones.scrollByDate(new Date(Number(Date.parse(sqlToJsDate(valorDeOpcion).toString()))), gridWrapperRef, pastDaysQuantity, cellsWidth);
                    }, options: Funciones.defineMonthsArray(pastDaysQuantity, futureDaysQuantity, language) }),
                React.createElement("button", { onClick: () => Funciones.scrollByDate(new Date(), gridWrapperRef, pastDaysQuantity, cellsWidth) }, language["Today"])),
            aditionalControlsComponents && (React.createElement("div", { className: "div-aditional-controls-components" }, aditionalControlsComponents))),
        React.createElement("div", { className: "div-upper-left-component" }, upperLeftComponent),
        React.createElement("div", { className: "vertical-axis" },
            React.createElement("div", { ref: destiniesColumnRef, className: "div-list-element-column", onScroll: (e) => {
                    // Se puede hacer funcion
                    if (gridWrapperRef.current !== null)
                        gridWrapperRef.current.scrollTop = e.target.scrollTop;
                } },
                React.createElement(ListElementsColumn, { listHeight: cellsHeight * listElementsIdsArray.length, yOffset: yOffset, elementsHeight: cellsHeight, idsArray: visibleListElementsIds, ReactListElementChildren: ReactListElementChildren }))),
        React.createElement("div", { className: "horizontal-axis" },
            React.createElement("div", { className: "div-weeks-buttons" },
                React.createElement("button", { className: "past-week-button", onClick: () => {
                        // Se puede hacer funcion
                        if (datesRowRef.current !== null)
                            datesRowRef.current.scroll({
                                left: datesRowRef.current.scrollLeft - cellsWidth * 7,
                            });
                    } },
                    React.createElement(BsChevronLeft, null)),
                React.createElement("button", { onClick: () => {
                        // Se puede hacer funcion
                        if (datesRowRef.current !== null)
                            datesRowRef.current.scroll({
                                left: datesRowRef.current.scrollLeft + cellsWidth * 7,
                            });
                    }, className: "next-week-button" },
                    React.createElement(BsChevronRight, null))),
            React.createElement("div", { ref: datesRowRef, className: "div-dates-row", onScroll: (e) => {
                    if (gridWrapperRef.current !== null)
                        gridWrapperRef.current.scrollLeft = e.target.scrollLeft;
                } },
                React.createElement(DatesRow, { visibleDates: visibleDates, width: (pastDaysQuantity + futureDaysQuantity) * cellsWidth, height: 64, cellsWidth: cellsWidth, cellsHeight: 64, offset: xOffset, language: language }))),
        React.createElement("div", { className: "div-main-container" },
            React.createElement("div", { ref: gridWrapperRef, className: "main-container", onScroll: (e) => {
                    if (datesRowRef.current !== null) {
                        datesRowRef.current.scrollLeft = e.target.scrollLeft;
                        setXPosition(e.target.scrollLeft);
                    }
                    if (destiniesColumnRef.current !== null) {
                        destiniesColumnRef.current.scrollTop = e.target.scrollTop;
                        setYPosition(e.target.scrollTop);
                    }
                    if (dynamicDaysQuantity &&
                        e.target.scrollLeft +
                            e.target.offsetWidth >
                            (pastDaysQuantity + futureDaysQuantity) * cellsWidth - cellsWidth) {
                        setFutureDaysQuantity(futureDaysQuantity + 1);
                    }
                    if (pastDatesVisible &&
                        dynamicDaysQuantity &&
                        e.target.scrollLeft < cellsWidth) {
                        setPastDaysQuantity(pastDaysQuantity + 1);
                        e.target.scrollLeft = cellsWidth * 3;
                    }
                    Funciones.authomaticScrollInGrid(draggingOverDateCells, clientXPositionOnGrid, clientYPositionOnGrid, cellsWidth, cellsHeight, e.target);
                }, onMouseMove: (e) => {
                    if (gridWrapperRef.current !== null && draggingOverDateCells) {
                        let x = e.clientX - gridWrapperRef.current.getBoundingClientRect().left;
                        let y = e.clientY - gridWrapperRef.current.getBoundingClientRect().top;
                        setClientXPositionOnGrid(x);
                        setClientYPositionOnGrid(y);
                        Funciones.startAuthomaticScrollInGrid(draggingOverDateCells, x, y, cellsWidth, cellsHeight, gridWrapperRef);
                    }
                } },
                React.createElement(DatesGrid, { gridWidth: (pastDaysQuantity + futureDaysQuantity) * cellsWidth, gridHeight: cellsHeight * listElementsIdsArray.length, xOffset: xOffset, yOffset: yOffset, cellsWidth: cellsWidth, cellsHeight: cellsHeight, visibleListElementsIdsArray: visibleListElementsIds, visibleDates: visibleDates, ReactCellChildren: ReactCellChildren })))));
};
export default Multicalendar;
