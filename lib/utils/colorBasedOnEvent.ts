import { EventsType } from "../common/types";

/**
 *
 * @param event event type
 * @returns a color based on generic green palette, if event does not match any color, then it returns transparent
 */
function colorBasedOnEvent(event: EventsType): string {
  if (event === "1") {
    return "var(--green-palette-five)";
  }
  if (event === "2") {
    return "var(--green-palette-three)";
  }
  if (event === "3") {
    return "var(--green-palette-one)";
  }
  return "transparent";
}

export default colorBasedOnEvent;
