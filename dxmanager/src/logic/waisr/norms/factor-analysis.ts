// src/logic/waisr/norms/factor-analysis.ts
// Analiza czynnikowa WAIS-R(PL) - definicje czynników i tabele konwersji

import type { Subtest } from "../types"

// Definicje czynników i składających się na nie podtestów
export const FACTOR_DEFINITIONS = {
  "Rozumienie Werbalne": [
    "Wiadomości",
    "Słownik", 
    "Rozumienie",
    "Podobieństwa"
  ] as Subtest[],
  
  "Organizacja Percepcyjna": [
    "Braki w Obrazkach",
    "Porządkowanie Obrazków",
    "Klocki",
    "Układanki"
  ] as Subtest[],
  
  "Pamięć i Odporność na Dystraktory": [
    "Powtarzanie Cyfr",
    "Arytmetyka",
    "Symbole Cyfr"
  ] as Subtest[]
}

export type FactorName = keyof typeof FACTOR_DEFINITIONS

export interface FactorConversion {
  sumWP: number
  iq: number
}

// Tabele konwersji suma WP → IQ dla czynników
export const verbalComprehensionTable: FactorConversion[] = [
  // IQ >150
  { sumWP: 76, iq: 150 },
  { sumWP: 75, iq: 150 },
  { sumWP: 74, iq: 149 },
  { sumWP: 73, iq: 148 },
  { sumWP: 72, iq: 146 },
  { sumWP: 71, iq: 145 },
  { sumWP: 70, iq: 144 },
  { sumWP: 69, iq: 142 },
  { sumWP: 68, iq: 141 },
  { sumWP: 67, iq: 139 },
  { sumWP: 66, iq: 138 },
  { sumWP: 65, iq: 136 },
  { sumWP: 64, iq: 135 },
  { sumWP: 63, iq: 133 },
  { sumWP: 62, iq: 132 },
  { sumWP: 61, iq: 130 },
  { sumWP: 60, iq: 129 },
  { sumWP: 59, iq: 128 },
  { sumWP: 58, iq: 126 },
  { sumWP: 57, iq: 125 },
  { sumWP: 56, iq: 123 },
  { sumWP: 55, iq: 122 },
  { sumWP: 54, iq: 120 },
  { sumWP: 53, iq: 119 },
  { sumWP: 52, iq: 117 },
  { sumWP: 51, iq: 116 },
  { sumWP: 50, iq: 115 },
  { sumWP: 49, iq: 113 },
  { sumWP: 48, iq: 112 },
  { sumWP: 47, iq: 110 },
  { sumWP: 46, iq: 109 },
  { sumWP: 45, iq: 107 },
  { sumWP: 44, iq: 106 },
  { sumWP: 43, iq: 104 },
  { sumWP: 42, iq: 103 },
  { sumWP: 41, iq: 101 },
  { sumWP: 40, iq: 100 },
  { sumWP: 39, iq: 99 },
  { sumWP: 38, iq: 97 },
  { sumWP: 37, iq: 96 },
  { sumWP: 36, iq: 94 },
  { sumWP: 35, iq: 93 },
  { sumWP: 34, iq: 91 },
  { sumWP: 33, iq: 90 },
  { sumWP: 32, iq: 88 },
  { sumWP: 31, iq: 87 },
  { sumWP: 30, iq: 85 },
  { sumWP: 29, iq: 84 },
  { sumWP: 28, iq: 83 },
  { sumWP: 27, iq: 81 },
  { sumWP: 26, iq: 80 },
  { sumWP: 25, iq: 78 },
  { sumWP: 24, iq: 77 },
  { sumWP: 23, iq: 75 },
  { sumWP: 22, iq: 74 },
  { sumWP: 21, iq: 72 },
  { sumWP: 20, iq: 71 },
  { sumWP: 19, iq: 70 },
  { sumWP: 18, iq: 68 },
  { sumWP: 17, iq: 67 },
  { sumWP: 16, iq: 65 },
  { sumWP: 15, iq: 64 },
  { sumWP: 14, iq: 62 },
  { sumWP: 13, iq: 61 },
  { sumWP: 12, iq: 59 },
  { sumWP: 11, iq: 58 },
  { sumWP: 10, iq: 56 },
  { sumWP: 9, iq: 55 },
  { sumWP: 8, iq: 54 }
]

