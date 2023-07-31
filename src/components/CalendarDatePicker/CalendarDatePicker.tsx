import React, { useState } from "react";
import styles from "./CalendarDatePicker.module.scss";
import { BsFillCalendar3WeekFill } from "react-icons/bs";
import InputBoxWithConfirmation from "../InputBoxWithConfirmation/InputBoxWithConfirmation";
import CalendarScrollableSection from "./subcomponents/CalendarScrollableSection";

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
    today: "today",
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
    today: "hoy",
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

export type CalendarDatePickerProps = {
  mode: "single" | "multiple" | "range" | "booking";
  onSelectedDatesChange: (dates: Date[]) => void;
  language?: "es" | "en";
  customDates?: {
    color: string;
    dates: Date[];
    selectable: boolean;
    crossed?: boolean;
    clickSideEffect?: (date: Date) => void;
  }[];
  title?: string;
  minimumDate?: Date;
  maximumDate?: Date;
  customStyle?: React.CSSProperties;
};

const CalendarDatePicker = ({
  mode,
  onSelectedDatesChange = () => {},
  language = "en",
  customDates = [],
  title,
  minimumDate = new Date(1970, 0, 1),
  maximumDate = new Date(new Date().getFullYear() + 100, 1, 1),
  customStyle,
}: CalendarDatePickerProps) => {
  const [dates, setDates] = useState<Date[]>([]);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [reloadKey, setReloadKey] = useState(Math.random());

  const isDateValidForChange = (date: Date) => {
    const minimumMonthFirstDate = new Date(
      minimumDate.getFullYear(),
      minimumDate.getMonth(),
      1
    );
    const maximumMonthLastDate = new Date(
      maximumDate.getFullYear(),
      maximumDate.getMonth() + 1,
      0
    );
    const isDateHigherThanMinimumMonthFirstDate =
      date.valueOf() >= minimumMonthFirstDate.valueOf();
    const isDateLowerThanMaximumMonthLastDate =
      date.valueOf() <= maximumMonthLastDate.valueOf();
    return isDateHigherThanMinimumMonthFirstDate && isDateLowerThanMaximumMonthLastDate;
  };

  return (
    <div className={styles["calendar-date-picker"]} style={customStyle}>
      <section className={styles["title"]}>
        <BsFillCalendar3WeekFill />
        {title}
        <button
          className={styles["today-button"]}
          onClick={() => {
            const today = new Date();
            if (isDateValidForChange(today)) {
              setMonth(today.getMonth());
              setYear(today.getFullYear());
              setReloadKey(Math.random());
            }
          }}
        >
          {calendarDatePickerDictionary[language]["today"].slice(0, 1).toUpperCase() +
            calendarDatePickerDictionary[language]["today"].slice(1)}
        </button>
      </section>
      <section className={styles["month-and-year"]}>
        <select
          style={{ fontFamily: customStyle?.fontFamily }}
          className={styles["month-input"]}
          value={month}
          onChange={(event) => {
            const numericValue = Number(event.target.value);
            setMonth(numericValue);
            setReloadKey(Math.random());
          }}
        >
          {Array(12)
            .fill(0)
            .map((_, index) => {
              const referenceDate = new Date(year, index, 1);
              const isDisabled = !isDateValidForChange(referenceDate);
              return (
                <option
                  key={getMonthName(index, language)}
                  value={index}
                  disabled={isDisabled}
                >
                  {getMonthName(index, language)}
                </option>
              );
            })}
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
          maximumValue={maximumDate.getFullYear().toString()}
          onConfirmAction={(inputCurrentValue) => {
            let numericValue = Number(inputCurrentValue);
            const referenceDate = new Date(numericValue, month, 1);
            if (!isDateValidForChange(referenceDate)) {
              if (referenceDate.valueOf() < minimumDate.valueOf()) {
                setYear(minimumDate.getFullYear());
                setMonth(minimumDate.getMonth());
                setReloadKey(Math.random());
              } else if (referenceDate.valueOf() > maximumDate.valueOf()) {
                setYear(maximumDate.getFullYear());
                setMonth(maximumDate.getMonth());
                setReloadKey(Math.random());
              }
            } else {
              setYear(numericValue);
              setReloadKey(Math.random());
            }
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
      <CalendarScrollableSection
        key={reloadKey}
        dates={dates}
        year={year}
        month={month}
        mode={mode}
        onSelectedDatesChange={(selectedDates) => {
          onSelectedDatesChange(selectedDates);
          setDates(selectedDates);
        }}
        onFocusedMonth={(month, year) => {
          setMonth(month);
          setYear(year);
        }}
        customDates={customDates}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
      />
    </div>
  );
};

export default CalendarDatePicker;
