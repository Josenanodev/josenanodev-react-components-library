//Librerias de terceros
import * as XLSX from "xlsx-js-style";

import { DataObjectXlsxType } from "./types";

function styleObjectParser(styleObject: DataObjectXlsxType) {
  let restultantStyleObject: { v: string | number; s: any } = {
    v: styleObject.value,
    s: {},
  };
  if (styleObject.allign) restultantStyleObject.s.alignment = { ...styleObject.allign };
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
      bgColor: { rgb: styleObject.backgroundColor },
    };
  if (styleObject.foregroundColor)
    restultantStyleObject.s.fill = {
      ...restultantStyleObject.s.fill,
      fgColor: { rgb: styleObject.foregroundColor },
    };
  if (styleObject.borders)
    restultantStyleObject.s.border = {
      ...styleObject.borders,
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
    const workbook = XLSX.utils.book_new();
    for (const sheetName in data) {
      if (Object.prototype.hasOwnProperty.call(data, sheetName)) {
        let dataXlsxJs: {
          v: string | number;
          s: any;
        }[][] = [];
        if (
          headers !== undefined &&
          Object.prototype.hasOwnProperty.call(headers, sheetName)
        ) {
          dataXlsxJs = [
            headers[sheetName].map((header) => styleObjectParser(header)),
            ...data[sheetName].map((row) => row.map((cell) => styleObjectParser(cell))),
          ];
        } else {
          dataXlsxJs = [
            ...data[sheetName].map((row) => row.map((cell) => styleObjectParser(cell))),
          ];
        }
        const worksheet = XLSX.utils.aoa_to_sheet(dataXlsxJs);
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
      }
    }
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  }
}
