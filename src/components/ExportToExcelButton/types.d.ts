export interface ExportToExcelButtonPropsType {
  customButtonText?: string;
  customClass?: string;
  fileName?: string;
  headers?: { [key: string]: dataObjectXlsxType[] };
  data?: { [key: string]: dataObjectXlsxType[][] };
  onAfterExport?: Function;
  disabled?: boolean;
}

export interface styleObjectXlsxType {
  allign?: {
    vertical: "top" | "center" | "bottom";
    horizontal: "left" | "center" | "right";
  };
  fontSize?: number;
  fontColor?: string;
  bold?: boolean;
  backgroundColor?: string;
  borders?: {
    top: borderStyleType;
    bottom: borderStyleType;
    left: borderStyleType;
    right: borderStyleType;
  };
}
export interface dataObjectXlsxType extends styleObjectXlsxType {
  value: string | number;
}

type borderStyleType =
  | "dashDotDot"
  | "dashDot"
  | "dashed"
  | "dotted"
  | "hair"
  | "mediumDashDotDot"
  | "mediumDashDot"
  | "mediumDashed"
  | "medium"
  | "slantDashDot"
  | "thick"
  | "thin";
