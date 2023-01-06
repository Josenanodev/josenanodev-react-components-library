export const getAccessToken = () => {
    return localStorage.getItem("access_token_turbosuite");
};
export const setAccessToken = (token) => {
    localStorage.setItem("access_token_turbosuite", token);
};
export const eraseAccessToken = () => {
    localStorage.removeItem("access_token_turbosuite");
};
