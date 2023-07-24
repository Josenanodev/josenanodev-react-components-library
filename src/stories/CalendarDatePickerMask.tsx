import React from "react";
import CalendarDatePicker, {
  CalendarDatePickerProps,
} from "../components/CalendarDatePicker/CalendarDatePicker";

const CalendarDatePickerMask = (props: CalendarDatePickerProps) => {
  const isMimimumDateInMilliseconds = typeof props.minimumDate === "number";
  const isMaximumDateInMilliseconds = typeof props.maximumDate === "number";
  return (
    <CalendarDatePicker
      {...props}
      minimumDate={
        props.minimumDate
          ? isMimimumDateInMilliseconds
            ? new Date(props.minimumDate)
            : props.minimumDate
          : undefined
      }
      maximumDate={
        props.maximumDate
          ? isMaximumDateInMilliseconds
            ? new Date(props.maximumDate)
            : props.maximumDate
          : undefined
      }
    />
  );
};

export default CalendarDatePickerMask;
