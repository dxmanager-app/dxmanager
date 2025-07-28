// src/logic/mmpi2/compute.ts
import { calculateScores } from "./calculate"
import { Answer } from "@/logic/types"
import type { Mmpi2Scores, Gender } from "./types"

/**
 * Adapter frontendowego formatu płci ("M" | "K")
 * do wewnętrznej logiki testu ("M" | "F").
 */
export function computeScores(answers: Answer[], gender: "M" | "K"): Mmpi2Scores {
  const g: Gender = gender === "K" ? "F" : "M"
  return calculateScores(answers, g)
}
