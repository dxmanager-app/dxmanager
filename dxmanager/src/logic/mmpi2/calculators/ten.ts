import { MainScales } from "../criteria/main-scales"
import { tenScale } from "../criteria/ten-scale"
import { Gender } from "../types"

export const calculateTenScales = (
  scaleValues: Record<keyof MainScales, number>,
  gender: Gender
): Record<string, number> => {
  const g = gender === "F" ? "female" : "male"

  const entries = Object.entries(scaleValues).map(([scale, value]) => [
    scale,
    tenScale[g][scale]?.[value] ?? value,
  ])

  return Object.fromEntries(entries)
}
