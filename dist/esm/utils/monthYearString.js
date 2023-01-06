//Variables
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
export default monthYearString;
//# sourceMappingURL=monthYearString.js.map