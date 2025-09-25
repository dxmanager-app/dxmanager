// src/logic/waisr/norms/factor-confidence.ts
// Przedziały ufności dla czynników WAIS-R(PL)

import type { AgeGroupKey } from "../types"
import type { FactorName } from "./factor-analysis"

export interface FactorConfidenceData {
  "Rozumienie Werbalne": {
    85: number
    95: number
  }
  "Organizacja Percepcyjna": {
    85: number
    95: number
  }
  "Pamięć i Odporność na Dystraktory": {
    85: number
    95: number
  }
}

// Tabela błędów standardowych dla czynników - 85% i 95% przedziały ufności
export const factorConfidenceData: Record<AgeGroupKey, FactorConfidenceData> = {
  "16-17": {
    "Rozumienie Werbalne": { 85: 4, 95: 6 },
    "Organizacja Percepcyjna": { 85: 7, 95: 10 },
    "Pamięć i Odporność na Dystraktory": { 85: 7, 95: 10 }
  },
  
  "18-19": {
    "Rozumienie Werbalne": { 85: 5, 95: 7 },
    "Organizacja Percepcyjna": { 85: 7, 95: 10 },
    "Pamięć i Odporność na Dystraktory": { 85: 8, 95: 11 }
  },
  
  "20-24": {
    "Rozumienie Werbalne": { 85: 4, 95: 6 },
    "Organizacja Percepcyjna": { 85: 7, 95: 9 },
    "Pamięć i Odporność na Dystraktory": { 85: 7, 95: 9 }
  },
  
  "25-34": {
    "Rozumienie Werbalne": { 85: 4, 95: 6 },
    "Organizacja Percepcyjna": { 85: 7, 95: 9 },
    "Pamięć i Odporność na Dystraktory": { 85: 6, 95: 8 }
  },
  
  "35-44": {
    "Rozumienie Werbalne": { 85: 4, 95: 6 },
    "Organizacja Percepcyjna": { 85: 6, 95: 9 },
    "Pamięć i Odporność na Dystraktory": { 85: 5, 95: 7 }
  },
  
  "45-54": {
    "Rozumienie Werbalne": { 85: 4, 95: 5 },
    "Organizacja Percepcyjna": { 85: 6, 95: 8 },
    "Pamięć i Odporność na Dystraktory": { 85: 7, 95: 10 }
  },
  
  "55-64": {
    "Rozumienie Werbalne": { 85: 4, 95: 5 },
    "Organizacja Percepcyjna": { 85: 7, 95: 10 },
    "Pamięć i Odporność na Dystraktory": { 85: 6, 95: 9 }
  },
  
  "65-69": {
    "Rozumienie Werbalne": { 85: 4, 95: 6 },
    "Organizacja Percepcyjna": { 85: 7, 95: 10 },
    "Pamięć i Odporność na Dystraktory": { 85: 6, 95: 8 }
  },
  
  "70-74": {
    "Rozumienie Werbalne": { 85: 4, 95: 6 },
    "Organizacja Percepcyjna": { 85: 6, 95: 9 },
    "Pamięć i Odporność na Dystraktory": { 85: 6, 95: 8 }
  },
  
  "75-79": {
    "Rozumienie Werbalne": { 85: 4, 95: 6 },
    "Organizacja Percepcyjna": { 85: 7, 95: 9 },
    "Pamięć i Odporność na Dystraktory": { 85: 6, 95: 9 }
  },
  
  // Grupa 80+ używa tych samych wartości co 75-79
  "80+": {
    "Rozumienie Werbalne": { 85: 4, 95: 6 },
    "Organizacja Percepcyjna": { 85: 7, 95: 9 },
    "Pamięć i Odporność na Dystraktory": { 85: 6, 95: 9 }
  }
}

export type FactorConfidenceLevel = 85 | 95

export interface FactorConfidenceInterval {
  lower: number
  upper: number
  margin: number
}

// Funkcja do obliczania przedziału ufności dla czynnika
export function getFactorConfidenceInterval(
  iq: number,
  factorName: FactorName,
  ageGroup: AgeGroupKey,
  level: FactorConfidenceLevel = 95
): FactorConfidenceInterval {
  const data = factorConfidenceData[ageGroup]
  const margin = data[factorName][level]
  
  return {
    lower: iq - margin,
    upper: iq + margin,
    margin
  }
}

// Funkcja pomocnicza do formatowania przedziału ufności czynnika
export function formatFactorConfidenceInterval(interval: FactorConfidenceInterval): string {
  return `${interval.lower}-${interval.upper}`
}