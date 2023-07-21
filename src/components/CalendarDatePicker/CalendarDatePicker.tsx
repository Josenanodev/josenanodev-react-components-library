import React, { useState, useRef, useEffect, useCallback } from "react";
import styles from "./CalendarDatePicker.module.scss";
import { BsFillCalendar3WeekFill } from "react-icons/bs";
import dayOfTheWeekStartingOnMonday from "../../utils/dayOfTheWeekStartingOnMonday";
import numberOfWeeksInAMonth from "../../utils/numberOfWeeksInAMonth";
import jsToSqlDate from "../../utils/jsToSqlDate";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import InputBoxWithConfirmation from "../InputBoxWithConfirmation/InputBoxWithConfirmation";

const calendarDatePickerDictionary = {
  en: {
    january: "january",
    february: "february",
    march: "march",
    april: "april",
    may: "may",
    june: "june",
    july: "july",
    august: "august",
    september: "september",
    october: "october",
    november: "november",
    december: "december",
    monday: "monday",
    tuesday: "tuesday",
    wednesday: "wednesday",
    thursday: "thursday",
    friday: "friday",
    saturday: "saturday",
    sunday: "sunday",
  },
  es: {
    january: "enero",
    february: "febrero",
    march: "marzo",
    april: "abril",
    may: "mayo",
    june: "junio",
    july: "julio",
    august: "agosto",
    september: "septiembre",
    october: "octubre",
    november: "noviembre",
    december: "diciembre",
    monday: "lunes",
    tuesday: "martes",
    wednesday: "miércoles",
    thursday: "jueves",
    friday: "viernes",
    saturday: "sábado",
    sunday: "domingo",
  },
};

const getMonthName = (month: number, language: "es" | "en") => {
  switch (month) {
    case 0:
      return calendarDatePickerDictionary[language].january;
    case 1:
      return calendarDatePickerDictionary[language].february;
    case 2:
      return calendarDatePickerDictionary[language].march;
    case 3:
      return calendarDatePickerDictionary[language].april;
    case 4:
      return calendarDatePickerDictionary[language].may;
    case 5:
      return calendarDatePickerDictionary[language].june;
    case 6:
      return calendarDatePickerDictionary[language].july;
    case 7:
      return calendarDatePickerDictionary[language].august;
    case 8:
      return calendarDatePickerDictionary[language].september;
    case 9:
      return calendarDatePickerDictionary[language].october;
    case 10:
      return calendarDatePickerDictionary[language].november;
    case 11:
      return calendarDatePickerDictionary[language].december;
    default:
      return "";
  }
};

type CalendarDatePickerProps = {
  mode: "single" | "range" | "booking";
  language: "es" | "en";
  title?: string;
  minimumDate?: Date;
  maximumDate?: Date;
  customStyle?: React.CSSProperties;
};

