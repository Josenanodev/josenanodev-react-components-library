/**
 *
 * @param multicalendarId id of the multicalendar (multicalendarId prop)
 * @returns saved height scroll position of selected multicalendar
 */
export declare const getMulticalendarScrollTopPosition: (multicalendarId: string) => string | null;
/**
 *
 * @param multicalendarId id of the multicalendar (multicalendarId prop)
 * @param scrollTop scroll height number
 */
export declare const setMulticalendarScrollTopPosition: (multicalendarId: string, scrollTop: string) => void;
/**
 *
 * @param multicalendarId id of the multicalendar (multicalendarId prop)
 */
export declare const eraseMulticalendarScrollTopPosition: (multicalendarId: string) => void;
/**
 *
 * @param multicalendarId id of the multicalendar (multicalendarId prop)
 * @returns saved horizontal scroll position of selected multicalendar
 */
export declare const getMulticalendarScrollLeftPosition: (multicalendarId: string) => string | null;
/**
 *
 * @param multicalendarId id of the multicalendar (multicalendarId prop)
 * @param xScroll left scroll number
 */
export declare const setMulticalendarScrollLeftPosition: (multicalendarId: string, scrollLeft: string) => void;
/**
 *
 * @param multicalendarId id of the multicalendar (multicalendarId prop)
 */
export declare const eraseMulticalendarScrollLeftPosition: (multicalendarId: string) => void;
