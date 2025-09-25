// app/dxmanager/src/logic/waisr/types.ts

export type Gender = "M" | "K"

/** Tryb pracy modułu WAIS-R */
export type WaisrMode = "basic" | "full"

/** Nazwy podtestów – zgodne z UI oraz kalkulatorem */
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

/** Klucze grup wiekowych – zgodne z arkuszami norm */
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

/** Pojedynczy zakres wyniku surowego (WS) odwzorowany na WP */
export type NormRange = { min: number; max: number; wp: number }

/** Normy dla jednej grupy wiekowej: podtest → lista zakresów */
export type NormsForGroup = Record<Subtest, NormRange[]>

/** Indeks wszystkich norm: grupa wiekowa → normy dla grupy */
export type NormsIndex = Record<AgeGroupKey, NormsForGroup>

/** WS per podtest; w UI mogą być chwilowo puste → dopuszczamy null */
export type RawScores = Partial<Record<Subtest, number | null>>

/** (Tryb „full") pełna karta odpowiedzi: klucz pozycji → wartość punktowa 0/1/… */
export type FullInputAnswers = Record<string, number | null | undefined>

/** (Tryb „full") mapowanie podtest → lista kluczy pozycji w karcie odpowiedzi */
export type SubtestItemMap = Record<Subtest, string[]>

/** Poziom ufności dla przedziałów */
export type ConfidenceLevel = 85 | 95

/** Przedział ufności z dolną i górną granicą */
export type ConfidenceInterval = {
  lower: number
  upper: number
  margin: number
}

/** Wyniki cząstkowe per podtest po przeliczeniu */
export type CalculatedPerSubtest = {
  ws: number | null
  wp: number | null
  confidence?: {
    95?: ConfidenceInterval
    85?: ConfidenceInterval
  }
}

/** Wynik końcowy kalkulacji WAIS-R */
export type CalculatedResult = {
  mode?: WaisrMode
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
  confidenceIntervals?: {
    iq?: {
      slowne?: {
        95?: ConfidenceInterval
        85?: ConfidenceInterval
      }
      bezslowne?: {
        95?: ConfidenceInterval
        85?: ConfidenceInterval
      }
      pelne?: {
        95?: ConfidenceInterval
        85?: ConfidenceInterval
      }
    }
  }
  factors?: Record<string, { 
    sum: number | null; 
    iq?: number | null;
    confidence?: {
      95?: ConfidenceInterval
      85?: ConfidenceInterval
    }
  }>
}