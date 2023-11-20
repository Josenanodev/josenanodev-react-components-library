import React, { useEffect, useState, useRef } from "react";
import * as Funciones from "./MulticalendarOwnFunctions";
import styles from "./Multicalendar.module.scss"

//Assets
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

//Componentes
import DatesRow from "./subcomponents/individuals/DatesRow/DatesRow";
import ListElementsColumn from "./subcomponents/composites/ListElementsColumn/ListElementsColumn";
import DatesGrid from "./subcomponents/composites/DatesGrid/DatesGrid";
import DropdownMonthNavigation from "./subcomponents/individuals/DropdownMonthNavigation/DropdownMonthNavigation";

//Hooks
import useWindowSize from "../../hooks/useWindowsSize";

//Types
import { MulticalendarProps, RenderCoordinates } from "./types";

//Services
import {
  getMulticalendarScrollLeftPosition,
  getMulticalendarScrollTopPosition,
  setMulticalendarScrollLeftPosition,
  setMulticalendarScrollTopPosition,
} from "../../Services/MulticalendarStatesAndSettings";

//Utils
import { sqlToJsDate } from "josenanodev-generic-utils";

const languageDictionary = {
  en_EN: {
    Today: "Today",
  },
  es_ES: {
    Today: "Hoy",
  },
};

