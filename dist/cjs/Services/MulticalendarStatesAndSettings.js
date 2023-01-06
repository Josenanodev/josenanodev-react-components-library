"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eraseMulticalendarYScrollPosition = exports.setMulticalendarYScrollPosition = exports.getMulticalendarYScrollPosition = void 0;
/**
 *
 * @param multicalendarId id of the multicalendar (multicalendarId prop)
 * @returns saved height scroll position of selected multicalendar
 */
const getMulticalendarYScrollPosition = (multicalendarId) => {
    return sessionStorage.getItem(`MulticalendarYScrollPosition-${multicalendarId}`);
};
exports.getMulticalendarYScrollPosition = getMulticalendarYScrollPosition;
/**
 *
 * @param multicalendarId id of the multicalendar (multicalendarId prop)
 * @param yScroll scroll height number
 */
const setMulticalendarYScrollPosition = (multicalendarId, yScroll) => {
    sessionStorage.setItem(`MulticalendarYScrollPosition-${multicalendarId}`, yScroll);
};
exports.setMulticalendarYScrollPosition = setMulticalendarYScrollPosition;
/**
 *
 * @param multicalendarId id of the multicalendar (multicalendarId prop)
 */
const eraseMulticalendarYScrollPosition = (multicalendarId) => {
    sessionStorage.removeItem(`MulticalendarYScrollPosition-${multicalendarId}`);
};
exports.eraseMulticalendarYScrollPosition = eraseMulticalendarYScrollPosition;
//# sourceMappingURL=MulticalendarStatesAndSettings.js.map