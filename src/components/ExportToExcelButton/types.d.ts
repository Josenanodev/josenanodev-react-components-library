export interface ExportToExcelButtonPropsType {
  customButtonText?: string;
  customClass?: string;
  fileName?: string;
  headers?: { [key: string]: DataObjectXlsxType[] };
  data?: { [key: string]: DataObjectXlsxType[][] };
  onAfterExport?: Function;
  disabled?: boolean;
}

export interface StyleObjectXlsxType {
  allign?: {
    vertical: "top" | "center" | "bottom";
    horizontal: "left" | "center" | "right";
  };
  fontSize?: number;
  fontColor?: string;
  bold?: boolean;
  backgroundColor?: string;
  foregroundColor?: string;
  borders?: {
    top?: { style: BorderStyleType; color: string };
    bottom?: { style: BorderStyleType; color: string };
    left?: { style: BorderStyleType; color: string };
    right?: { style: BorderStyleType; color: string };
  };
}
export interface DataObjectXlsxType extends StyleObjectXlsxType {
  value: string | number;
}

type BorderStyleType =
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
