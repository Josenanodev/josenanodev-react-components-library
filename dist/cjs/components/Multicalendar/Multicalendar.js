"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const Funciones = __importStar(require("./MulticalendarOwnFunctions"));
require("./Multicalendar.css");
//Assets
const BootstrapIcons = __importStar(require("react-icons/bs"));
//Componentes
const DatesRow_1 = __importDefault(require("./subcomponents/individuals/DatesRow/DatesRow"));
const ListElementsColumn_1 = __importDefault(require("./subcomponents/composites/ListElementsColumn/ListElementsColumn"));
const DatesGrid_1 = __importDefault(require("./subcomponents/composites/DatesGrid/DatesGrid"));
const DropdownMonthNavigation_1 = __importDefault(require("./subcomponents/individuals/DropdownMonthNavigation/DropdownMonthNavigation"));
//Hooks
const useWindowsSize_1 = __importDefault(require("../../hooks/useWindowsSize"));
//Utils
const sqlToJsDate_1 = __importDefault(require("../../utils/sqlToJsDate"));
//Services
const MulticalendarStatesAndSettings_1 = require("../../Services/MulticalendarStatesAndSettings");
const Multicalendar = ({ multicalendarId, ReactCellChildren, ReactListElementChildren, listElementsIdsArray, language, cellsWidth = 120, cellsHeight = 80, verticalAxisWidth = 280, horizontalAxisHeight = 148, horizontalInitialCellQuantity = 1000, chunkRenderX = 0, chunkRenderY = 0, dynamicPagination = false, draggingOverDateCells = false, logoUrl, waitTimeForCalls = 500, callsOnScrollingStops, }) => {
    //Constantes del componente
    const origin = {
        x: Math.ceil(horizontalInitialCellQuantity / 2) * cellsWidth,
        y: 0,
    };
    const initialDateOffset = 2 + chunkRenderX;
    //Refs
    const datesRowRef = (0, react_1.useRef)(null);
    const destiniesColumnRef = (0, react_1.useRef)(null);
    const gridWrapperRef = (0, react_1.useRef)(null);
    //Estados
    const [firtsCall, setFirtsCall] = (0, react_1.useState)(false);
    const [windowWidth, windowHeight] = (0, useWindowsSize_1.default)();
    const [rightPagination, setRightPagination] = (0, react_1.useState)(Math.ceil(horizontalInitialCellQuantity / 2));
    const [leftPagination, setLeftPagination] = (0, react_1.useState)(0);
    const [paginationWidth, setPaginationWidth] = (0, react_1.useState)(0);
    const [paginationHeight, setPaginationHeight] = (0, react_1.useState)(0);
    const [xOffset, setXOffset] = (0, react_1.useState)(1);
    const [yOffset, setYOffset] = (0, react_1.useState)(0);
    const [visibleDates, setVisibleDates] = (0, react_1.useState)([]);
    const [visibleListElementsIds, setVisibleListElementsIds] = (0, react_1.useState)([]);
    const [updateList, setUpdateList] = (0, react_1.useState)(false);
    const [xPosition, setXPosition] = (0, react_1.useState)(origin.x);
    const [yPosition, setYPosition] = (0, react_1.useState)(origin.y);
    const [renderCoordinates, setRenderCoordinates] = (0, react_1.useState)({
        x: origin.x,
        y: origin.y,
    });
    const [minimumVisibleDate, setMinimumVisibleDate] = (0, react_1.useState)(new Date());
    const [idTimeoutForCalls, setIdTimeoutForCalls] = (0, react_1.useState)(undefined);
    const [clientXPositionOnGrid, setClientXPositionOnGrid] = (0, react_1.useState)(undefined);
    const [clientYPositionOnGrid, setClientYPositionOnGrid] = (0, react_1.useState)(undefined);
    const [scrollingOnCourse, setScrollingOnCourse] = (0, react_1.useState)(false);
    //UseEffects
    (0, react_1.useEffect)(() => {
        //Delegamos un cambio de estado a los primero renderes para evitar duplicado de llamadas a la API
        if (!firtsCall) {
            setFirtsCall(true);
            //Cached Y position
            let newYPosition = (0, MulticalendarStatesAndSettings_1.getMulticalendarYScrollPosition)(multicalendarId);
            if (newYPosition !== null && newYPosition !== "0") {
                if (gridWrapperRef.current) {
                    gridWrapperRef.current.scrollTop = Number(newYPosition);
                    (0, MulticalendarStatesAndSettings_1.eraseMulticalendarYScrollPosition)(multicalendarId);
                }
            }
        }
    }, [firtsCall]);
    (0, react_1.useEffect)(() => {
        // Posicionamiento inicial en X
        if (gridWrapperRef.current !== null) {
            gridWrapperRef.current.scrollLeft = origin.x;
        }
    }, [origin.x]);
    (0, react_1.useEffect)(() => {
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
    (0, react_1.useEffect)(() => {
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
    (0, react_1.useEffect)(() => {
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
    (0, react_1.useEffect)(() => {
        setScrollingOnCourse(true);
        clearTimeout(idTimeoutForCalls);
        setIdTimeoutForCalls(undefined);
        // eslint-disable-next-line
    }, [xPosition, yPosition]);
    (0, react_1.useEffect)(() => {
        if (idTimeoutForCalls === undefined) {
            let _id = setTimeout(() => setScrollingOnCourse(false), waitTimeForCalls);
            setIdTimeoutForCalls(_id);
        }
    }, [xPosition, yPosition, idTimeoutForCalls, waitTimeForCalls]);
    (0, react_1.useEffect)(() => {
        if (!scrollingOnCourse && callsOnScrollingStops) {
            callsOnScrollingStops();
        }
        // eslint-disable-next-line
    }, [scrollingOnCourse]);
    //Cancelar idIntervalo Autoscroll de rango cuando se deja de seleccionar
    (0, react_1.useEffect)(() => {
        if (!draggingOverDateCells) {
            if (clientXPositionOnGrid !== undefined)
                setClientXPositionOnGrid(undefined);
            if (clientYPositionOnGrid !== undefined)
                setClientYPositionOnGrid(undefined);
        }
    }, [draggingOverDateCells, clientXPositionOnGrid, clientYPositionOnGrid]);
    //Render
    return (react_1.default.createElement("div", { "data-testid": "multicalendar", className: "multicalendar", style: {
            gridTemplateColumns: `${verticalAxisWidth}px`,
            gridTemplateRows: `70px ${horizontalAxisHeight - 70}px calc(100% - ${horizontalAxisHeight}px`,
        } },
        react_1.default.createElement("div", { className: "controles" },
            react_1.default.createElement("div", { className: "div-dropdown-fechas-boton-hoy" },
                react_1.default.createElement(DropdownMonthNavigation_1.default, { minimumVisibleDate: minimumVisibleDate, onChangeAction: (valorDeOpcion) => {
                        Funciones.scrollByDate(new Date(Number(Date.parse((0, sqlToJsDate_1.default)(valorDeOpcion).toString()))), gridWrapperRef, leftPagination, cellsWidth);
                    }, options: Funciones.defineMonthsArray(leftPagination, language) }),
                react_1.default.createElement("button", { onClick: () => Funciones.scrollByDate(new Date(), gridWrapperRef, leftPagination, cellsWidth) }, language["Today"])),
            react_1.default.createElement("div", { className: "div-botones-superior-derecho" })),
        react_1.default.createElement("div", { className: "filtros-logo" }, logoUrl && react_1.default.createElement("img", { className: "logo", src: logoUrl, alt: "logo" })),
        react_1.default.createElement("div", { className: "eje-vertical" },
            react_1.default.createElement("div", { ref: destiniesColumnRef, className: "lista-anuncios", onScroll: (e) => {
                    // Se puede hacer funcion
                    if (gridWrapperRef.current !== null)
                        gridWrapperRef.current.scrollTop = e.target.scrollTop;
                } },
                react_1.default.createElement(ListElementsColumn_1.default, { listHeight: cellsHeight * listElementsIdsArray.length, yOffset: yOffset, elementsHeight: cellsHeight, idsArray: visibleListElementsIds, ReactListElementChildren: ReactListElementChildren }))),
        react_1.default.createElement("div", { className: "eje-horizontal" },
            react_1.default.createElement("div", { className: "div-botones-fechas" },
                react_1.default.createElement("button", { className: "boton-semana-pasada", onClick: () => {
                        // Se puede hacer funcion
                        if (datesRowRef.current !== null)
                            datesRowRef.current.scroll({
                                left: datesRowRef.current.scrollLeft - cellsWidth * 7,
                            });
                    } },
                    react_1.default.createElement(BootstrapIcons.BsChevronLeft, null)),
                react_1.default.createElement("button", { onClick: () => {
                        // Se puede hacer funcion
                        if (datesRowRef.current !== null)
                            datesRowRef.current.scroll({
                                left: datesRowRef.current.scrollLeft + cellsWidth * 7,
                            });
                    }, className: "boton-semana-siguiente" },
                    react_1.default.createElement(BootstrapIcons.BsChevronRight, null))),
            react_1.default.createElement("div", { ref: datesRowRef, className: "div-fila-fechas", onScroll: (e) => {
                    if (gridWrapperRef.current !== null)
                        gridWrapperRef.current.scrollLeft = e.target.scrollLeft;
                } },
                react_1.default.createElement(DatesRow_1.default, { visibleDates: visibleDates, width: (leftPagination + rightPagination) * cellsWidth, height: 64, cellsWidth: cellsWidth, cellsHeight: 64, offset: xOffset, language: language }))),
        react_1.default.createElement("div", { className: "div-contenedor-principal" },
            react_1.default.createElement("div", { ref: gridWrapperRef, className: "contendor-principal", onScroll: (e) => {
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
                react_1.default.createElement(DatesGrid_1.default, { gridWidth: (leftPagination + rightPagination) * cellsWidth, gridHeight: cellsHeight * listElementsIdsArray.length, xOffset: xOffset, yOffset: yOffset, cellsWidth: cellsWidth, cellsHeight: cellsHeight, visibleListElementsIdsArray: visibleListElementsIds, visibleDates: visibleDates, ReactCellChildren: ReactCellChildren })))));
};
exports.default = Multicalendar;
//# sourceMappingURL=Multicalendar.js.map