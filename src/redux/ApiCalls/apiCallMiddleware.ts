import axios from "axios";
import turboSuiteUrls from "../../common/turboSuiteUrls";
import developmentCallsTranslator from "./developmentCallsTranslator";
import executeMiddlewareForRequests from "./executeMiddlewareForRequests";

const urlBase = turboSuiteUrls.middleware;

export const apiCallMiddleware = (
  action: string,
  body: { [key: string]: any } | undefined,
  headers: { [key: string]: any } | undefined
) => {
  if (executeMiddlewareForRequests(action)) {
    return axios({
      method: "POST",
      url: urlBase,
      data: { ...body, action },
      headers: headers,
    });
  } else {
    return axios(developmentCallsTranslator(action, body));
  }
};
