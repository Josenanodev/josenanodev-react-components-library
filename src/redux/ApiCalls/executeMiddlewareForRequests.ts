import { propertyManagerCode } from "../../common/constants";

const endpointExclusions = [""];

function executeMiddlewareForRequests(action: string): boolean {
  if (endpointExclusions.includes(action)) {
    return true;
  } else if (
    process.env.NODE_ENV === "production" &&
    propertyManagerCode !== "" &&
    propertyManagerCode !== undefined
  ) {
    return true;
  } else {
    return false;
  }
}

export default executeMiddlewareForRequests;
