import React, { useState, useRef, useEffect, useReducer } from "react";
import styles from "./CalendarScrollableSection.module.scss";
import dayOfTheWeekStartingOnMonday from "../../../utils/dayOfTheWeekStartingOnMonday";
import numberOfWeeksInAMonth from "../../../utils/numberOfWeeksInAMonth";
import jsToSqlDate from "../../../utils/jsToSqlDate";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";

type ReducerStateType = {
  month: number;
  year: number;
  minimumDate: Date;
  maximumDate: Date;
};

type ReducerActionType =
  | "setMonth"
  | "setYear"
  | "setMinimumDate"
  | "setMaximumdate"
  | "changeByMonthOffset";

const reducer = (
  state: ReducerStateType,
  action: {
    type: ReducerActionType;
    value: number;
  }
): ReducerStateType => {
  const isAValidDateChange = (year: number, month: number): boolean => {
    const referenceDate = new Date(year, month, 1);
    const minimumMonthDate = new Date(
      state.minimumDate.getFullYear(),
      state.minimumDate.getMonth(),
      1
    );
    const maximumMonthDate = new Date(
      state.maximumDate.getFullYear(),
      state.maximumDate.getMonth() + 1,
      0
    );
    const isReferenceDateLowerThanMinimumMonthDate =
      referenceDate.valueOf() < minimumMonthDate.valueOf();
    const isReferenceDateHigherThanMaximumMonthDate =
      referenceDate.valueOf() > maximumMonthDate.valueOf();
    if (
      isReferenceDateLowerThanMinimumMonthDate ||
      isReferenceDateHigherThanMaximumMonthDate
    ) {
      return false;
    }
    return true;
  };
  const actionsDictionary: { [key: string]: () => ReducerStateType | undefined } = {
    setMonth: () => {
      if (isAValidDateChange(state.year, action.value)) {
        return { ...state, month: action.value };
      } else {
        return { ...state };
      }
    },
    setYear: () => {
      if (isAValidDateChange(action.value, state.month)) {
        return { ...state, year: action.value };
      } else {
        return { ...state };
      }
    },
    setMinimumDate: () => {
      return { ...state, minimumDate: new Date(action.value) };
    },
    setMaximumdate: () => {
      return { ...state, maximumDate: new Date(action.value) };
    },
    changeByMonthOffset: () => {
      const referenceDate = new Date(state.year, state.month + action.value, 1);
      if (isAValidDateChange(state.year, state.month + action.value)) {
        return {
          ...state,
          year: referenceDate.getFullYear(),
          month: referenceDate.getMonth(),
        };
      } else {
        return { ...state };
      }
    },
  };
  const newState = actionsDictionary[action.type]();
  if (newState) {
    return newState;
  } else {
    return { ...state };
  }
};

type CalendarScrollableSectionProps = {
  month: number;
  year: number;
  mode: "single" | "multiple" | "range" | "booking";
  onSelectedDatesChange: (dates: Date[]) => void;
  onFocusedMonth: (month: number, year: number) => void;
  minimumDate?: Date;
  maximumDate?: Date;
};

