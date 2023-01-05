import { rest } from "msw";
import { propertyManagerCode } from "../common/constants";
import { lookAndFeelType } from "../common/types";
export const handlers = [
  rest.get("internal-property-manager-look-and-feels/", (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        code: "",
        logoUrl: "",
        primaryColor: "#ec6321",
        secondaryColor: "#46ba0d",
        fontFamily: "Roboto",
        enabled: true,
        propertyManagerCode: propertyManagerCode,
      } as lookAndFeelType)
    )
  ),
];
