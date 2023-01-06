"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eraseAccessToken = exports.setAccessToken = exports.getAccessToken = void 0;
const getAccessToken = () => {
    return localStorage.getItem("access_token_turbosuite");
};
exports.getAccessToken = getAccessToken;
const setAccessToken = (token) => {
    localStorage.setItem("access_token_turbosuite", token);
};
exports.setAccessToken = setAccessToken;
const eraseAccessToken = () => {
    localStorage.removeItem("access_token_turbosuite");
};
exports.eraseAccessToken = eraseAccessToken;
