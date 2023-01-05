import turboSuiteUrls from "../../common/turboSuiteUrls";
import { access } from "../../common/constants";
import { getAccessToken } from "../../Services/accessToken";

const token = access !== undefined && access !== "" ? access : getAccessToken();

const constructorStringQuery = (
  queryObject:
    | {
        [key: string]: string | number | boolean;
      }
    | undefined
): string => {
  let query = `?access-token=${token}`;
  if (queryObject) {
    for (const key in queryObject) {
      if (Object.hasOwnProperty.call(queryObject, key)) {
        query = query.concat(`&${key}=${queryObject[key]}`);
      }
    }
  }
  return query;
};

function developmentCallsTranslator(
  codigo: string,
  body: { [key: string]: any } | undefined
) {
  let urlBase: string = "";
  if (process.env.NODE_ENV === "production") {
    urlBase = turboSuiteUrls.apiV1Prod;
  } else if (process.env.NODE_ENV === "development") {
    urlBase = turboSuiteUrls.apiV1PreProd;
  } else if (process.env.NODE_ENV === "test") {
    urlBase = turboSuiteUrls.testEnviroment;
  }
  switch (codigo) {
    // Examples GET POST PUT DELETE
    case "AP1":
      return {
        method: "GET",
        url:
          urlBase +
          "internal-property-manager-look-and-feels/" +
          body?.propertyManagerLookAndFeelCode +
          "?access-token=" +
          token,
        data: undefined,
        headers: {
          "Content-Type": "application/json",
        },
      };
    case "AP2":
      return {
        method: "GET",
        url: urlBase + "route" + constructorStringQuery(body),
        data: undefined,
        headers: {
          "Content-Type": "application/json",
        },
      };
    case "AP3":
      return {
        method: "POST",
        url: urlBase + "route?access-token=" + token,
        data: body,
        headers: {
          "Content-Type": "application/json",
        },
      };
    case "AP4":
      return {
        method: "PUT",
        url: urlBase + "route?access-token=" + token,
        data: body,
        headers: {
          "Content-Type": "application/json",
        },
      };
    case "AP5":
      return {
        method: "DELETE",
        url: urlBase + "route?access-token=" + token,
        data: undefined,
        headers: {
          "Content-Type": "application/json",
        },
      };
    case "DE1":
      return {
        method: "GET",
        url: urlBase + "countries" + constructorStringQuery(body),
        data: undefined,
        headers: {
          "Content-Type": "application/json",
        },
      };
    case "DE2":
      return {
        method: "GET",
        url: urlBase + "regions" + constructorStringQuery(body),
        data: undefined,
        headers: {
          "Content-Type": "application/json",
        },
      };
    case "DE3":
      return {
        method: "GET",
        url: urlBase + "provinces" + constructorStringQuery(body),
        data: undefined,
        headers: {
          "Content-Type": "application/json",
        },
      };
    case "DE4":
      return {
        method: "GET",
        url: urlBase + "municipalities" + constructorStringQuery(body),
        data: undefined,
        headers: {
          "Content-Type": "application/json",
        },
      };
    default:
      throw Error(`Invalid endpoint code: ${codigo} \n payload: ${JSON.stringify(body)}`);
  }
}

export default developmentCallsTranslator;
