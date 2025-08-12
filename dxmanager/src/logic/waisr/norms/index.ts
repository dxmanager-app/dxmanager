// app/dxmanager/src/logic/waisr/norms/index.ts
import type { NormsIndex } from "../types"

import norms_16_17 from "./16-17"
import norms_18_19 from "./18-19"
import norms_20_24 from "./20-24"
import norms_25_34 from "./25-34"
import norms_35_44 from "./35-44"
import norms_45_54 from "./45-54"
import norms_55_64 from "./55-64"
import norms_65_69 from "./65-69"
import norms_70_74 from "./70-74"
import norms_75_79 from "./75-79"
import norms_80_plus from "./80+"

export const norms: NormsIndex = {
  "16-17": norms_16_17,
  "18-19": norms_18_19,
  "20-24": norms_20_24,
  "25-34": norms_25_34,
  "35-44": norms_35_44,
  "45-54": norms_45_54,
  "55-64": norms_55_64,
  "65-69": norms_65_69,
  "70-74": norms_70_74,
  "75-79": norms_75_79,
  "80+": norms_80_plus, // fallback do 75–79, dopóki nie uzupełnimy
}
