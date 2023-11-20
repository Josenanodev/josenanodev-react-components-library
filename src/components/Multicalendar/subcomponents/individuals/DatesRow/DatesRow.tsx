import React from "react";
import styles from "./DatesRow.module.scss";

type DatesRowProps = {
  visibleDates: Date[];
  width: number;
  height: number;
  cellsWidth: number;
  cellsHeight: number;
  offset: number;
  language: "es_ES" | "en_EN";
};

const DatesRow = ({
  visibleDates,
  width,
  height,
  cellsWidth,
  cellsHeight,
  offset,
  language,
}: DatesRowProps) => {
  const languageDictionary = {
    en_EN: {
      sunday: "Sunday",
      monday: "Monday",
      tuesday: "Tuesday",
      wednesday: "Wednesday",
      thursday: "Thursday",
      friday: "Friday",
      saturday: "Saturday",
      january: "January",
      february: "February",
      march: "March",
      april: "April",
      may: "May",
      june: "June",
      july: "July",
      august: "August",
      september: "September",
      october: "October",
      november: "November",
      december: "December",
    },
    es_ES: {
      sunday: "Domingo",
      monday: "Lunes",
      tuesday: "Martes",
      wednesday: "Miércoles",
      thursday: "Jueves",
      friday: "Viernes",
      saturday: "Sábado",
      january: "Enero",
      february: "Febrero",
      march: "Marzo",
      april: "Abril",
      may: "Mayo",
      june: "Junio",
      july: "Julio",
      august: "Agosto",
      september: "Septiembre",
      october: "Octubre",
      november: "Noviembre",
      december: "Diciembre",
    },
  };

  //Variables
  const weekdaysAbreviations = [
    languageDictionary[language]["sunday"].slice(0, 2),
    languageDictionary[language]["monday"].slice(0, 2),
    languageDictionary[language]["tuesday"].slice(0, 2),
    languageDictionary[language]["wednesday"].slice(0, 2),
    languageDictionary[language]["thursday"].slice(0, 2),
    languageDictionary[language]["friday"].slice(0, 2),
    languageDictionary[language]["saturday"].slice(0, 2),
  ];
  const monthsNames = [
    languageDictionary[language]["january"],
    languageDictionary[language]["february"],
    languageDictionary[language]["march"],
    languageDictionary[language]["april"],
    languageDictionary[language]["may"],
    languageDictionary[language]["june"],
    languageDictionary[language]["july"],
    languageDictionary[language]["august"],
    languageDictionary[language]["september"],
    languageDictionary[language]["october"],
    languageDictionary[language]["november"],
    languageDictionary[language]["december"],
  ];
  return (
    <div
      className={styles["dates-row"]}
      style={{
        width: width,
        height: height,
        paddingLeft: offset * cellsWidth,
      }}
    >
      {visibleDates.length > 0 &&
        visibleDates.map((dateObject) => (
          <div
            key={dateObject.toString()}
            className={styles["date-cell"]}
            style={{
              width: cellsWidth,
              height: cellsHeight,
            }}
          >
            <div
              className={styles["div-date-cell"]}
              data-is-today={
                dateObject.getDate() === new Date().getDate() &&
                dateObject.getMonth() === new Date().getMonth() &&
                dateObject.getFullYear() === new Date().getFullYear()
                  ? true
                  : false
              }
            >
              <div>
                <p>{weekdaysAbreviations[dateObject.getDay()]}</p>
                <p>{dateObject.getDate()}</p>
              </div>
            </div>
            {dateObject.getDate() === 1 && (
              <div className={styles["month-start"]}>
                <p>
                  {monthsNames[dateObject.getMonth()]} {dateObject.getFullYear()}
                </p>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default DatesRow;
