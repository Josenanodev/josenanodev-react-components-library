import { customWindow } from "./types";

declare let window: customWindow;

let turboSuiteUrls = {
  testEnviroment: "http://localhost",
  apiV1Prod: "https://api.turbosuite.es/v1/",
  apiV1PreProd: "https://api.demo.turbosuite.com/v1/",
  middleware: window.actionUrl,
};

export default turboSuiteUrls;