import { HolidaysType } from "../common/types";

/**
 *
 * @param holiday holiday type
 * @returns a color based on generic green palette, if holiday does not match any color, then it returns transparent
 */
function colorBasedOnHoliday(holiday: HolidaysType): string {
  if (holiday === "1") {
    return "var(--green-palette-five)";
  }
  if (holiday === "2") {
    return "var(--green-palette-three)";
  }
  if (holiday === "3") {
    return "var(--green-palette-one)";
  }
  return "transparent";
}

export default colorBasedOnHoliday;
