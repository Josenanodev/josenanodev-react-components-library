/**
 * 
 * @param multicalendarId id of the multicalendar (multicalendarId prop)
 * @returns saved height scroll position of selected multicalendar
 */
export const getMulticalendarScrollTopPosition = (
  multicalendarId: string
): string | null => {
  return sessionStorage.getItem(`MulticalendarScrollTopPosition-${multicalendarId}`);
};

/**
 * 
 * @param multicalendarId id of the multicalendar (multicalendarId prop)
 * @param scrollTop scroll height number
 */
export const setMulticalendarScrollTopPosition = (
  multicalendarId: string,
  scrollTop: string
) => {
  sessionStorage.setItem(`MulticalendarScrollTopPosition-${multicalendarId}`, scrollTop);
};

/**
 * 
 * @param multicalendarId id of the multicalendar (multicalendarId prop)
 */
export const eraseMulticalendarScrollTopPosition = (multicalendarId: string): void => {
  sessionStorage.removeItem(`MulticalendarScrollTopPosition-${multicalendarId}`);
};

/**
 * 
 * @param multicalendarId id of the multicalendar (multicalendarId prop)
 * @returns saved horizontal scroll position of selected multicalendar
 */
export const getMulticalendarScrollLeftPosition = (
  multicalendarId: string
): string | null => {
  return sessionStorage.getItem(`MulticalendarScrollLeftPosition-${multicalendarId}`);
};

/**
 * 
 * @param multicalendarId id of the multicalendar (multicalendarId prop)
 * @param xScroll left scroll number
 */
export const setMulticalendarScrollLeftPosition = (
  multicalendarId: string,
  scrollLeft: string
) => {
  sessionStorage.setItem(`MulticalendarScrollLeftPosition-${multicalendarId}`, scrollLeft);
};

/**
 * 
 * @param multicalendarId id of the multicalendar (multicalendarId prop)
 */
export const eraseMulticalendarScrollLeftPosition = (multicalendarId: string): void => {
  sessionStorage.removeItem(`MulticalendarScrollLeftPosition-${multicalendarId}`);
};
