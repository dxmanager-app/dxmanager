export type Gender = "male" | "female"

export type ScoreMode = "t" | "k" | "raw"

export interface ScaleScore {
  raw: number
  t?: number
  k?: number
}

export type Mmpi2Scores = Record<string, ScaleScore>
export type Answer = "T" | "F" | null
