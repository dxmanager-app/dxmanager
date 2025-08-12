// app/dxmanager/src/logic/waisr/types.ts
export type Gender = "M" | "K"

export type Subtest =
  | "Wiadomości"
  | "Powtarzanie Cyfr"
  | "Słownik"
  | "Arytmetyka"
  | "Rozumienie"
  | "Podobieństwa"
  | "Braki w Obrazkach"
  | "Porządkowanie Obrazków"
  | "Klocki"
  | "Układanki"
  | "Symbole Cyfr"

export type AgeGroupKey =
  | "16-17"
  | "18-19"
  | "20-24"
  | "25-34"
  | "35-44"
  | "45-54"
  | "55-64"
  | "65-69"
  | "70-74"
  | "75-79"
  | "80+"

export type NormRange = { min: number; max: number; wp: number }
export type NormsForGroup = Record<Subtest, NormRange[]>
export type NormsIndex = Record<AgeGroupKey, NormsForGroup>

export type RawScores = Partial<Record<Subtest, number | null>>

export type CalculatedPerSubtest = {
  ws: number | null
  wp: number | null
  p95?: number | null
}

export type CalculatedResult = {
  age: number
  gender: Gender
  ageGroup: AgeGroupKey
  bySubtest: Record<Subtest, CalculatedPerSubtest>
  sums: {
    slowna: number | null
    bezslowna: number | null
    pelna: number | null
  }
  iq?: {
    slowne?: number | null
    bezslowne?: number | null
    pelne?: number | null
  }
  factors?: Record<string, { sum: number | null; iq?: number | null }>
}
