import {  OccupationsType } from "../common/types";

/**
 *
 * @param occupation occupation type
 * @returns a color based on generic green palette, if occupation does not match any color, then it returns transparent
 */
function colorBasedOnOccupation(occupation: OccupationsType): string {
  if (occupation === "high") {
    return "var(--green-palette-five)";
  }
  if (occupation === "medium") {
    return "var(--green-palette-three)";
  }
  if (occupation === "low") {
    return "var(--green-palette-one)";
  }
  return "transparent";
}

export default colorBasedOnOccupation;
