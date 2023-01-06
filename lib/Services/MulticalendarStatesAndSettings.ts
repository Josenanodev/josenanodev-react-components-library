/**
 * 
 * @param multicalendarId id of the multicalendar (multicalendarId prop)
 * @returns saved height scroll position of selected multicalendar
 */
export const getMulticalendarYScrollPosition = (
  multicalendarId: string
): string | null => {
  return sessionStorage.getItem(`MulticalendarYScrollPosition-${multicalendarId}`);
};

/**
 * 
 * @param multicalendarId id of the multicalendar (multicalendarId prop)
 * @param yScroll scroll height number
 */
export const setMulticalendarYScrollPosition = (
  multicalendarId: string,
  yScroll: string
) => {
  sessionStorage.setItem(`MulticalendarYScrollPosition-${multicalendarId}`, yScroll);
};

/**
 * 
 * @param multicalendarId id of the multicalendar (multicalendarId prop)
 */
export const eraseMulticalendarYScrollPosition = (multicalendarId: string): void => {
  sessionStorage.removeItem(`MulticalendarYScrollPosition-${multicalendarId}`);
};
