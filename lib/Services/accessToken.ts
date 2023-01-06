export const getAccessToken = (): string | null => {
  return localStorage.getItem("access_token_turbosuite");
};

export const setAccessToken = (token: string) => {
  localStorage.setItem("access_token_turbosuite", token);
};

export const eraseAccessToken = () => {
  localStorage.removeItem("access_token_turbosuite");
};
