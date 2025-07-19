import { Answer, Gender, ScaleScore, Mmpi2Scores } from "./types"
import { mainScales } from "./criteria/main-scales"
import { calculateRawScale } from "./calculators/raw"
import { calculateTenScales } from "./calculators/ten"
import { calculateKCorrected } from "./calculators/k-corrected"
import { calculateVrin } from "./calculators/vrin"
import { calculateTrin } from "./calculators/trin"

export function calculateScores(answers: Answer[], gender: Gender): Mmpi2Scores {
  const rawScores: Record<string, number> = {}

  for (const scale of Object.keys(mainScales)) {
    rawScores[scale] = calculateRawScale(answers, scale, gender)
  }

  const tenScores = calculateTenScales(rawScores, gender)
  const kScores = calculateKCorrected(rawScores)

  const scores: Mmpi2Scores = {}

  for (const scale of Object.keys(rawScores)) {
    scores[scale] = {
      raw: rawScores[scale],
      ...(tenScores[scale] !== undefined ? { t: tenScores[scale] } : {}),
      ...(kScores[scale] !== undefined ? { k: kScores[scale] } : {}),
    }
  }

  scores["VRIN"] = { raw: calculateVrin(answers) }
  scores["TRIN"] = { raw: calculateTrin(answers) }

  return scores
}
