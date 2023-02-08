export interface ExportToExcelButtonPropsType {
  customButtonText?: string;
  customClass?: string;
  fileName?: string;
  headers?: { [key: string]: dataObjectXlsxType[] };
  data?: { [key: string]: dataObjectXlsxType[][] };
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
  borders?: {
    top: BorderStyleType;
    bottom: BorderStyleType;
    left: BorderStyleType;
    right: BorderStyleType;
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
