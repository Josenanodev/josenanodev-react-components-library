"use strict";
/**
 *
 * @param sqlDate sql date format, for example 1993-03-29
 * @returns Date Object
 */
Object.defineProperty(exports, "__esModule", { value: true });
function sqlToJsDate(sqlDate) {
    let dateArray = sqlDate.split("-");
    //Es necesario restar 1 al mes ya que el mes de Enero comienza con el valor 0
    let jsDate = new Date(Number(dateArray[0]), Number(dateArray[1]) - 1, Number(dateArray[2]));
    return jsDate;
}
exports.default = sqlToJsDate;
