import React from "react";
export type CalendarDatePickerProps = {
    mode: "single" | "multiple" | "range" | "booking";
    onSelectedDatesChange: (dates: Date[]) => void;
    language?: "es" | "en";
    customDates?: {
        color: string;
        dates: Date[];
        selectable: boolean;
        crossed?: boolean;
        clickSideEffect?: (date: Date) => void;
    }[];
    minimumDate?: Date;
    maximumDate?: Date;
    customStyle?: React.CSSProperties;
};
declare const CalendarDatePicker: ({ mode, onSelectedDatesChange, language, customDates, minimumDate, maximumDate, customStyle, }: CalendarDatePickerProps) => React.JSX.Element;
export default CalendarDatePicker;
