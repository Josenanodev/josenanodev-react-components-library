import React from "react";
import { CalendarDatePickerProps } from "../CalendarDatePicker";
type CalendarScrollableSectionProps = {
    dates: Date[];
    month: number;
    year: number;
    mode: CalendarDatePickerProps["mode"];
    onSelectedDatesChange: CalendarDatePickerProps["onSelectedDatesChange"];
    onFocusedMonth: (month: number, year: number) => void;
    customDates: CalendarDatePickerProps["customDates"];
    minimumDate?: CalendarDatePickerProps["minimumDate"];
    maximumDate?: CalendarDatePickerProps["maximumDate"];
};
declare const CalendarScrollableSection: ({ dates, month, year, mode, onSelectedDatesChange, onFocusedMonth, customDates, minimumDate, maximumDate, }: CalendarScrollableSectionProps) => React.JSX.Element;
export default CalendarScrollableSection;