const Multicalendar = ({
  multicalendarId,
  ReactCellChildren,
  ReactListElementChildren,
  listElementsIdsArray,
  language="en_EN",
  pastDatesVisible = true,
  cellsWidth = 120,
  cellsHeight = 80,
  verticalAxisWidth = 280,
  pastDaysInitialQuantity = 365,
  futureDaysInitialQuantity = 365,
  chunkRenderX = 0,
  chunkRenderY = 0,
  dynamicDaysQuantity = false,
  authomaticScrollOnDraggingOverEdges = false,
  waitTimeForCalls = 500,
  callsOnInitialView,
  callsOnScrollingStops,
  aditionalControlsComponents,
  upperLeftComponent,
  autoSavePosition,
  onScrollTopChanges,
  onScrollLeftChanges,
}: MulticalendarProps) => {
  //Constantes del componente
  const initialDateOffset = 1 + chunkRenderX;
  //Refs
  const datesRowRef = useRef<HTMLDivElement>(null);
  const destiniesColumnRef = useRef<HTMLDivElement>(null);
  const gridWrapperRef = useRef<HTMLDivElement>(null);
  const controlsWrapperRef = useRef<HTMLDivElement>(null);
  const horizontalAxisWrapperRef = useRef<HTMLDivElement>(null);
  //Estados
  const [firtsCallOnInitialViewDone, setFirtsCallOnInitialViewDone] =
    useState<boolean>(false);
  const [windowWidth, windowHeight] = useWindowSize();
  const [futureDaysQuantity, setFutureDaysQuantity] = useState(
    Math.ceil(futureDaysInitialQuantity)
  );
  const [pastDaysQuantity, setPastDaysQuantity] = useState(
    pastDatesVisible ? Math.ceil(pastDaysInitialQuantity) : 0
  );
  const [paginationWidth, setPaginationWidth] = useState<number>(0);
  const [paginationHeight, setPaginationHeight] = useState<number>(0);
  const [xOffset, setXOffset] = useState<number>(1);
  const [yOffset, setYOffset] = useState<number>(0);
  const [visibleDates, setVisibleDates] = useState<Date[]>([]);
  const [visibleListElementsIds, setVisibleListElementsIds] = useState<
    string[] | number[]
  >([]);
  const [updateList, setUpdateList] = useState<boolean>(false);
  const [origin, setOrigin] = useState<RenderCoordinates>({
    x: getMulticalendarScrollLeftPosition(multicalendarId)
      ? Number(getMulticalendarScrollLeftPosition(multicalendarId))
      : pastDatesVisible
      ? Math.ceil(pastDaysInitialQuantity) * cellsWidth
      : 0,
    y: getMulticalendarScrollTopPosition(multicalendarId)
      ? Number(getMulticalendarScrollTopPosition(multicalendarId))
      : 0,
  });
  const [xPosition, setXPosition] = useState<number>(origin.x);
  const [yPosition, setYPosition] = useState<number>(origin.y);
  const [renderCoordinates, setRenderCoordinates] = useState<RenderCoordinates>({
    x: origin.x,
    y: origin.y,
  });
  const [initialPositioningDone, setInitialPositioningDone] = useState<boolean>(false);
  const [minimumVisibleDate, setMinimumVisibleDate] = useState<Date>(new Date());
  const [idTimeoutForCalls, setIdTimeoutForCalls] = useState<NodeJS.Timeout | undefined>(
    undefined
  );
  const [clientXPositionOnGrid, setClientXPositionOnGrid] = useState<number | undefined>(
    undefined
  );
  const [clientYPositionOnGrid, setClientYPositionOnGrid] = useState<number | undefined>(
    undefined
  );
  const [scrollingOnCourse, setScrollingOnCourse] = useState<boolean>(false);
  const [controlsWrapperHeight, setControlsWrapperHeight] = useState(
    controlsWrapperRef.current?.clientHeight ? controlsWrapperRef.current.clientHeight : 0
  );
  const [horizontalAxisWrapperHeight, setHorizontalAxisWrapperHeight] = useState(
    horizontalAxisWrapperRef.current?.clientHeight
      ? horizontalAxisWrapperRef.current.clientHeight
      : 0
  );
  const [userIsHoldingMouseDown, setUserIsHoldingMouseDown] = useState<boolean>(false);
  //UseEffect
  useEffect(() => {
    setOrigin({
      x: pastDatesVisible ? Math.ceil(pastDaysInitialQuantity) * cellsWidth : 0,
      y: 0,
    });
  }, [pastDatesVisible, pastDaysInitialQuantity, cellsWidth]);
  useEffect(() => {
    //Cached positions
    if (gridWrapperRef.current && initialPositioningDone === false) {
      gridWrapperRef.current.scrollTop = origin.y;
      gridWrapperRef.current.scrollLeft = origin.x;
      setInitialPositioningDone(true);
    }
  }, [origin.y, origin.x, initialPositioningDone]);
  useEffect(() => {
    if (onScrollLeftChanges) {
      onScrollLeftChanges(xPosition);
    }
    if (onScrollTopChanges) {
      onScrollTopChanges(yPosition);
    }
    return () => {
      if (autoSavePosition) {
        if (yPosition !== origin.y) {
          setMulticalendarScrollTopPosition(multicalendarId, String(yPosition));
        }
        if (xPosition !== origin.x) {
          setMulticalendarScrollLeftPosition(multicalendarId, String(xPosition));
        }
      }
    };
  }, [autoSavePosition, yPosition, xPosition, origin.y, origin.x]);
  useEffect(() => {
    if (pastDatesVisible) {
      setPastDaysQuantity(Math.ceil(pastDaysInitialQuantity));
    } else {
      setPastDaysQuantity(0);
    }
  }, [pastDatesVisible, pastDaysInitialQuantity]);
  useEffect(() => {
    if (
      !firtsCallOnInitialViewDone &&
      visibleListElementsIds.length > 0 &&
      visibleDates.length > 0 &&
      callsOnInitialView
    ) {
      setFirtsCallOnInitialViewDone(true);
      callsOnInitialView(visibleListElementsIds, visibleDates);
    }
  }, [
    firtsCallOnInitialViewDone,
    visibleListElementsIds,
    visibleDates,
    callsOnInitialView,
  ]);
  useEffect(() => {
    const localConstControlsWrapperHeight = controlsWrapperRef.current?.clientHeight
      ? controlsWrapperRef.current.clientHeight
      : 0;
    const localConstHorizontalAxisWrapperHeight = horizontalAxisWrapperRef.current
      ?.clientHeight
      ? horizontalAxisWrapperRef.current.clientHeight
      : 0;
    setControlsWrapperHeight(localConstControlsWrapperHeight);
    setHorizontalAxisWrapperHeight(localConstHorizontalAxisWrapperHeight);
    setUpdateList(true);
    // Dimensiones de paginacion, requiere agregar 1 para no ver espacios en blanco
    setPaginationWidth(Math.ceil((windowWidth - verticalAxisWidth) / cellsWidth) + 1);
    setPaginationHeight(
      Math.ceil(
        (windowHeight -
          localConstControlsWrapperHeight -
          localConstHorizontalAxisWrapperHeight) /
          cellsHeight
      ) + 1
    );
    // Redefinicion de posicion X ante cambios en el tamaño de la ventana
    if (gridWrapperRef.current !== null) {
      setXPosition(gridWrapperRef.current.scrollLeft);
      setRenderCoordinates({
        x: gridWrapperRef.current.scrollLeft,
        y: gridWrapperRef.current.scrollTop,
      });
      setXOffset(
        Math.floor(gridWrapperRef.current.scrollLeft / cellsWidth) - chunkRenderX
      );
    }
  }, [
    windowWidth,
    windowHeight,
    verticalAxisWidth,
    cellsHeight,
    cellsWidth,
    chunkRenderX,
  ]);
  useEffect(() => {
    // Definicion de visibilidad y renderizacion del Eje Y
    if (
      (renderCoordinates.x === origin.x && renderCoordinates.y === origin.y) ||
      Math.abs(renderCoordinates.y - yPosition) / cellsHeight > chunkRenderY ||
      updateList
    ) {
      if (!(renderCoordinates.x === origin.x && renderCoordinates.y === origin.y)) {
        if (gridWrapperRef.current !== null)
          setRenderCoordinates({
            x: gridWrapperRef.current.scrollLeft,
            y: gridWrapperRef.current.scrollTop,
          });
      }
      let desfase = Funciones.defineYOffset(yPosition, cellsHeight, chunkRenderY);
      setYOffset(desfase);
      setVisibleListElementsIds(
        Funciones.defineListElementsArrayVisibleList(
          paginationHeight,
          chunkRenderY,
          desfase,
          listElementsIdsArray
        )
      );
      if (updateList) setUpdateList(false);
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
    if (
      (renderCoordinates.x === origin.x && renderCoordinates.y === origin.y) ||
      xPosition < cellsWidth ||
      Math.abs(renderCoordinates.x - xPosition) / cellsWidth > chunkRenderX ||
      updateList
    ) {
      setVisibleDates([]);
      if (!(renderCoordinates.x === origin.x && renderCoordinates.y === origin.y)) {
        if (gridWrapperRef.current !== null)
          setRenderCoordinates({
            x: gridWrapperRef.current.scrollLeft,
            y: gridWrapperRef.current.scrollTop,
          });
      }
      setXOffset(Funciones.defineXOffset(xPosition, cellsWidth, chunkRenderX));
      const fechaMinimaMilisegundos = Funciones.minimalDateMilliseconds(
        xPosition,
        cellsWidth,
        pastDaysQuantity,
        initialDateOffset
      );
      setMinimumVisibleDate(
        Funciones.defineMinimalVisibleDate(fechaMinimaMilisegundos, initialDateOffset)
      );
      if (updateList) setUpdateList(false);
      setVisibleDates(
        Funciones.defineVisibleDatesArray(
          paginationWidth,
          chunkRenderX,
          fechaMinimaMilisegundos
        )
      );
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
    if (!scrollingOnCourse && callsOnScrollingStops) {
      callsOnScrollingStops(visibleListElementsIds, visibleDates);
    }
    // eslint-disable-next-line
  }, [scrollingOnCourse, visibleListElementsIds, visibleDates]);

  //Cancelar idIntervalo Autoscroll de rango cuando se deja de seleccionar
  useEffect(() => {
    if (!authomaticScrollOnDraggingOverEdges) {
      if (clientXPositionOnGrid !== undefined) setClientXPositionOnGrid(undefined);
      if (clientYPositionOnGrid !== undefined) setClientYPositionOnGrid(undefined);
    }
  }, [authomaticScrollOnDraggingOverEdges, clientXPositionOnGrid, clientYPositionOnGrid]);
  useEffect(() => {
    document.body.addEventListener("mousedown", () => {
      setUserIsHoldingMouseDown(true);
    });
    document.body.addEventListener("mouseup", () => {
      setUserIsHoldingMouseDown(false);
    });
    return () => {
      document.body.removeEventListener("mousedown", () => {
        setUserIsHoldingMouseDown(true);
      });
      document.body.removeEventListener("mouseup", () => {
        setUserIsHoldingMouseDown(false);
      });
    };
  }, [authomaticScrollOnDraggingOverEdges]);
  //Render
  return (
    <div
      key={multicalendarId}
      id={multicalendarId}
      data-testid={multicalendarId}
      className={styles["multicalendar"]}
      style={{
        gridTemplateColumns: `${verticalAxisWidth}px`,
        gridTemplateRows: `auto auto calc(100% - ${
          controlsWrapperHeight + horizontalAxisWrapperHeight
        }px`,
      }}
    >
      <div ref={controlsWrapperRef} className={styles["controls"]}>
        <div className={styles["div-dates-navigation"]}>
          <DropdownMonthNavigation
            visibleYear={minimumVisibleDate.getFullYear()}
            visibleMonth={minimumVisibleDate.getMonth()}
            onChangeAction={(valorDeOpcion: string) => {
              Funciones.scrollByDate(
                new Date(Number(Date.parse(sqlToJsDate(valorDeOpcion).toString()))),
                gridWrapperRef,
                pastDaysQuantity,
                cellsWidth
              );
            }}
            options={Funciones.defineMonthsArray(
              pastDaysQuantity,
              futureDaysQuantity,
              language
            )}
          />
          <button
            type="button"
            className={styles["today-button"]}
            onClick={() =>
              Funciones.scrollByDate(
                new Date(),
                gridWrapperRef,
                pastDaysQuantity,
                cellsWidth
              )
            }
          >
            {languageDictionary[language]["Today"]}
          </button>
        </div>
        {aditionalControlsComponents && (
          <div className={styles["div-aditional-controls-components"]}>
            {aditionalControlsComponents}
          </div>
        )}
      </div>
      <div className={styles["div-upper-left-component"]}>{upperLeftComponent}</div>
      <div className={styles["vertical-axis"]}>
        <div
          ref={destiniesColumnRef}
          className={styles["div-list-element-column"]}
          onScroll={(e) => {
            // Se puede hacer funcion
            if (gridWrapperRef.current !== null)
              gridWrapperRef.current.scrollTop = (e.target as HTMLDivElement).scrollTop;
          }}
        >
          <ListElementsColumn
            listHeight={cellsHeight * listElementsIdsArray.length}
            yOffset={yOffset}
            elementsHeight={cellsHeight}
            idsArray={visibleListElementsIds}
            ReactListElementChildren={ReactListElementChildren}
          />
        </div>
      </div>
      <div ref={horizontalAxisWrapperRef} className={styles["horizontal-axis"]}>
        <div className={styles["div-weeks-buttons"]}>
          {/* Se Puede hacer componente */}
          <button
            type="button"
            title="Past Week"
            className={styles["past-week-button"]}
            onClick={() => {
              // Se puede hacer funcion
              if (datesRowRef.current !== null)
                datesRowRef.current.scroll({
                  left: datesRowRef.current.scrollLeft - cellsWidth * 7,
                });
            }}
          >
            <BsChevronLeft />
          </button>
          {/* Se Puede hacer componente */}
          <button
            type="button"
            title="Next Week"
            onClick={() => {
              // Se puede hacer funcion
              if (datesRowRef.current !== null)
                datesRowRef.current.scroll({
                  left: datesRowRef.current.scrollLeft + cellsWidth * 7,
                });
            }}
            className={styles["next-week-button"]}
          >
            <BsChevronRight />
          </button>
        </div>
        <div
          ref={datesRowRef}
          className={styles["div-dates-row"]}
          onScroll={(e) => {
            if (gridWrapperRef.current !== null)
              gridWrapperRef.current.scrollLeft = (e.target as HTMLDivElement).scrollLeft;
          }}
        >
          <DatesRow
            visibleDates={visibleDates}
            width={(pastDaysQuantity + futureDaysQuantity) * cellsWidth}
            height={74}
            cellsWidth={cellsWidth}
            cellsHeight={74}
            offset={xOffset}
            language={language}
          />
        </div>
      </div>
      <div className={styles["div-main-container"]}>
        <div
          ref={gridWrapperRef}
          className={styles["main-container"]}
          onScroll={(e) => {
            if (datesRowRef.current !== null) {
              const scrollLeft = (e.target as HTMLDivElement).scrollLeft;
              datesRowRef.current.scrollLeft = scrollLeft;
              setXPosition(scrollLeft);
            }
            if (destiniesColumnRef.current !== null) {
              const scrollTop = (e.target as HTMLDivElement).scrollTop;
              destiniesColumnRef.current.scrollTop = scrollTop;
              setYPosition(scrollTop);
            }
            if (
              dynamicDaysQuantity &&
              (e.target as HTMLDivElement).scrollLeft +
                (e.target as HTMLDivElement).offsetWidth >
                (pastDaysQuantity + futureDaysQuantity) * cellsWidth - cellsWidth
            ) {
              setFutureDaysQuantity(futureDaysQuantity + 1);
            }
            if (
              pastDatesVisible &&
              dynamicDaysQuantity &&
              (e.target as HTMLDivElement).scrollLeft < cellsWidth
            ) {
              setPastDaysQuantity(pastDaysQuantity + 1);
              (e.target as HTMLDivElement).scrollLeft = cellsWidth * 3;
            }
            Funciones.authomaticScrollInGrid(
              userIsHoldingMouseDown,
              clientXPositionOnGrid,
              clientYPositionOnGrid,
              cellsWidth * 0.8,
              cellsHeight * 0.8,
              e.target as HTMLDivElement
            );
          }}
          onMouseMove={(e) => {
            if (gridWrapperRef.current !== null && userIsHoldingMouseDown) {
              let x = e.clientX - gridWrapperRef.current.getBoundingClientRect().left;
              let y = e.clientY - gridWrapperRef.current.getBoundingClientRect().top;
              setClientXPositionOnGrid(x);
              setClientYPositionOnGrid(y);
              Funciones.startAuthomaticScrollInGrid(
                userIsHoldingMouseDown,
                x,
                y,
                cellsWidth * 0.8,
                cellsHeight * 0.8,
                gridWrapperRef
              );
            }
          }}
        >
          <DatesGrid
            gridWidth={(pastDaysQuantity + futureDaysQuantity) * cellsWidth}
            gridHeight={cellsHeight * listElementsIdsArray.length}
            xOffset={xOffset}
            yOffset={yOffset}
            cellsWidth={cellsWidth}
            cellsHeight={cellsHeight}
            visibleListElementsIdsArray={visibleListElementsIds}
            visibleDates={visibleDates}
            ReactCellChildren={ReactCellChildren}
          />
        </div>
      </div>
    </div>
  );
};

export default Multicalendar;
