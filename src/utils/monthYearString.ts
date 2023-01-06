import { languageType } from "../assets/languages/types";

//Variables

function monthYearString(dateObject: Date, language: languageType): string {
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
  } catch (error) {
    console.log(error);
    return "invalid date";
  }
}

export default monthYearString;
