// src/logic/waisr/norms/65-69.ts
// Normy na podstawie tabeli WAIS-R(PL) dla grupy wieku 65-69 lat
import type { NormsForGroup } from "../types"

const data: NormsForGroup = {
  "Wiadomości": [
    { min: 28, max: 29, wp: 19 },
    { min: 27, max: 27, wp: 18 },
    { min: 24, max: 26, wp: 17 },
    { min: 22, max: 23, wp: 16 },
    { min: 19, max: 21, wp: 15 },
    { min: 16, max: 18, wp: 14 },
    { min: 13, max: 15, wp: 13 },
    { min: 11, max: 12, wp: 12 },
    { min: 9, max: 10, wp: 11 },
    { min: 8, max: 8, wp: 10 },
    { min: 7, max: 7, wp: 9 },
    { min: 6, max: 6, wp: 8 },
    { min: 5, max: 5, wp: 7 },
    { min: 4, max: 4, wp: 6 },
    // WP=5: "-" w tabeli = brak danych
    { min: 3, max: 3, wp: 4 },
    // WP=3: "-" w tabeli = brak danych
    { min: 2, max: 2, wp: 2 },
    { min: 0, max: 1, wp: 1 }
  ],

  "Powtarzanie Cyfr": [
    { min: 18, max: 28, wp: 19 },
    { min: 17, max: 17, wp: 18 },
    { min: 15, max: 16, wp: 17 },
    { min: 14, max: 14, wp: 16 },
    { min: 13, max: 13, wp: 15 },
    { min: 11, max: 12, wp: 14 },
    { min: 10, max: 10, wp: 13 },
    { min: 9, max: 9, wp: 12 },
    // WP=11: "-" w tabeli = brak danych
    { min: 8, max: 8, wp: 10 },
    { min: 7, max: 7, wp: 9 },
    // WP=8: "-" w tabeli = brak danych
    { min: 6, max: 6, wp: 7 },
    { min: 5, max: 5, wp: 6 },
    { min: 4, max: 4, wp: 5 },
    // WP=4: "-" w tabeli = brak danych
    { min: 3, max: 3, wp: 3 },
    { min: 2, max: 2, wp: 2 },
    { min: 0, max: 1, wp: 1 }
  ],

  "Słownik": [
    { min: 61, max: 70, wp: 19 },
    { min: 56, max: 60, wp: 18 },
    { min: 53, max: 55, wp: 17 },
    { min: 49, max: 52, wp: 16 },
    { min: 44, max: 48, wp: 15 },
    { min: 37, max: 43, wp: 14 },
    { min: 29, max: 36, wp: 13 },
    { min: 25, max: 28, wp: 12 },
    { min: 21, max: 24, wp: 11 },
    { min: 15, max: 20, wp: 10 },
    { min: 12, max: 14, wp: 9 },
    { min: 9, max: 11, wp: 8 },
    { min: 7, max: 8, wp: 7 },
    { min: 6, max: 6, wp: 6 },
    { min: 4, max: 5, wp: 5 },
    { min: 1, max: 3, wp: 4 },
    // WP=3: "-" w tabeli = brak danych
    // WP=2: "-" w tabeli = brak danych
    { min: 0, max: 0, wp: 1 }
  ],

  "Arytmetyka": [
    { min: 65, max: 84, wp: 19 },
    { min: 59, max: 64, wp: 18 },
    { min: 54, max: 58, wp: 17 },
    { min: 47, max: 53, wp: 16 },
    { min: 43, max: 46, wp: 15 },
    { min: 35, max: 42, wp: 14 },
    { min: 29, max: 34, wp: 13 },
    { min: 23, max: 28, wp: 12 },
    { min: 19, max: 22, wp: 11 },
    { min: 17, max: 18, wp: 10 },
    { min: 15, max: 16, wp: 9 },
    { min: 13, max: 14, wp: 8 },
    { min: 9, max: 12, wp: 7 },
    { min: 6, max: 8, wp: 6 },
    // WP=5: "-" w tabeli = brak danych
    { min: 4, max: 5, wp: 4 },
    { min: 2, max: 3, wp: 3 },
    // WP=2: "-" w tabeli = brak danych
    { min: 0, max: 1, wp: 1 }
  ],

  "Rozumienie": [
    { min: 30, max: 32, wp: 19 },
    { min: 28, max: 29, wp: 18 },
    { min: 25, max: 27, wp: 17 },
    { min: 24, max: 24, wp: 16 },
    { min: 22, max: 23, wp: 15 },
    { min: 21, max: 21, wp: 14 },
    { min: 19, max: 20, wp: 13 },
    { min: 17, max: 18, wp: 12 },
    { min: 15, max: 16, wp: 11 },
    { min: 13, max: 14, wp: 10 },
    { min: 12, max: 12, wp: 9 },
    { min: 10, max: 11, wp: 8 },
    { min: 9, max: 9, wp: 7 },
    { min: 6, max: 8, wp: 6 },
    { min: 5, max: 5, wp: 5 },
    { min: 4, max: 4, wp: 4 },
    { min: 3, max: 3, wp: 3 },
    { min: 1, max: 2, wp: 2 },
    { min: 0, max: 0, wp: 1 }
  ],

  "Podobieństwa": [
    { min: 26, max: 28, wp: 19 },
    { min: 25, max: 25, wp: 18 },
    { min: 24, max: 24, wp: 17 },
    { min: 23, max: 23, wp: 16 },
    { min: 20, max: 22, wp: 15 },
    { min: 17, max: 19, wp: 14 },
    { min: 14, max: 16, wp: 13 },
    { min: 12, max: 13, wp: 12 },
    { min: 8, max: 11, wp: 11 },
    { min: 7, max: 7, wp: 10 },
    { min: 5, max: 6, wp: 9 },
    { min: 3, max: 4, wp: 8 },
    { min: 2, max: 2, wp: 7 },
    { min: 1, max: 1, wp: 6 },
    // WP=5: "-" w tabeli = brak danych
    // WP=4: "-" w tabeli = brak danych
    // WP=3: "-" w tabeli = brak danych
    // WP=2: "-" w tabeli = brak danych
    { min: 0, max: 0, wp: 1 }
  ],

  "Braki w Obrazkach": [
    { min: 27, max: 36, wp: 19 },
    { min: 26, max: 26, wp: 18 },
    { min: 25, max: 25, wp: 17 },
    { min: 24, max: 24, wp: 16 },
    { min: 22, max: 23, wp: 15 },
    { min: 20, max: 21, wp: 14 },
    { min: 18, max: 19, wp: 13 },
    { min: 15, max: 17, wp: 12 },
    { min: 13, max: 14, wp: 11 },
    { min: 10, max: 12, wp: 10 },
    { min: 8, max: 9, wp: 9 },
    { min: 5, max: 7, wp: 8 },
    { min: 4, max: 4, wp: 7 },
    { min: 3, max: 3, wp: 6 },
    // WP=5: "-" w tabeli = brak danych
    { min: 2, max: 2, wp: 4 },
    { min: 1, max: 1, wp: 3 },
    // WP=2: "-" w tabeli = brak danych
    { min: 0, max: 0, wp: 1 }
  ],

  "Porządkowanie Obrazków": [
    { min: 16, max: 30, wp: 19 },
    { min: 15, max: 15, wp: 18 },
    { min: 14, max: 14, wp: 17 },
    { min: 13, max: 13, wp: 16 },
    { min: 10, max: 12, wp: 15 },
    { min: 8, max: 9, wp: 14 },
    { min: 6, max: 7, wp: 13 },
    { min: 5, max: 5, wp: 12 },
    { min: 4, max: 4, wp: 11 },
    { min: 3, max: 3, wp: 10 },
    // WP=9: "-" w tabeli = brak danych
    { min: 2, max: 2, wp: 8 },
    // WP=7: "-" w tabeli = brak danych
    { min: 1, max: 1, wp: 6 },
    // WP=5: "-" w tabeli = brak danych
    // WP=4: "-" w tabeli = brak danych
    // WP=3: "-" w tabeli = brak danych
    // WP=2: "-" w tabeli = brak danych
    { min: 0, max: 0, wp: 1 }
  ],

  "Klocki": [
    { min: 39, max: 54, wp: 19 },
    { min: 34, max: 38, wp: 18 },
    { min: 30, max: 33, wp: 17 },
    { min: 28, max: 29, wp: 16 },
    { min: 26, max: 27, wp: 15 },
    { min: 23, max: 25, wp: 14 },
    { min: 21, max: 22, wp: 13 },
    { min: 18, max: 20, wp: 12 },
    { min: 16, max: 17, wp: 11 },
    { min: 13, max: 15, wp: 10 },
    { min: 10, max: 12, wp: 9 },
    { min: 9, max: 9, wp: 8 },
    { min: 6, max: 8, wp: 7 },
    { min: 4, max: 5, wp: 6 },
    { min: 1, max: 3, wp: 5 },
    // WP=4: "-" w tabeli = brak danych
    // WP=3: "-" w tabeli = brak danych
    // WP=2: "-" w tabeli = brak danych
    { min: 0, max: 0, wp: 1 }
  ],

  "Układanki": [
    { min: 33, max: 41, wp: 19 },
    { min: 32, max: 32, wp: 18 },
    { min: 31, max: 31, wp: 17 },
    { min: 30, max: 30, wp: 16 },
    // WP=15: "-" w tabeli = brak danych
    { min: 29, max: 29, wp: 14 },
    { min: 26, max: 28, wp: 13 },
    { min: 23, max: 25, wp: 12 },
    { min: 21, max: 22, wp: 11 },
    { min: 17, max: 20, wp: 10 },
    { min: 15, max: 16, wp: 9 },
    { min: 13, max: 14, wp: 8 },
    { min: 11, max: 12, wp: 7 },
    { min: 9, max: 10, wp: 6 },
    { min: 8, max: 8, wp: 5 },
    { min: 6, max: 7, wp: 4 },
    { min: 4, max: 5, wp: 3 },
    { min: 3, max: 3, wp: 2 },
    { min: 0, max: 2, wp: 1 }
  ],

  "Symbole Cyfr": [
    { min: 70, max: 93, wp: 19 },
    { min: 60, max: 69, wp: 18 },
    { min: 54, max: 59, wp: 17 },
    { min: 50, max: 53, wp: 16 },
    { min: 43, max: 49, wp: 15 },
    { min: 38, max: 42, wp: 14 },
    { min: 35, max: 37, wp: 13 },
    { min: 31, max: 34, wp: 12 },
    { min: 28, max: 30, wp: 11 },
    { min: 25, max: 27, wp: 10 },
    { min: 21, max: 24, wp: 9 },
    { min: 19, max: 20, wp: 8 },
    { min: 15, max: 18, wp: 7 },
    { min: 13, max: 14, wp: 6 },
    { min: 10, max: 12, wp: 5 },
    { min: 9, max: 9, wp: 4 },
    { min: 6, max: 8, wp: 3 },
    { min: 5, max: 5, wp: 2 },
    { min: 0, max: 4, wp: 1 }
  ]
}

export default data