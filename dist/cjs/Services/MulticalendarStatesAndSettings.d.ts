/**
 *
 * @param multicalendarId id of the multicalendar (multicalendarId prop)
 * @returns saved height scroll position of selected multicalendar
 */
export declare const getMulticalendarYScrollPosition: (multicalendarId: string) => string | null;
/**
 *
 * @param multicalendarId id of the multicalendar (multicalendarId prop)
 * @param yScroll scroll height number
 */
export declare const setMulticalendarYScrollPosition: (multicalendarId: string, yScroll: string) => void;
/**
 *
 * @param multicalendarId id of the multicalendar (multicalendarId prop)
 */
export declare const eraseMulticalendarYScrollPosition: (multicalendarId: string) => void;
