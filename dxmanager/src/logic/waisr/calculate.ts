// app/dxmanager/src/logic/waisr/calculate.ts
import type {
  AgeGroupKey,
  CalculatedPerSubtest,
  CalculatedResult,
  Gender,
  RawScores,
  Subtest,
} from "./types"
import { norms } from "./norms/index"

// Lista podtestów zgodna z UI
export const SUBTESTS_SLOWNE: Subtest[] = [
  "Wiadomości",
  "Powtarzanie Cyfr",
  "Słownik",
  "Arytmetyka",
  "Rozumienie",
  "Podobieństwa",
]
export const SUBTESTS_BEZSLOWNE: Subtest[] = [
  "Braki w Obrazkach",
  "Porządkowanie Obrazków",
  "Klocki",
  "Układanki",
  "Symbole Cyfr",
]
export const ALL_SUBTESTS: Subtest[] = [
  ...SUBTESTS_SLOWNE,
  ...SUBTESTS_BEZSLOWNE,
]

// Wiek → grupa (z fallbackiem 80+)
export function mapAgeToGroup(age: number): AgeGroupKey {
  if (age >= 16 && age <= 17) return "16-17"
  if (age >= 18 && age <= 19) return "18-19"
  if (age >= 20 && age <= 24) return "20-24"
  if (age >= 25 && age <= 34) return "25-34"
  if (age >= 35 && age <= 44) return "35-44"
  if (age >= 45 && age <= 54) return "45-54"
  if (age >= 55 && age <= 64) return "55-64"
  if (age >= 65 && age <= 69) return "65-69"
  if (age >= 70 && age <= 74) return "70-74"
  if (age >= 75 && age <= 79) return "75-79"
  return "80+"
}

// WS → WP według norm (zakresy min–max)
export function getWpFromNorms(
  group: AgeGroupKey,
  subtest: Subtest,
  ws: number | null | undefined
): number | null {
  if (ws == null) return null
  const groupNorms = norms[group]
  if (!groupNorms || !groupNorms[subtest]) return null
  const ranges = groupNorms[subtest]
  for (const r of ranges) {
    if (ws >= r.min && ws <= r.max) return r.wp
  }
  return null
}

// Suma po WP (pomija null)
function sumWp(values: Array<number | null | undefined>): number | null {
  const nums = values.filter((v): v is number => typeof v === "number")
  if (nums.length === 0) return null
  return nums.reduce((a, b) => a + b, 0)
}

// Główna funkcja przeliczeń
export function calculateWaisr(params: {
  age: number
  gender: Gender
  raw: RawScores
}): CalculatedResult {
  const { age, gender, raw } = params
  const ageGroup = mapAgeToGroup(age)

  const bySubtest: Record<Subtest, CalculatedPerSubtest> = {} as any

  for (const s of ALL_SUBTESTS) {
    const ws = (raw[s] ?? null) as number | null
    const wp = getWpFromNorms(ageGroup, s, ws)
    bySubtest[s] = { ws, wp }
  }

  const sumSlowna = sumWp(SUBTESTS_SLOWNE.map((s) => bySubtest[s]?.wp))
  const sumBezslowna = sumWp(SUBTESTS_BEZSLOWNE.map((s) => bySubtest[s]?.wp))
  const sumPelna =
    sumSlowna != null && sumBezslowna != null
      ? sumSlowna + sumBezslowna
      : sumWp([...SUBTESTS_SLOWNE, ...SUBTESTS_BEZSLOWNE].map((s) => bySubtest[s]?.wp))

  return {
    age,
    gender,
    ageGroup,
    bySubtest,
    sums: {
      slowna: sumSlowna,
      bezslowna: sumBezslowna,
      pelna: sumPelna,
    },
    iq: { slowne: null, bezslowne: null, pelne: null }, // do uzupełnienia później
    factors: {}, // do uzupełnienia później
  }
}
