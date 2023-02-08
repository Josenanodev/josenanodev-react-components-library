//Librerias de terceros
import * as XLSX from "xlsx-js-style";

import { DataObjectXlsxType } from "./types";

function styleObjectParser(styleObject: DataObjectXlsxType) {
  let restultantStyleObject: { v: string | number; s: any } = {
    v: styleObject.value,
    s: {},
  };
  if (styleObject.allign)
    restultantStyleObject.s.alignment = { ...styleObject.allign };
  if (styleObject.fontSize)
    restultantStyleObject.s.font = {
      ...restultantStyleObject.s.font,
      sz: styleObject.fontSize,
    };
  if (styleObject.fontColor)
    restultantStyleObject.s.font = {
      ...restultantStyleObject.s.font,
      color: { rgb: styleObject.fontColor },
    };
  if (styleObject.bold)
    restultantStyleObject.s.font = {
      ...restultantStyleObject.s.font,
      bold: styleObject.bold,
    };
  if (styleObject.backgroundColor)
    restultantStyleObject.s.fill = {
      ...restultantStyleObject.s.fill,
      fgColor: { rgb: styleObject.backgroundColor },
    };
  if (styleObject.borders)
    restultantStyleObject.s.border = {
      bgColor: styleObject.borders,
    };
  return restultantStyleObject;
}

export function downloadExcel(
  fileName: string,
  data:
    | {
        [key: string]: DataObjectXlsxType[][];
      }
    | undefined,
  headers:
    | {
        [key: string]: DataObjectXlsxType[];
      }
    | undefined
) {
  if (data !== undefined) {
    const wb = XLSX.utils.book_new();
    for (const sheetName in data) {
      if (Object.prototype.hasOwnProperty.call(data, sheetName)) {
        let dataXlsxJs: {
          v: string | number;
          s: any;
        }[][] = [];
        if (headers !== undefined) {
          dataXlsxJs = [
            headers[sheetName].map((header) => styleObjectParser(header)),
            ...data[sheetName].map((row) =>
              row.map((cell) => styleObjectParser(cell))
            ),
          ];
        } else {
          dataXlsxJs = [
            ...data[sheetName].map((row) =>
              row.map((cell) => styleObjectParser(cell))
            ),
          ];
        }
        const ws = XLSX.utils.aoa_to_sheet(dataXlsxJs);
        XLSX.utils.book_append_sheet(wb, ws, sheetName);
      }
    }
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }
}
