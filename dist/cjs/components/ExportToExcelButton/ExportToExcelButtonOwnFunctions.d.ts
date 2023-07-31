import { DataObjectXlsxType } from "./types";
export declare function downloadExcel(fileName: string, data: {
    [key: string]: DataObjectXlsxType[][];
} | undefined, headers: {
    [key: string]: DataObjectXlsxType[];
} | undefined): void;
