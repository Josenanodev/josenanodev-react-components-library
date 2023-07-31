import React from "react";
import "./ExportToExcelButton.css";
import { ExportToExcelButtonPropsType } from "./types";
declare const ExportToExcelButton: ({ customButtonText, customClass, fileName, headers, data, onAfterExport, disabled, }: ExportToExcelButtonPropsType) => React.JSX.Element;
export default ExportToExcelButton;
