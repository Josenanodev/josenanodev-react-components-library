import React from "react";
export type CalendarDatePickerProps = {
    /** Selection model used by the calendar. */
    mode: "single" | "multiple" | "range" | "booking";
    /** Emits the current selection any time selected dates change. */
    onSelectedDatesChange: (dates: Date[]) => void;
    /** Language used for month, weekday, and Today labels. */
    language?: "es" | "en";
    /** Custom date rules used to color, disable, cross out, or handle specific days. */
    customDates?: {
        /** Background color applied to matching dates. */
        color: string;
        /** Dates affected by this rule. */
        dates: Date[];
        /** Whether matching dates can be selected. */
        selectable: boolean;
        /** Renders a diagonal crossed visual treatment on matching dates. */
        crossed?: boolean;
        /** Clears the current selection when a matching date is clicked. */
        clearSelectionIfClicked?: boolean;
        /** Optional side effect triggered when a matching date is clicked. */
        clickSideEffect?: (date: Date) => void;
    }[];
    /** Earliest date/month the user can navigate to. */
    minimumDate?: Date;
    /** Latest date/month the user can navigate to. */
    maximumDate?: Date;
    /** Inline style applied to the calendar root element. */
    customStyle?: React.CSSProperties;
};
declare const CalendarDatePicker: ({ mode, onSelectedDatesChange, language, customDates, minimumDate, maximumDate, customStyle, }: CalendarDatePickerProps) => React.JSX.Element;
export default CalendarDatePicker;