export const perceptualOrganizationTable: FactorConversion[] = [
  // IQ >150
  { sumWP: 57, iq: 150 },
  { sumWP: 56, iq: 150 },
  { sumWP: 55, iq: 150 },
  { sumWP: 54, iq: 150 },
  { sumWP: 53, iq: 150 },
  { sumWP: 52, iq: 150 },
  { sumWP: 51, iq: 150 },
  { sumWP: 50, iq: 150 },
  { sumWP: 49, iq: 150 },
  { sumWP: 48, iq: 150 },
  { sumWP: 47, iq: 150 },
  { sumWP: 46, iq: 150 },
  { sumWP: 45, iq: 150 },
  { sumWP: 44, iq: 150 },
  { sumWP: 43, iq: 150 },
  { sumWP: 42, iq: 150 },
  { sumWP: 41, iq: 150 },
  { sumWP: 40, iq: 150 },
  { sumWP: 39, iq: 150 },
  { sumWP: 38, iq: 150 },
  { sumWP: 37, iq: 150 },
  { sumWP: 36, iq: 150 },
  { sumWP: 35, iq: 150 },
  { sumWP: 34, iq: 150 },
  { sumWP: 33, iq: 150 },
  { sumWP: 32, iq: 150 },
  { sumWP: 31, iq: 150 },
  { sumWP: 30, iq: 150 },
  { sumWP: 29, iq: 150 },
  { sumWP: 28, iq: 150 },
  { sumWP: 27, iq: 150 },
  { sumWP: 26, iq: 150 },
  { sumWP: 25, iq: 150 },
  { sumWP: 24, iq: 150 },
  { sumWP: 23, iq: 150 },
  { sumWP: 22, iq: 150 },
  { sumWP: 21, iq: 150 },
  { sumWP: 20, iq: 150 },
  { sumWP: 19, iq: 150 },
  { sumWP: 18, iq: 150 },
  { sumWP: 17, iq: 150 },
  { sumWP: 16, iq: 150 },
  { sumWP: 15, iq: 150 },
  { sumWP: 14, iq: 150 },
  { sumWP: 13, iq: 150 },
  { sumWP: 12, iq: 150 },
  { sumWP: 11, iq: 150 },
  
  // Właściwe wartości zaczynają się od 72
  { sumWP: 72, iq: 150 },
  { sumWP: 71, iq: 149 },
  { sumWP: 70, iq: 147 },
  { sumWP: 69, iq: 146 },
  { sumWP: 68, iq: 144 },
  { sumWP: 67, iq: 142 },
  { sumWP: 66, iq: 141 },
  { sumWP: 65, iq: 139 },
  { sumWP: 64, iq: 138 },
  { sumWP: 63, iq: 136 },
  { sumWP: 62, iq: 135 },
  { sumWP: 61, iq: 133 },
  { sumWP: 60, iq: 131 },
  { sumWP: 59, iq: 130 },
  { sumWP: 58, iq: 128 },
  { sumWP: 57, iq: 127 },
  { sumWP: 56, iq: 125 },
  { sumWP: 55, iq: 124 },
  { sumWP: 54, iq: 122 },
  { sumWP: 53, iq: 120 },
  { sumWP: 52, iq: 119 },
  { sumWP: 51, iq: 117 },
  { sumWP: 50, iq: 116 },
  { sumWP: 49, iq: 114 },
  { sumWP: 48, iq: 113 },
  { sumWP: 47, iq: 111 },
  { sumWP: 46, iq: 109 },
  { sumWP: 45, iq: 108 },
  { sumWP: 44, iq: 106 },
  { sumWP: 43, iq: 105 },
  { sumWP: 42, iq: 103 },
  { sumWP: 41, iq: 102 },
  { sumWP: 40, iq: 100 },
  { sumWP: 39, iq: 98 },
  { sumWP: 38, iq: 97 },
  { sumWP: 37, iq: 95 },
  { sumWP: 36, iq: 94 },
  { sumWP: 35, iq: 92 },
  { sumWP: 34, iq: 91 },
  { sumWP: 33, iq: 89 },
  { sumWP: 32, iq: 87 },
  { sumWP: 31, iq: 86 },
  { sumWP: 30, iq: 84 },
  { sumWP: 29, iq: 83 },
  { sumWP: 28, iq: 81 },
  { sumWP: 27, iq: 80 },
  { sumWP: 26, iq: 78 },
  { sumWP: 25, iq: 76 },
  { sumWP: 24, iq: 75 },
  { sumWP: 23, iq: 73 },
  { sumWP: 22, iq: 72 },
  { sumWP: 21, iq: 70 },
  { sumWP: 20, iq: 69 },
  { sumWP: 19, iq: 67 },
  { sumWP: 18, iq: 65 },
  { sumWP: 17, iq: 64 },
  { sumWP: 16, iq: 62 },
  { sumWP: 15, iq: 61 },
  { sumWP: 14, iq: 59 },
  { sumWP: 13, iq: 58 },
  { sumWP: 12, iq: 56 },
  { sumWP: 11, iq: 54 }
]