const CalendarScrollableSection = ({
  month,
  year,
  mode,
  onSelectedDatesChange,
  onFocusedMonth,
  minimumDate = new Date(1970, 0, 1),
  maximumDate = new Date(new Date().getFullYear() + 100, 1, 1),
}: CalendarScrollableSectionProps) => {
  const [state, dispatch] = useReducer(reducer, {
    month: month,
    year: year,
    minimumDate: minimumDate,
    maximumDate: maximumDate,
  });
  const [dates, setDates] = useState<Date[]>([]);
  const monthsContainerRef = useRef<HTMLDivElement>(null);
  const firstMonthRef = useRef<HTMLDivElement>(null);
  const secondMonthRef = useRef<HTMLDivElement>(null);
  const fourthMonthRef = useRef<HTMLDivElement>(null);
  const fifthMonthRef = useRef<HTMLDivElement>(null);
  const isFirstMonthVisible = useIntersectionObserver(firstMonthRef, {
    rootMargin: "0px",
    threshold: 1.0,
  });
  const isSecondMonthVisible = useIntersectionObserver(secondMonthRef, {
    rootMargin: "0px",
    threshold: 1.0,
  });
  const isFourthMonthVisible = useIntersectionObserver(fourthMonthRef, {
    rootMargin: "0px",
    threshold: 1.0,
  });
  const isFifthMonthVisible = useIntersectionObserver(fifthMonthRef, {
    rootMargin: "0px",
    threshold: 1.0,
  });

  const dateClassName = (date: Date): string => {
    let className = styles["day"];
    const isToday = jsToSqlDate(date) === jsToSqlDate(new Date());
    if (isToday) {
      className += ` ${styles["today"]}`;
    }
    if (date.getMonth() === state.month) {
      className += ` ${styles["in-month"]}`;
    } else {
      className += ` ${styles["not-in-month"]}`;
    }
    const isDateSelected = dates.some(
      (includedDate) => includedDate.valueOf() === date.valueOf()
    );
    const isDateInRange =
      (mode === "range" || mode === "booking") &&
      dates.length === 2 &&
      dates[0].valueOf() < date.valueOf() &&
      date.valueOf() < dates[1].valueOf();
    if (isDateSelected || isDateInRange) {
      className += ` ${styles["selected"]}`;
    }
    if (mode === "booking") {
      const isCheckInDate = dates.length === 2 && date.valueOf() === dates[0].valueOf();
      if (isCheckInDate) {
        className += ` ${styles["check-in"]}`;
      }
      const isCheckOutDate = dates.length === 2 && date.valueOf() === dates[1].valueOf();
      if (isCheckOutDate) {
        className += ` ${styles["check-out"]}`;
      }
    }
    const isOutOfSelection =
      date.valueOf() < minimumDate.valueOf() || date.valueOf() > maximumDate.valueOf();
    if (isOutOfSelection) {
      className += ` ${styles["out-of-selection"]}`;
    }
    return className;
  };

  const handleDateSelection = (date: Date) => {
    const isOutOfSelection =
      date.valueOf() < minimumDate.valueOf() || date.valueOf() > maximumDate.valueOf();
    if (isOutOfSelection) {
      return;
    }
    let datesClone = [...dates]
    if (mode === "single") {
      datesClone = [date]
    }
    if (mode === "multiple") {
      if (dates.some((includedDate) => includedDate.valueOf() === date.valueOf())) {
         datesClone = dates.filter((includedDate) => includedDate.valueOf() !== date.valueOf())
      } else {
        datesClone = [...dates, date];
      }
    }
    if (mode === "range") {
      if (dates.length === 0) {
        datesClone = [date];
      } else if (dates.length === 1) {
        if (dates[0].valueOf() < date.valueOf()) {
          datesClone = [...dates, date];
        } else {
          datesClone = [date, dates[0]];
        }
      } else {
        datesClone = [];
      }
    }
    if (mode === "booking") {
      if (dates.length === 0) {
        datesClone = [date];
      } else if (dates[0].valueOf() === date.valueOf()) {
        datesClone = [];
      } else if (dates.length === 1) {
        if (dates[0].valueOf() < date.valueOf()) {
          datesClone = [...dates, date];
        } else {
          datesClone = [date, dates[0]];
        }
      } else {
        datesClone = [];
      }
    }
    onSelectedDatesChange(datesClone)
    setDates(datesClone)
  };

  useEffect(() => {
    if (monthsContainerRef.current) {
      monthsContainerRef.current.scrollTop = 416;
    }
  }, []);

  useEffect(() => {
    onFocusedMonth(state.month, state.year);
  }, [state.year, state.month, onFocusedMonth])
  

  useEffect(() => {
    if (isSecondMonthVisible || isFirstMonthVisible) {
      dispatch({ type: "changeByMonthOffset", value: -1 });
    }
  }, [isFirstMonthVisible, isSecondMonthVisible]);

  useEffect(() => {
    if (isFourthMonthVisible || isFifthMonthVisible) {
      dispatch({ type: "changeByMonthOffset", value: 1 });
    }
  }, [isFourthMonthVisible, isFifthMonthVisible]);

  return (
    <section ref={monthsContainerRef} className={styles["calendar-scrollable-section"]}>
      {Array(5)
        .fill(0)
        .map((_, gridIndex) => {
          const monthOffset = gridIndex - 2;
          const referenceDate = new Date(state.year, state.month + monthOffset, 1);
          const lastDayOfTheMonth = new Date(
            state.year,
            state.month + monthOffset + 1,
            0
          );
          const isLastDayOfTheMonthSunday = lastDayOfTheMonth.getDay() === 0;
          let numberOfWeeksInMonth = numberOfWeeksInAMonth(referenceDate);
          if (!isLastDayOfTheMonthSunday) {
            numberOfWeeksInMonth = numberOfWeeksInMonth - 1;
          }
          const firstDayInMonthDayOfWeek = dayOfTheWeekStartingOnMonday(referenceDate);
          return (
            <div
              ref={
                [firstMonthRef, secondMonthRef, null, fourthMonthRef, fifthMonthRef][
                  gridIndex
                ]
              }
              className={styles["days-grid"]}
              key={`grid:${jsToSqlDate(referenceDate)}}`}
            >
              {Array(numberOfWeeksInMonth)
                .fill(0)
                .map((_, rowIndex) => (
                  <div
                    className={styles["days-row"]}
                    key={`grid:${jsToSqlDate(referenceDate)}-row:${rowIndex}`}
                  >
                    {Array(7)
                      .fill(0)
                      .map((_, columnIndex) => {
                        const numberOfMonth = state.month + monthOffset;
                        const numberOfDay =
                          rowIndex * 7 + columnIndex + 1 - firstDayInMonthDayOfWeek;
                        const date = new Date(state.year, numberOfMonth, numberOfDay);
                        return (
                          <div
                            className={styles["day-cell"]}
                            key={jsToSqlDate(date)}
                            onClick={() => handleDateSelection(date)}
                          >
                            <div className={dateClassName(date)}>
                              <div className={styles["background"]}>
                                <div className={styles["first-half"]}></div>
                                <div className={styles["second-half"]}></div>
                              </div>
                              <p>{date.getDate()}</p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                ))}
            </div>
          );
        })}
    </section>
  );
};

export default CalendarScrollableSection;
