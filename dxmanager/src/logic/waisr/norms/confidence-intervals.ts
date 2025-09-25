// src/logic/waisr/norms/confidence-intervals.ts
// Przedziały ufności dla wyników WAIS-R(PL) - wartości do dodania/odjęcia

import type { AgeGroupKey, Subtest } from "../types"

export interface ConfidenceData {
  subtests: Record<Subtest, number>
  scales: {
    slowna: number
    bezslowna: number
    pelna: number
  }
}

// Tabela błędów standardowych dla 95% przedziału ufności
export const confidence95Data: Record<AgeGroupKey, ConfidenceData> = {
  "16-17": {
    subtests: {
      "Wiadomości": 2,
      "Powtarzanie Cyfr": 3,
      "Słownik": 1,
      "Arytmetyka": 2,
      "Rozumienie": 3,
      "Podobieństwa": 2,
      "Braki w Obrazkach": 3,
      "Porządkowanie Obrazków": 3,
      "Klocki": 2,
      "Układanki": 4,
      "Symbole Cyfr": 3
    },
    scales: {
      slowna: 10,
      bezslowna: 10,
      pelna: 14
    }
  },
  
  "18-19": {
    subtests: {
      "Wiadomości": 2,
      "Powtarzanie Cyfr": 3,
      "Słownik": 2,
      "Arytmetyka": 2,
      "Rozumienie": 3,
      "Podobieństwa": 2,
      "Braki w Obrazkach": 3,
      "Porządkowanie Obrazków": 3,
      "Klocki": 2,
      "Układanki": 4,
      "Symbole Cyfr": 3
    },
    scales: {
      slowna: 10,
      bezslowna: 10,
      pelna: 15
    }
  },
  
  "20-24": {
    subtests: {
      "Wiadomości": 2,
      "Powtarzanie Cyfr": 3,
      "Słownik": 2,
      "Arytmetyka": 2,
      "Rozumienie": 3,
      "Podobieństwa": 3,
      "Braki w Obrazkach": 3,
      "Porządkowanie Obrazków": 3,
      "Klocki": 2,
      "Układanki": 4,
      "Symbole Cyfr": 2
    },
    scales: {
      slowna: 10,
      bezslowna: 10,
      pelna: 15
    }
  },
  
  "25-34": {
    subtests: {
      "Wiadomości": 2,
      "Powtarzanie Cyfr": 3,
      "Słownik": 2,
      "Arytmetyka": 2,
      "Rozumienie": 3,
      "Podobieństwa": 2,
      "Braki w Obrazkach": 3,
      "Porządkowanie Obrazków": 3,
      "Klocki": 2,
      "Układanki": 4,
      "Symbole Cyfr": 2
    },
    scales: {
      slowna: 9,
      bezslowna: 10,
      pelna: 14
    }
  },
  
  "35-44": {
    subtests: {
      "Wiadomości": 2,
      "Powtarzanie Cyfr": 3,
      "Słownik": 2,
      "Arytmetyka": 2,
      "Rozumienie": 3,
      "Podobieństwa": 2,
      "Braki w Obrazkach": 2,
      "Porządkowanie Obrazków": 3,
      "Klocki": 2,
      "Układanki": 3,
      "Symbole Cyfr": 2
    },
    scales: {
      slowna: 9,
      bezslowna: 9,
      pelna: 14
    }
  },
  
  "45-54": {
    subtests: {
      "Wiadomości": 2,
      "Powtarzanie Cyfr": 3,
      "Słownik": 1,
      "Arytmetyka": 2,
      "Rozumienie": 3,
      "Podobieństwa": 2,
      "Braki w Obrazkach": 2,
      "Porządkowanie Obrazków": 3,
      "Klocki": 2,
      "Układanki": 4,
      "Symbole Cyfr": 3
    },
    scales: {
      slowna: 9,
      bezslowna: 8,
      pelna: 13
    }
  },
  
  "55-64": {
    subtests: {
      "Wiadomości": 1,
      "Powtarzanie Cyfr": 3,
      "Słownik": 1,
      "Arytmetyka": 2,
      "Rozumienie": 3,
      "Podobieństwa": 2,
      "Braki w Obrazkach": 2,
      "Porządkowanie Obrazków": 4,
      "Klocki": 3,
      "Układanki": 4,
      "Symbole Cyfr": 2
    },
    scales: {
      slowna: 10,
      bezslowna: 10,
      pelna: 15
    }
  },
  
  "65-69": {
    subtests: {
      "Wiadomości": 2,
      "Powtarzanie Cyfr": 2,
      "Słownik": 1,
      "Arytmetyka": 2,
      "Rozumienie": 3,
      "Podobieństwa": 2,
      "Braki w Obrazkach": 2,
      "Porządkowanie Obrazków": 3,
      "Klocki": 3,
      "Układanki": 4,
      "Symbole Cyfr": 2
    },
    scales: {
      slowna: 10,
      bezslowna: 9,
      pelna: 14
    }
  },
  
  "70-74": {
    subtests: {
      "Wiadomości": 2,
      "Powtarzanie Cyfr": 3,
      "Słownik": 2,
      "Arytmetyka": 2,
      "Rozumienie": 3,
      "Podobieństwa": 3,
      "Braki w Obrazkach": 2,
      "Porządkowanie Obrazków": 3,
      "Klocki": 2,
      "Układanki": 3,
      "Symbole Cyfr": 1
    },
    scales: {
      slowna: 11,
      bezslowna: 9,
      pelna: 15
    }
  },
  
  "75-79": {
    subtests: {
      "Wiadomości": 1,
      "Powtarzanie Cyfr": 3,
      "Słownik": 2,
      "Arytmetyka": 2,
      "Rozumienie": 2,
      "Podobieństwa": 3,
      "Braki w Obrazkach": 2,
      "Porządkowanie Obrazków": 4,
      "Klocki": 2,
      "Układanki": 3,
      "Symbole Cyfr": 2
    },
    scales: {
      slowna: 10,
      bezslowna: 10,
      pelna: 15
    }
  },
  
  // Grupa 80+ używa tych samych wartości co 75-79
  "80+": {
    subtests: {
      "Wiadomości": 1,
      "Powtarzanie Cyfr": 3,
      "Słownik": 2,
      "Arytmetyka": 2,
      "Rozumienie": 2,
      "Podobieństwa": 3,
      "Braki w Obrazkach": 2,
      "Porządkowanie Obrazków": 4,
      "Klocki": 2,
      "Układanki": 3,
      "Symbole Cyfr": 2
    },
    scales: {
      slowna: 10,
      bezslowna: 10,
      pelna: 15
    }
  }
}

