import { norms } from "./norms"
import { aggregateRawScoresFromFullInput } from "./aggregate"
import { getVerbalIQ, getPerformanceIQ, getFullScaleIQ } from "./norms/iq-tables"
import { getConfidenceInterval } from "./norms/confidence-intervals"
import { FACTOR_DEFINITIONS, calculateFactorSum, getFactorIQ, type FactorName } from "./norms/factor-analysis"
import { getFactorConfidenceInterval } from "./norms/factor-confidence"
import type {
  AgeGroupKey,
  CalculatedPerSubtest,
  CalculatedResult,
  FullInputAnswers,
  Gender,
  RawScores,
  Subtest,
  WaisrMode,
  ConfidenceInterval,
} from "./types"

/** Lokalne typy parametrów – pozwalają używać trybu basic lub full bez zmian w innych plikach. */
type CalcParamsBasic = {
  mode?: Extract<WaisrMode, "basic"> | undefined
  age: number
  gender: Gender
  raw: RawScores
}
type CalcParamsFull = {
  mode: Extract<WaisrMode, "full">
  age: number
  gender: Gender
  full: FullInputAnswers
}
type CalcParams = CalcParamsBasic | CalcParamsFull

/** Kolejność grup – potrzebna do fallbacków (np. 80+ → 75–79, jeśli brak własnych norm) */
const AGE_ORDER: AgeGroupKey[] = [
  "16-17",
  "18-19",
  "20-24",
  "25-34",
  "35-44",
  "45-54",
  "55-64",
  "65-69",
  "70-74",
  "75-79",
  "80+",
]

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

