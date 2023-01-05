export const getMultidestinyYScrollPosition = (): string | null => {
  return sessionStorage.getItem("MultidestinyYScrollPosition");
};

export const setMultidestinyYScrollPosition = (yScroll: string) => {
  sessionStorage.setItem("MultidestinyYScrollPosition", yScroll);
};

export const eraseMultidestinyYScrollPosition = (): void => {
  sessionStorage.removeItem("MultidestinyYScrollPosition");
};

export const getMultidestinyMinimalPriceReachedOnEditPopUp = (): string | null => {
  return localStorage.getItem("MultidestinyMinimalPriceReachedOnEditPopUp");
};

export const setMultidestinyMinimalPriceReachedOnEditPopUp = (state: string) => {
  localStorage.setItem("MultidestinyMinimalPriceReachedOnEditPopUp", state);
};