// Tabela błędów standardowych dla 85% przedziału ufności (dane oficjalne)
export const confidence85Data: Record<AgeGroupKey, ConfidenceData> = {
  "16-17": {
    subtests: {
      "Wiadomości": 1,
      "Powtarzanie Cyfr": 2,
      "Słownik": 1,
      "Arytmetyka": 1,
      "Rozumienie": 2,
      "Podobieństwa": 2,
      "Braki w Obrazkach": 2,
      "Porządkowanie Obrazków": 2,
      "Klocki": 1,
      "Układanki": 3,
      "Symbole Cyfr": 2
    },
    scales: {
      slowna: 7,
      bezslowna: 7,
      pelna: 11
    }
  },
  
  "18-19": {
    subtests: {
      "Wiadomości": 1,
      "Powtarzanie Cyfr": 2,
      "Słownik": 1,
      "Arytmetyka": 1,
      "Rozumienie": 2,
      "Podobieństwa": 2,
      "Braki w Obrazkach": 2,
      "Porządkowanie Obrazków": 2,
      "Klocki": 2,
      "Układanki": 3,
      "Symbole Cyfr": 2
    },
    scales: {
      slowna: 7,
      bezslowna: 7,
      pelna: 11
    }
  },
  
  "20-24": {
    subtests: {
      "Wiadomości": 1,
      "Powtarzanie Cyfr": 2,
      "Słownik": 1,
      "Arytmetyka": 1,
      "Rozumienie": 2,
      "Podobieństwa": 2,
      "Braki w Obrazkach": 2,
      "Porządkowanie Obrazków": 2,
      "Klocki": 2,
      "Układanki": 3,
      "Symbole Cyfr": 2
    },
    scales: {
      slowna: 7,
      bezslowna: 7,
      pelna: 11
    }
  },
  
  "25-34": {
    subtests: {
      "Wiadomości": 1,
      "Powtarzanie Cyfr": 2,
      "Słownik": 1,
      "Arytmetyka": 1,
      "Rozumienie": 2,
      "Podobieństwa": 2,
      "Braki w Obrazkach": 2,
      "Porządkowanie Obrazków": 2,
      "Klocki": 2,
      "Układanki": 3,
      "Symbole Cyfr": 1
    },
    scales: {
      slowna: 7,
      bezslowna: 7,
      pelna: 10
    }
  },
  
  "35-44": {
    subtests: {
      "Wiadomości": 1,
      "Powtarzanie Cyfr": 2,
      "Słownik": 1,
      "Arytmetyka": 1,
      "Rozumienie": 2,
      "Podobieństwa": 2,
      "Braki w Obrazkach": 2,
      "Porządkowanie Obrazków": 2,
      "Klocki": 2,
      "Układanki": 2,
      "Symbole Cyfr": 1
    },
    scales: {
      slowna: 7,
      bezslowna: 7,
      pelna: 10
    }
  },
  
  "45-54": {
    subtests: {
      "Wiadomości": 1,
      "Powtarzanie Cyfr": 2,
      "Słownik": 1,
      "Arytmetyka": 1,
      "Rozumienie": 2,
      "Podobieństwa": 1,
      "Braki w Obrazkach": 1,
      "Porządkowanie Obrazków": 2,
      "Klocki": 2,
      "Układanki": 3,
      "Symbole Cyfr": 2
    },
    scales: {
      slowna: 7,
      bezslowna: 6,
      pelna: 10
    }
  },
  
  "55-64": {
    subtests: {
      "Wiadomości": 1,
      "Powtarzanie Cyfr": 2,
      "Słownik": 1,
      "Arytmetyka": 1,
      "Rozumienie": 2,
      "Podobieństwa": 2,
      "Braki w Obrazkach": 2,
      "Porządkowanie Obrazków": 3,
      "Klocki": 2,
      "Układanki": 3,
      "Symbole Cyfr": 1
    },
    scales: {
      slowna: 7,
      bezslowna: 7,
      pelna: 11
    }
  },
  
  "65-69": {
    subtests: {
      "Wiadomości": 1,
      "Powtarzanie Cyfr": 2,
      "Słownik": 1,
      "Arytmetyka": 1,
      "Rozumienie": 2,
      "Podobieństwa": 2,
      "Braki w Obrazkach": 2,
      "Porządkowanie Obrazków": 2,
      "Klocki": 2,
      "Układanki": 3,
      "Symbole Cyfr": 2
    },
    scales: {
      slowna: 7,
      bezslowna: 7,
      pelna: 11
    }
  },
  
  "70-74": {
    subtests: {
      "Wiadomości": 1,
      "Powtarzanie Cyfr": 2,
      "Słownik": 1,
      "Arytmetyka": 1,
      "Rozumienie": 2,
      "Podobieństwa": 2,
      "Braki w Obrazkach": 2,
      "Porządkowanie Obrazków": 2,
      "Klocki": 2,
      "Układanki": 2,
      "Symbole Cyfr": 1
    },
    scales: {
      slowna: 8,
      bezslowna: 7,
      pelna: 11
    }
  },
  
  "75-79": {
    subtests: {
      "Wiadomości": 1,
      "Powtarzanie Cyfr": 2,
      "Słownik": 1,
      "Arytmetyka": 1,
      "Rozumienie": 2,
      "Podobieństwa": 2,
      "Braki w Obrazkach": 2,
      "Porządkowanie Obrazków": 3,
      "Klocki": 2,
      "Układanki": 2,
      "Symbole Cyfr": 2
    },
    scales: {
      slowna: 8,
      bezslowna: 7,
      pelna: 11
    }
  },
  
  // Grupa 80+ używa tych samych wartości co 75-79
  "80+": {
    subtests: {
      "Wiadomości": 1,
      "Powtarzanie Cyfr": 2,
      "Słownik": 1,
      "Arytmetyka": 1,
      "Rozumienie": 2,
      "Podobieństwa": 2,
      "Braki w Obrazkach": 2,
      "Porządkowanie Obrazków": 3,
      "Klocki": 2,
      "Układanki": 2,
      "Symbole Cyfr": 2
    },
    scales: {
      slowna: 8,
      bezslowna: 7,
      pelna: 11
    }
  }
}

export type ConfidenceLevel = 85 | 95

export interface ConfidenceInterval {
  lower: number
  upper: number
  margin: number
}

// Funkcje do obliczania przedziałów ufności
export function getConfidenceInterval(
  value: number,
  ageGroup: AgeGroupKey,
  type: 'subtest' | 'verbal' | 'performance' | 'fullscale',
  subtest?: Subtest,
  level: ConfidenceLevel = 95
): ConfidenceInterval {
  const data = level === 95 ? confidence95Data : confidence85Data
  const groupData = data[ageGroup]
  
  let margin: number
  
  if (type === 'subtest' && subtest) {
    margin = groupData.subtests[subtest]
  } else if (type === 'verbal') {
    margin = groupData.scales.slowna
  } else if (type === 'performance') {
    margin = groupData.scales.bezslowna
  } else if (type === 'fullscale') {
    margin = groupData.scales.pelna
  } else {
    margin = 0
  }
  
  return {
    lower: value - margin,
    upper: value + margin,
    margin
  }
}

// Funkcja pomocnicza do formatowania przedziału
export function formatConfidenceInterval(interval: ConfidenceInterval): string {
  return `${interval.lower}-${interval.upper}`
}