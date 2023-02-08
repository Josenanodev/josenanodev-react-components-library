//Librerias de terceros
import * as XLSX from "xlsx-js-style";

import { DataObjectXlsxType } from "./types";

function styleObjectParser(styleObject: DataObjectXlsxType) {
  let objetoResultante: { v: string | number; s: any } = {
    v: styleObject.value,
    s: {},
  };
  if (styleObject.allign)
    objetoResultante.s.alignment = { ...styleObject.allign };
  if (styleObject.fontSize)
    objetoResultante.s.font = {
      ...objetoResultante.s.font,
      sz: styleObject.fontSize,
    };
  if (styleObject.fontColor)
    objetoResultante.s.font = {
      ...objetoResultante.s.font,
      color: { rgb: styleObject.fontColor },
    };
  if (styleObject.bold)
    objetoResultante.s.font = {
      ...objetoResultante.s.font,
      bold: styleObject.bold,
    };
  if (styleObject.backgroundColor)
    objetoResultante.s.fill = {
      ...objetoResultante.s.fill,
      fgColor: { rgb: styleObject.backgroundColor },
    };
  if (styleObject.borders)
    objetoResultante.s.border = {
      bgColor: styleObject.borders,
    };
  return objetoResultante;
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
    for (const hoja in data) {
      if (Object.prototype.hasOwnProperty.call(data, hoja)) {
        let dataXlsxJs: {
          v: string | number;
          s: any;
        }[][] = [];
        if (headers !== undefined) {
          dataXlsxJs = [
            headers[hoja].map((encabezado) => styleObjectParser(encabezado)),
            ...data[hoja].map((fila) =>
              fila.map((celda) => styleObjectParser(celda))
            ),
          ];
        } else {
          dataXlsxJs = [
            ...data[hoja].map((fila) =>
              fila.map((celda) => styleObjectParser(celda))
            ),
          ];
        }
        const ws = XLSX.utils.aoa_to_sheet(dataXlsxJs);
        XLSX.utils.book_append_sheet(wb, ws, "hoja");
      }
    }
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }
}
