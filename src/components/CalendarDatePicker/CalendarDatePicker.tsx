import React, { useState, useRef } from "react";
import styles from "./CalendarDatePicker.module.scss";
import { BsFillCalendar3WeekFill } from "react-icons/bs";
import dayOfTheWeekStartingOnMonday from "../../utils/dayOfTheWeekStartingOnMonday";
import numberOfWeeksInAMonth from "../../utils/numberOfWeeksInAMonth";
import jsToSqlDate from "../../utils/jsToSqlDate";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";

type CalendarDatePickerProps = {
  mode: "single" | "range" | "booking";
  language: "es" | "en";
  title?: string;
};

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

const CalendarDatePicker = ({ mode, language, title }: CalendarDatePickerProps) => {
  const monthsContainerRef =
    useRef<HTMLDivElement & { month: number; year: number }>(null);
  const monthsRefs = useRef<(HTMLDivElement & { month: number; year: number })[]>([]);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const intersectionObservers = monthsRefs.current.map((ref) =>
    useIntersectionObserver(
      ref,
      (entries) => {
        if (entries.every((entry) => entry.isIntersecting)) {
          setMonth(ref.month);
          setYear(ref.year);
        }
      },
      { root: monthsContainerRef.current, rootMargin: "0px", threshold: 1 }
    )
  );
  intersectionObservers;
  return (
    <div className={styles["calendar-date-picker"]}>
      <section className={styles["title"]}>
        <BsFillCalendar3WeekFill />
        {title}
      </section>
      <section className={styles["month-and-year"]}>
        <p>{`${getMonthName(month, language)} ${year}`}</p>
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
      <section ref={monthsContainerRef} className={styles["calendar-scrollable-section"]}>
        {Array(5)
          .fill(0)
          .map((_, gridIndex) => {
            const referenceDate = new Date(year, month + gridIndex, 1);
            const lastDayOfTheMonth = new Date(year, month + gridIndex + 1, 0);
            const isLastDayOfTheMonthSunday = lastDayOfTheMonth.getDay() === 0;
            let numberOfWeeksInMonth = numberOfWeeksInAMonth(referenceDate);
            if (!isLastDayOfTheMonthSunday) {
              numberOfWeeksInMonth = numberOfWeeksInMonth - 1;
            }
            const firstDayInMonthDayOfWeek = dayOfTheWeekStartingOnMonday(referenceDate);
            return (
              <div
                ref={(ref) => {
                  if (ref) {
                    monthsRefs.current[gridIndex] = {
                      ...ref,
                      month: referenceDate.getMonth(),
                      year: referenceDate.getFullYear(),
                    };
                  }
                }}
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
                          const numberOfMonth = month + gridIndex;
                          const numberOfDay =
                            rowIndex * 7 + columnIndex + 1 - firstDayInMonthDayOfWeek;
                          const date = new Date(year, numberOfMonth, numberOfDay);
                          return (
                            <div className={styles["day-cell"]} key={jsToSqlDate(date)}>
                              <p className={styles["day"]}>{date.getDate()}</p>
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
