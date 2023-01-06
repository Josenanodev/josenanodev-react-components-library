import { SeasonsType } from "../common/types";

/**
 *
 * @param season season type
 * @returns a color based on generic green palette, if season does not match any color, then it returns transparent
 */
function colorBasedOnSeason(season: SeasonsType): string {
  if (season === "high") {
    return "var(--green-palette-five)";
  }
  if (season === "medium high") {
    return "var(--green-palette-four)";
  }
  if (season === "medium") {
    return "var(--green-palette-three)";
  }
  if (season === "medium low") {
    return "var(--green-palette-two)";
  }
  if (season === "low") {
    return "var(--green-palette-one)";
  }
  return "transparent";
}

export default colorBasedOnSeason;
