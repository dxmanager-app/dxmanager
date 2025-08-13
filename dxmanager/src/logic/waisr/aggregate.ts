// app/dxmanager/src/logic/waisr/aggregate.ts
// cspell:ignore subtest SUBTEST

/**
 * Agregacja pełnej karty odpowiedzi (tryb "full") do wyników surowych (WS).
 * calculateWaisr() przyjmuje już gotowe WS i nie musi wiedzieć, skąd pochodzą.
 */

import type {
  FullInputAnswers,
  RawScores,
  Subtest,
  SubtestItemMap,
} from "./types"

/** Jawnie typowane listy podtestów (zgodne z `Subtest`) */
const SUBTESTS_SLOWNE: Subtest[] = [
  "Wiadomości",
  "Powtarzanie Cyfr",
  "Słownik",
  "Arytmetyka",
  "Rozumienie",
  "Podobieństwa",
]
const SUBTESTS_BEZSLOWNE: Subtest[] = [
  "Braki w Obrazkach",
  "Porządkowanie Obrazków",
  "Klocki",
  "Układanki",
  "Symbole Cyfr",
]
const ALL_SUBTESTS: Subtest[] = [...SUBTESTS_SLOWNE, ...SUBTESTS_BEZSLOWNE]

/**
 * Mapowanie: podtest -> lista kluczy pozycji z karty odpowiedzi (do uzupełnienia).
 * Używamy `satisfies SubtestItemMap`, aby TypeScript pilnował kompletu kluczy.
 */
export const SUBTEST_ITEMS = {
  "Wiadomości": [],
  "Powtarzanie Cyfr": [],
  "Słownik": [],
  "Arytmetyka": [],
  "Rozumienie": [],
  "Podobieństwa": [],
  "Braki w Obrazkach": [],
  "Porządkowanie Obrazków": [],
  "Klocki": [],
  "Układanki": [],
  "Symbole Cyfr": [],
} satisfies SubtestItemMap

/** Suma punktów dla listy kluczy; ignoruje null/undefined i nieliczbowe wartości. */
function sumSelected(data: FullInputAnswers, keys: string[]): number {
  let acc = 0
  for (const k of keys) {
    const v = data[k]
    if (typeof v === "number" && !Number.isNaN(v)) acc += v
  }
  return acc
}

/**
 * Z pełnej karty odpowiedzi tworzy WS per podtest.
 * Gdy dany podtest nie ma jeszcze zdefiniowanych kluczy w `SUBTEST_ITEMS`,
 * zwraca dla niego `null` – UI może pracować w trybie mieszanym.
 */
export function aggregateRawScoresFromFullInput(
  answers: FullInputAnswers
): RawScores {
  const out: Partial<RawScores> = {}

  for (const subtest of ALL_SUBTESTS) {
    const keys = SUBTEST_ITEMS[subtest]
    if (keys && keys.length > 0) {
      out[subtest] = sumSelected(answers, keys)
    } else {
      out[subtest] = null
    }
  }

  return out as RawScores
}