export const freedomFromDistractibilityTable: FactorConversion[] = [
  // IQ >150
  { sumWP: 38, iq: 150 },
  { sumWP: 37, iq: 150 },
  { sumWP: 36, iq: 150 },
  { sumWP: 35, iq: 150 },
  { sumWP: 34, iq: 150 },
  { sumWP: 33, iq: 150 },
  { sumWP: 32, iq: 150 },
  { sumWP: 31, iq: 150 },
  { sumWP: 30, iq: 150 },
  { sumWP: 29, iq: 150 },
  { sumWP: 28, iq: 150 },
  { sumWP: 27, iq: 150 },
  { sumWP: 26, iq: 150 },
  { sumWP: 25, iq: 150 },
  { sumWP: 24, iq: 150 },
  { sumWP: 23, iq: 150 },
  { sumWP: 22, iq: 150 },
  { sumWP: 21, iq: 150 },
  { sumWP: 20, iq: 150 },
  { sumWP: 19, iq: 150 },
  { sumWP: 18, iq: 150 },
  { sumWP: 17, iq: 150 },
  { sumWP: 16, iq: 150 },
  { sumWP: 15, iq: 150 },
  { sumWP: 14, iq: 150 },
  { sumWP: 13, iq: 150 },
  { sumWP: 12, iq: 150 },
  { sumWP: 11, iq: 150 },
  { sumWP: 10, iq: 150 },

  // Właściwe wartości (odczytane z tabeli)
  { sumWP: 53, iq: 149 },
  { sumWP: 52, iq: 147 },
  { sumWP: 51, iq: 144 },
  { sumWP: 50, iq: 142 },
  { sumWP: 49, iq: 140 },
  { sumWP: 48, iq: 138 },
  { sumWP: 47, iq: 136 },
  { sumWP: 46, iq: 134 },
  { sumWP: 45, iq: 132 },
  { sumWP: 44, iq: 130 },
  { sumWP: 43, iq: 128 },
  { sumWP: 42, iq: 125 },
  { sumWP: 41, iq: 123 },
  { sumWP: 40, iq: 121 },
  { sumWP: 39, iq: 119 },
  { sumWP: 38, iq: 117 },
  { sumWP: 37, iq: 115 },
  { sumWP: 36, iq: 113 },
  { sumWP: 35, iq: 111 },
  { sumWP: 34, iq: 108 },
  { sumWP: 33, iq: 106 },
  { sumWP: 32, iq: 104 },
  { sumWP: 31, iq: 102 },
  { sumWP: 30, iq: 100 },
  { sumWP: 29, iq: 98 },
  { sumWP: 28, iq: 96 },
  { sumWP: 27, iq: 94 },
  { sumWP: 26, iq: 92 },
  { sumWP: 25, iq: 89 },
  { sumWP: 24, iq: 87 },
  { sumWP: 23, iq: 85 },
  { sumWP: 22, iq: 83 },
  { sumWP: 21, iq: 81 },
  { sumWP: 20, iq: 79 },
  { sumWP: 19, iq: 77 },
  { sumWP: 18, iq: 75 },
  { sumWP: 17, iq: 72 },
  { sumWP: 16, iq: 70 },
  { sumWP: 15, iq: 68 },
  { sumWP: 14, iq: 66 },
  { sumWP: 13, iq: 64 },
  { sumWP: 12, iq: 62 },
  { sumWP: 11, iq: 60 },
  { sumWP: 10, iq: 58 },
  { sumWP: 9, iq: 56 }
]

// Funkcje do obliczania IQ czynników
export function getFactorIQ(factorName: FactorName, sumWP: number): number {
  let table: FactorConversion[]
  
  switch (factorName) {
    case "Rozumienie Werbalne":
      table = verbalComprehensionTable
      break
    case "Organizacja Percepcyjna":
      table = perceptualOrganizationTable
      break
    case "Pamięć i Odporność na Dystraktory":
      table = freedomFromDistractibilityTable
      break
  }
  
  // Znajdź najbliższą wartość w tabeli
  for (const entry of table) {
    if (sumWP >= entry.sumWP) {
      return entry.iq
    }
  }
  
  // Jeśli suma jest bardzo niska, zwróć najniższe IQ
  return 54
}

// Oblicz sumę WP dla czynnika
export function calculateFactorSum(factorName: FactorName, wpScores: Record<Subtest, number | null>): number | null {
  const subtests = FACTOR_DEFINITIONS[factorName]
  const values = subtests.map(subtest => wpScores[subtest]).filter((v): v is number => typeof v === "number")
  
  if (values.length === 0) return null
  return values.reduce((a, b) => a + b, 0)
}