/** Nominalne mapowanie: wiek → grupa (bez fallbacku treści) */
export function mapAgeToGroupNominal(age: number): AgeGroupKey {
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

/** Znajdź poprzednią grupę (np. z 80+ do 75–79) */
function previousGroup(key: AgeGroupKey): AgeGroupKey | null {
  const i = AGE_ORDER.indexOf(key)
  if (i <= 0) return null
  return AGE_ORDER[i - 1]
}

/**
 * Finalne mapowanie: zwraca grupę z danymi.
 * Jeżeli dla nominalnej grupy brak norm (pusty obiekt), cofnij się do poprzedniej,
 * aż znajdziesz grupę z danymi (np. 80+ → 75–79).
 */
export function resolveAgeGroupWithFallback(age: number): AgeGroupKey {
  let g: AgeGroupKey = mapAgeToGroupNominal(age)
  // jeśli w norms[g] nie ma danych, cofamy się
  let guard = 0
  while (guard++ < AGE_ORDER.length) {
    const hasData =
      norms[g] && Object.keys(norms[g] as Record<string, unknown>).length > 0
    if (hasData) return g
    const prev = previousGroup(g)
    if (!prev) return g // nie cofaj poniżej najniższej
    g = prev
  }
  return g
}

/** WS → WP według norm (zakresy min–max) */
export function getWpFromNorms(
  group: AgeGroupKey,
  subtest: Subtest,
  ws: number | null | undefined
): number | null {
  if (ws == null) return null
  const groupNorms = norms[group]
  if (!groupNorms) return null
  const ranges = groupNorms[subtest]
  if (!ranges) return null
  for (const r of ranges) {
    if (ws >= r.min && ws <= r.max) return r.wp
  }
  return null
}

/** Suma po WP (pomija null) */
function sumWp(values: Array<number | null | undefined>): number | null {
  const nums = values.filter((v): v is number => typeof v === "number")
  if (nums.length === 0) return null
  return nums.reduce((a, b) => a + b, 0)
}

/**
 * Główna funkcja przeliczeń.
 * Obsługuje tryb:
 *  - basic: użytkownik podał WS,
 *  - full: użytkownik wypełnił kartę – agregujemy do WS i dalej liczymy identycznie.
 */
export function calculateWaisr(params: CalcParams): CalculatedResult {
  const mode: WaisrMode = (params as CalcParamsFull).mode === "full" ? "full" : "basic"
  const age = params.age
  const gender = params.gender

  // Ustal WS: bezpośrednio (basic) albo agregacja z karty (full)
  const raw: RawScores =
    mode === "full"
      ? aggregateRawScoresFromFullInput((params as CalcParamsFull).full)
      : (params as CalcParamsBasic).raw

  const ageGroup = resolveAgeGroupWithFallback(age)

  // Obliczenia podstawowe: WS → WP
  const bySubtest: Record<Subtest, CalculatedPerSubtest> = {} as any
  for (const s of ALL_SUBTESTS) {
    const ws = (raw[s] ?? null) as number | null
    const wp = getWpFromNorms(ageGroup, s, ws)
    
    // Oblicz przedziały ufności dla WP jeśli są dostępne
    const confidence = wp != null ? {
      95: getConfidenceInterval(wp, ageGroup, 'subtest', s, 95),
      85: getConfidenceInterval(wp, ageGroup, 'subtest', s, 85)
    } : undefined

    bySubtest[s] = { ws, wp, confidence }
  }

  // Sumy WP
  const sumSlowna = sumWp(SUBTESTS_SLOWNE.map((s) => bySubtest[s]?.wp))
  const sumBezslowna = sumWp(SUBTESTS_BEZSLOWNE.map((s) => bySubtest[s]?.wp))
  const sumPelna =
    sumSlowna != null && sumBezslowna != null
      ? sumSlowna + sumBezslowna
      : sumWp([...SUBTESTS_SLOWNE, ...SUBTESTS_BEZSLOWNE].map((s) => bySubtest[s]?.wp))

  // Obliczenia IQ
  const iq = {
    slowne: sumSlowna != null ? getVerbalIQ(sumSlowna) : null,
    bezslowne: sumBezslowna != null ? getPerformanceIQ(sumBezslowna) : null,
    pelne: sumPelna != null ? getFullScaleIQ(sumPelna) : null,
  }

  // Przedziały ufności dla IQ
  const confidenceIntervals = {
    iq: {
      slowne: iq.slowne != null ? {
        95: getConfidenceInterval(iq.slowne, ageGroup, 'verbal', undefined, 95),
        85: getConfidenceInterval(iq.slowne, ageGroup, 'verbal', undefined, 85)
      } : undefined,
      bezslowne: iq.bezslowne != null ? {
        95: getConfidenceInterval(iq.bezslowne, ageGroup, 'performance', undefined, 95),
        85: getConfidenceInterval(iq.bezslowne, ageGroup, 'performance', undefined, 85)
      } : undefined,
      pelne: iq.pelne != null ? {
        95: getConfidenceInterval(iq.pelne, ageGroup, 'fullscale', undefined, 95),
        85: getConfidenceInterval(iq.pelne, ageGroup, 'fullscale', undefined, 85)
      } : undefined
    }
  }

  return {
    mode,
    age,
    gender,
    ageGroup,
    bySubtest,
    sums: {
      slowna: sumSlowna,
      bezslowna: sumBezslowna,
      pelna: sumPelna,
    },
    iq,
    confidenceIntervals,
    // Analiza czynnikowa z przedziałami ufności
    factors: (() => {
      const result: Record<string, { 
        sum: number | null; 
        iq?: number | null;
        confidence?: {
          95?: ConfidenceInterval
          85?: ConfidenceInterval
        }
      }> = {}
      
      for (const [factorName, subtests] of Object.entries(FACTOR_DEFINITIONS)) {
        const wpScores: Record<Subtest, number | null> = {} as any
        for (const s of ALL_SUBTESTS) {
          wpScores[s] = bySubtest[s]?.wp ?? null
        }
        
        const sum = calculateFactorSum(factorName as FactorName, wpScores)
        const iq = sum != null ? getFactorIQ(factorName as FactorName, sum) : null
        
        // Przedziały ufności dla IQ czynnika
        const confidence = iq != null ? {
          95: getFactorConfidenceInterval(iq, factorName as FactorName, ageGroup, 95),
          85: getFactorConfidenceInterval(iq, factorName as FactorName, ageGroup, 85)
        } : undefined
        
        result[factorName] = { sum, iq, confidence }
      }
      
      return result
    })(),
  }
}

/** Dane do wykresu słupkowego (etykieta + WP) */
export function toBarChartData(result: CalculatedResult) {
  return ALL_SUBTESTS.map((s) => ({
    label: s,
    wp: result.bySubtest[s]?.wp ?? null,
  }))
}