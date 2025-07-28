export type Answer = "T" | "F" | null

export type Gender = "M" | "F"

export type Mode = "raw" | "ten" | "k"

export interface ScaleScore {
  raw: number
  t?: number
  k?: number
}

export type Mmpi2Scores = Record<string, ScaleScore>
