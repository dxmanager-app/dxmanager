// src/types/results.ts

export interface ScaleScore {
  key: string
  ws?: number
  k?: number
  t: number
  hidden?: boolean
}

export interface ResultEntry {
  testId: string
  gender: "M" | "K" | ""
  scores: Record<string, ScaleScore>
  meta?: {
    name?: string
    age?: number
    education?: string
    job?: string
    duration?: string
    notes?: string
  }
}

export interface Settings {
  groups: Record<string, ScaleScore[]>
}
