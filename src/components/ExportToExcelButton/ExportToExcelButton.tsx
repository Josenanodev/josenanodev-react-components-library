import React from "react";
import * as ownFunctions from "./ExportToExcelButtonOwnFunctions";
import "./ExportToExcelButton.css";

//Iconos
import { RiFileExcel2Fill } from "react-icons/ri";

//Types
import { ExportToExcelButtonPropsType } from "./types";

const ExportToExcelButton = ({
  customButtonText = "Export to Excel",
  customClass,
  fileName = "untitled",
  headers,
  data,
  onAfterExport,
  disabled,
}: ExportToExcelButtonPropsType) => {
  return (
    <button
      disabled={disabled}
      className={customClass ? customClass : "export-to-excel-button"}
      onClick={() => {
        ownFunctions.downloadExcel(fileName, data, headers);
        if (onAfterExport !== undefined) {
          onAfterExport();
        }
      }}
    >
      {customButtonText} <RiFileExcel2Fill />
    </button>
  );
};

export default ExportToExcelButton;
