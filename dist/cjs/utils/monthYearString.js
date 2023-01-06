"use strict";
//Variables
Object.defineProperty(exports, "__esModule", { value: true });
function monthYearString(dateObject, language) {
    const monthsNames = [
        language["january"],
        language["february"],
        language["march"],
        language["april"],
        language["may"],
        language["june"],
        language["july"],
        language["august"],
        language["september"],
        language["october"],
        language["november"],
        language["december"],
    ];
    try {
        return `${monthsNames[dateObject.getMonth()]} ${dateObject.getFullYear()}`;
    }
    catch (error) {
        console.log(error);
        return "invalid date";
    }
}
exports.default = monthYearString;
