import React, { useEffect, useState, useRef } from "react";
import * as Funciones from "./MulticalendarOwnFunctions";
import "./Multicalendar.css";
//Assets
import * as BootstrapIcons from "react-icons/bs";
//Componentes
import DatesRow from "./subcomponents/individuals/DatesRow/DatesRow";
import ListElementsColumn from "./subcomponents/composites/ListElementsColumn/ListElementsColumn";
import DatesGrid from "./subcomponents/composites/DatesGrid/DatesGrid";
import DropdownNavegadorMeses from "./subcomponents/individuals/DropdownMonthNavigation/DropdownMonthNavigation";
//Hooks
import useWindowSize from "../../hooks/useWindowsSize";
//Utils
import sqlToJsDate from "../../utils/sqlToJsDate";
//Services
import { eraseMulticalendarYScrollPosition, getMulticalendarYScrollPosition, } from "../../Services/MulticalendarStatesAndSettings";
const Multicalendar = ({ multicalendarId, ReactCellChildren, ReactListElementChildren, listElementsIdsArray, language, cellsWidth = 120, cellsHeight = 80, verticalAxisWidth = 280, horizontalAxisHeight = 148, horizontalInitialCellQuantity = 1000, chunkRenderX = 0, chunkRenderY = 0, dynamicPagination = false, draggingOverDateCells = false, logoUrl, waitTimeForCalls = 500, callsOnScrollingStops, }) => {
    //Constantes del componente
    const origin = {
        x: Math.ceil(horizontalInitialCellQuantity / 2) * cellsWidth,
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
    const [rightPagination, setRightPagination] = useState(Math.ceil(horizontalInitialCellQuantity / 2));
    const [leftPagination, setLeftPagination] = useState(0);
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
            const fechaMinimaMilisegundos = Funciones.minimalDateMilliseconds(xPosition, cellsWidth, leftPagination, initialDateOffset);
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
        leftPagination,
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
        if (!scrollingOnCourse && callsOnScrollingStops) {
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
        React.createElement("div", { className: "controles" },
            React.createElement("div", { className: "div-dropdown-fechas-boton-hoy" },
                React.createElement(DropdownNavegadorMeses, { minimumVisibleDate: minimumVisibleDate, onChangeAction: (valorDeOpcion) => {
                        Funciones.scrollByDate(new Date(Number(Date.parse(sqlToJsDate(valorDeOpcion).toString()))), gridWrapperRef, leftPagination, cellsWidth);
                    }, options: Funciones.defineMonthsArray(leftPagination, language) }),
                React.createElement("button", { onClick: () => Funciones.scrollByDate(new Date(), gridWrapperRef, leftPagination, cellsWidth) }, language["Today"])),
            React.createElement("div", { className: "div-botones-superior-derecho" })),
        React.createElement("div", { className: "filtros-logo" }, logoUrl && React.createElement("img", { className: "logo", src: logoUrl, alt: "logo" })),
        React.createElement("div", { className: "eje-vertical" },
            React.createElement("div", { ref: destiniesColumnRef, className: "lista-anuncios", onScroll: (e) => {
                    // Se puede hacer funcion
                    if (gridWrapperRef.current !== null)
                        gridWrapperRef.current.scrollTop = e.target.scrollTop;
                } },
                React.createElement(ListElementsColumn, { listHeight: cellsHeight * listElementsIdsArray.length, yOffset: yOffset, elementsHeight: cellsHeight, idsArray: visibleListElementsIds, ReactListElementChildren: ReactListElementChildren }))),
        React.createElement("div", { className: "eje-horizontal" },
            React.createElement("div", { className: "div-botones-fechas" },
                React.createElement("button", { className: "boton-semana-pasada", onClick: () => {
                        // Se puede hacer funcion
                        if (datesRowRef.current !== null)
                            datesRowRef.current.scroll({
                                left: datesRowRef.current.scrollLeft - cellsWidth * 7,
                            });
                    } },
                    React.createElement(BootstrapIcons.BsChevronLeft, null)),
                React.createElement("button", { onClick: () => {
                        // Se puede hacer funcion
                        if (datesRowRef.current !== null)
                            datesRowRef.current.scroll({
                                left: datesRowRef.current.scrollLeft + cellsWidth * 7,
                            });
                    }, className: "boton-semana-siguiente" },
                    React.createElement(BootstrapIcons.BsChevronRight, null))),
            React.createElement("div", { ref: datesRowRef, className: "div-fila-fechas", onScroll: (e) => {
                    if (gridWrapperRef.current !== null)
                        gridWrapperRef.current.scrollLeft = e.target.scrollLeft;
                } },
                React.createElement(DatesRow, { visibleDates: visibleDates, width: (leftPagination + rightPagination) * cellsWidth, height: 64, cellsWidth: cellsWidth, cellsHeight: 64, offset: xOffset, language: language }))),
        React.createElement("div", { className: "div-contenedor-principal" },
            React.createElement("div", { ref: gridWrapperRef, className: "contendor-principal", onScroll: (e) => {
                    if (datesRowRef.current !== null) {
                        datesRowRef.current.scrollLeft = e.target.scrollLeft;
                        setXPosition(e.target.scrollLeft);
                    }
                    if (destiniesColumnRef.current !== null) {
                        destiniesColumnRef.current.scrollTop = e.target.scrollTop;
                        setYPosition(e.target.scrollTop);
                    }
                    if (dynamicPagination &&
                        e.target.scrollLeft +
                            e.target.offsetWidth >
                            (leftPagination + rightPagination) * cellsWidth - cellsWidth) {
                        setRightPagination(rightPagination + 1);
                    }
                    if (dynamicPagination &&
                        e.target.scrollLeft < cellsWidth) {
                        setLeftPagination(leftPagination + 1);
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
                React.createElement(DatesGrid, { gridWidth: (leftPagination + rightPagination) * cellsWidth, gridHeight: cellsHeight * listElementsIdsArray.length, xOffset: xOffset, yOffset: yOffset, cellsWidth: cellsWidth, cellsHeight: cellsHeight, visibleListElementsIdsArray: visibleListElementsIds, visibleDates: visibleDates, ReactCellChildren: ReactCellChildren })))));
};
export default Multicalendar;
//# sourceMappingURL=Multicalendar.js.map