const CalendarDatePicker = ({
  mode,
  language,
  title,
  minimumDate = new Date(1970, 0, 1),
  maximumDate = new Date(new Date().getFullYear() + 100, 1, 1),
  customStyle,
}: CalendarDatePickerProps) => {
  const monthsContainerRef = useRef<HTMLDivElement>(null);
  const firstMonthRef = useRef<HTMLDivElement>(null);
  const secondMonthRef = useRef<HTMLDivElement>(null);
  const fourthMonthRef = useRef<HTMLDivElement>(null);
  const fifthMonthRef = useRef<HTMLDivElement>(null);
  const isFirstMonthVisible = useIntersectionObserver(firstMonthRef, {
    root: monthsContainerRef.current,
    rootMargin: "0px",
    threshold: 0.8,
  });
  const isSecondMonthVisible = useIntersectionObserver(secondMonthRef, {
    root: monthsContainerRef.current,
    rootMargin: "0px",
    threshold: 0.8,
  });
  const isFourthMonthVisible = useIntersectionObserver(fourthMonthRef, {
    root: monthsContainerRef.current,
    rootMargin: "0px",
    threshold: 0.8,
  });
  const isFifthMonthVisible = useIntersectionObserver(fifthMonthRef, {
    root: monthsContainerRef.current,
    rootMargin: "0px",
    threshold: 0.8,
  });
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [monthsContainerKeyId, setMonthsContainerKeyId] = useState(Math.random());

  const dateClassName = (date: Date): string => {
    let className = styles["day"];
    if (date.getMonth() === month) {
      className += ` ${styles["day-in-month"]}`;
    } else {
      className += ` ${styles["day-not-in-month"]}`;
    }
    return className;
  };

  const centerMonthsContainer = useCallback(() => {
    monthsContainerRef.current?.scrollTo({
      top: 416,
    });
  }, [monthsContainerRef]);

  const monthVisibiliySideEffect = (
    monthOffset: number,
    timeReference: "past" | "future"
  ) => {
    const referenceDate = new Date(year, month + monthOffset, 1);
    const isReferenceDateHigherThanMinimumDate =
      referenceDate.valueOf() >= minimumDate.valueOf();
    const isRefereceDateLowerThanMaximumDate =
      referenceDate.valueOf() <= maximumDate.valueOf();
    const timeReferenceIsValid =
      timeReference === "past"
        ? isReferenceDateHigherThanMinimumDate
        : isRefereceDateLowerThanMaximumDate;
    if (timeReferenceIsValid) {
      setMonth(referenceDate.getMonth());
      setYear(referenceDate.getFullYear());
    }
  };

  useEffect(() => {
    centerMonthsContainer();
  }, [monthsContainerKeyId]);

  useEffect(() => {
    if (isFirstMonthVisible) {
      monthVisibiliySideEffect(-2, "past");
    }
  }, [isFirstMonthVisible]);
  useEffect(() => {
    if (isSecondMonthVisible) {
      monthVisibiliySideEffect(-1, "past");
    }
  }, [isSecondMonthVisible]);
  useEffect(() => {
    if (isFourthMonthVisible) {
      monthVisibiliySideEffect(1, "future");
    }
  }, [isFourthMonthVisible]);
  useEffect(() => {
    if (isFifthMonthVisible) {
      monthVisibiliySideEffect(2, "future");
    }
  }, [isFifthMonthVisible]);
  return (
    <div className={styles["calendar-date-picker"]} style={customStyle}>
      <section className={styles["title"]}>
        <BsFillCalendar3WeekFill />
        {title}
      </section>
      <section className={styles["month-and-year"]}>
        <select
          style={{ fontFamily: customStyle?.fontFamily }}
          className={styles["month-input"]}
          value={month}
          onChange={(event) => {
            setMonth(Number(event.target.value));
            setMonthsContainerKeyId(Math.random());
          }}
        >
          {Array(12)
            .fill(0)
            .map((_, index) => (
              <option key={getMonthName(index, language)} value={index}>
                {getMonthName(index, language)}
              </option>
            ))}
        </select>
        <InputBoxWithConfirmation
          inputType="number"
          divWrapperCustomStyle={{
            width: "4ch",
            border: "none",
            backgroundColor: "transparent",
            fontFamily: customStyle?.fontFamily,
          }}
          inputBoxCustomStyle={{
            padding: 0,
            fontFamily: customStyle?.fontFamily,
          }}
          maxLength={4}
          defaultValue={year.toString()}
          overrideCurrentValue={year.toString()}
          minimumValue={minimumDate.getFullYear().toString()}
          maximumValue={maximumDate?.getFullYear().toString()}
          onConfirmAction={(inputCurrentValue) => {
            let numericValue = Number(inputCurrentValue);
            if (numericValue < minimumDate.getFullYear()) {
              numericValue = minimumDate.getFullYear();
            }
            if (maximumDate && numericValue > maximumDate.getFullYear()) {
              numericValue = maximumDate.getFullYear();
            }
            setYear(numericValue);
          }}
        />
      </section>
      <section className={styles["week-days"]}>
        <p>{calendarDatePickerDictionary[language].monday.slice(0, 1).toUpperCase()}</p>
        <p>{calendarDatePickerDictionary[language].tuesday.slice(0, 1).toUpperCase()}</p>
        <p>
          {calendarDatePickerDictionary[language].wednesday.slice(0, 1).toUpperCase()}
        </p>
        <p>{calendarDatePickerDictionary[language].thursday.slice(0, 1).toUpperCase()}</p>
        <p>{calendarDatePickerDictionary[language].friday.slice(0, 1).toUpperCase()}</p>
        <p>{calendarDatePickerDictionary[language].saturday.slice(0, 1).toUpperCase()}</p>
        <p>{calendarDatePickerDictionary[language].sunday.slice(0, 1).toUpperCase()}</p>
      </section>
      <section
        key={monthsContainerKeyId}
        ref={monthsContainerRef}
        className={styles["calendar-scrollable-section"]}
      >
        {Array(5)
          .fill(0)
          .map((_, gridIndex) => {
            const monthOffset = gridIndex - 2;
            const referenceDate = new Date(year, month + monthOffset, 1);
            const isHigherThanMinimumDate =
              referenceDate.valueOf() >= minimumDate.valueOf();
            const isLowerThanMaximumDate =
              referenceDate.valueOf() <= maximumDate.valueOf();
            if (!isHigherThanMinimumDate || !isLowerThanMaximumDate) {
              return null;
            }
            const lastDayOfTheMonth = new Date(year, month + monthOffset + 1, 0);
            const isLastDayOfTheMonthSunday = lastDayOfTheMonth.getDay() === 0;
            let numberOfWeeksInMonth = numberOfWeeksInAMonth(referenceDate);
            if (!isLastDayOfTheMonthSunday) {
              numberOfWeeksInMonth = numberOfWeeksInMonth - 1;
            }
            const firstDayInMonthDayOfWeek = dayOfTheWeekStartingOnMonday(referenceDate);
            return (
              <div
                ref={
                  gridIndex === 0
                    ? firstMonthRef
                    : gridIndex === 1
                    ? secondMonthRef
                    : gridIndex === 3
                    ? fourthMonthRef
                    : fifthMonthRef
                }
                className={styles["days-grid"]}
                key={`grid:${jsToSqlDate(referenceDate)}`}
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
                          const numberOfMonth = month + monthOffset;
                          const numberOfDay =
                            rowIndex * 7 + columnIndex + 1 - firstDayInMonthDayOfWeek;
                          const date = new Date(year, numberOfMonth, numberOfDay);
                          return (
                            <div className={styles["day-cell"]} key={jsToSqlDate(date)}>
                              <p className={dateClassName(date)}>{date.getDate()}</p>
                            </div>
                          );
                        })}
                    </div>
                  ))}
              </div>
            );
          })}
      </section>
    </div>
  );
};

export default CalendarDatePicker;
