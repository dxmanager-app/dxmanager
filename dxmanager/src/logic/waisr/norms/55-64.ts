// src/logic/waisr/norms/55-64.ts
// Normy na podstawie tabeli WAIS-R(PL) dla grupy wieku 55-64 lat
import type { NormsForGroup } from "../types"

const data: NormsForGroup = {
  "Wiadomości": [
    { min: 28, max: 29, wp: 19 },
    { min: 27, max: 27, wp: 18 },
    { min: 24, max: 26, wp: 17 },
    { min: 23, max: 23, wp: 16 },
    { min: 21, max: 22, wp: 15 },
    { min: 20, max: 20, wp: 14 },
    { min: 18, max: 19, wp: 13 },
    { min: 15, max: 17, wp: 12 },
    { min: 13, max: 14, wp: 11 },
    { min: 11, max: 12, wp: 10 },
    { min: 8, max: 10, wp: 9 },
    { min: 7, max: 7, wp: 8 },
    { min: 6, max: 6, wp: 7 },
    { min: 5, max: 5, wp: 6 },
    { min: 4, max: 4, wp: 5 },
    // WP=4: "-" w tabeli = brak danych
    { min: 3, max: 3, wp: 3 },
    { min: 2, max: 2, wp: 2 },
    { min: 0, max: 1, wp: 1 }
  ],

  "Powtarzanie Cyfr": [
    { min: 18, max: 28, wp: 19 },
    { min: 17, max: 17, wp: 18 },
    { min: 15, max: 16, wp: 17 },
    { min: 14, max: 14, wp: 16 },
    // WP=15: "-" w tabeli = brak danych
    { min: 13, max: 13, wp: 14 },
    { min: 12, max: 12, wp: 13 },
    { min: 11, max: 11, wp: 12 },
    { min: 10, max: 10, wp: 11 },
    { min: 9, max: 9, wp: 10 },
    // WP=9: "-" w tabeli = brak danych
    { min: 8, max: 8, wp: 8 },
    { min: 7, max: 7, wp: 7 },
    { min: 6, max: 6, wp: 6 },
    // WP=5: "-" w tabeli = brak danych
    { min: 5, max: 5, wp: 4 },
    { min: 3, max: 4, wp: 3 },
    { min: 2, max: 2, wp: 2 },
    { min: 0, max: 1, wp: 1 }
  ],

  "Słownik": [
    { min: 63, max: 70, wp: 19 },
    { min: 60, max: 62, wp: 18 },
    { min: 57, max: 59, wp: 17 },
    { min: 53, max: 56, wp: 16 },
    { min: 50, max: 52, wp: 15 },
    { min: 46, max: 49, wp: 14 },
    { min: 40, max: 45, wp: 13 },
    { min: 34, max: 39, wp: 12 },
    { min: 28, max: 33, wp: 11 },
    { min: 24, max: 27, wp: 10 },
    { min: 19, max: 23, wp: 9 },
    { min: 13, max: 18, wp: 8 },
    { min: 10, max: 12, wp: 7 },
    { min: 8, max: 9, wp: 6 },
    { min: 5, max: 7, wp: 5 },
    { min: 4, max: 4, wp: 4 },
    { min: 2, max: 3, wp: 3 },
    { min: 1, max: 1, wp: 2 },
    { min: 0, max: 0, wp: 1 }
  ],

  "Arytmetyka": [
    { min: 73, max: 84, wp: 19 },
    { min: 69, max: 72, wp: 18 },
    { min: 67, max: 68, wp: 17 },
    { min: 59, max: 66, wp: 16 },
    { min: 53, max: 58, wp: 15 },
    { min: 46, max: 52, wp: 14 },
    { min: 41, max: 45, wp: 13 },
    { min: 32, max: 40, wp: 12 },
    { min: 27, max: 31, wp: 11 },
    { min: 23, max: 26, wp: 10 },
    { min: 19, max: 22, wp: 9 },
    { min: 16, max: 18, wp: 8 },
    { min: 15, max: 15, wp: 7 },
    { min: 9, max: 14, wp: 6 },
    { min: 6, max: 8, wp: 5 },
    { min: 4, max: 5, wp: 4 },
    { min: 2, max: 3, wp: 3 },
    // WP=2: "-" w tabeli = brak danych
    { min: 0, max: 1, wp: 1 }
  ],

  "Rozumienie": [
    { min: 31, max: 32, wp: 19 },
    { min: 30, max: 30, wp: 18 },
    { min: 28, max: 29, wp: 17 },
    { min: 26, max: 27, wp: 16 },
    { min: 24, max: 25, wp: 15 },
    { min: 22, max: 23, wp: 14 },
    { min: 21, max: 21, wp: 13 },
    { min: 19, max: 20, wp: 12 },
    { min: 17, max: 18, wp: 11 },
    { min: 15, max: 16, wp: 10 },
    { min: 13, max: 14, wp: 9 },
    { min: 11, max: 12, wp: 8 },
    { min: 9, max: 10, wp: 7 },
    { min: 8, max: 8, wp: 6 },
    { min: 7, max: 7, wp: 5 },
    { min: 6, max: 6, wp: 4 },
    { min: 4, max: 5, wp: 3 },
    { min: 1, max: 3, wp: 2 },
    { min: 0, max: 0, wp: 1 }
  ],

  "Podobieństwa": [
    { min: 27, max: 28, wp: 19 },
    { min: 26, max: 26, wp: 18 },
    { min: 25, max: 25, wp: 17 },
    { min: 24, max: 24, wp: 16 },
    { min: 21, max: 23, wp: 15 },
    { min: 20, max: 20, wp: 14 },
    { min: 18, max: 19, wp: 13 },
    { min: 15, max: 17, wp: 12 },
    { min: 13, max: 14, wp: 11 },
    { min: 11, max: 12, wp: 10 },
    { min: 8, max: 10, wp: 9 },
    { min: 6, max: 7, wp: 8 },
    { min: 4, max: 5, wp: 7 },
    { min: 2, max: 3, wp: 6 },
    { min: 1, max: 1, wp: 5 },
    // WP=4: "-" w tabeli = brak danych
    // WP=3: "-" w tabeli = brak danych
    // WP=2: "-" w tabeli = brak danych
    { min: 0, max: 0, wp: 1 }
  ],

  "Braki w Obrazkach": [
    { min: 32, max: 36, wp: 19 },
    { min: 31, max: 31, wp: 18 },
    { min: 29, max: 30, wp: 17 },
    { min: 28, max: 28, wp: 16 },
    { min: 26, max: 27, wp: 15 },
    { min: 24, max: 25, wp: 14 },
    { min: 22, max: 23, wp: 13 },
    { min: 19, max: 21, wp: 12 },
    { min: 17, max: 18, wp: 11 },
    { min: 14, max: 16, wp: 10 },
    { min: 12, max: 13, wp: 9 },
    { min: 10, max: 11, wp: 8 },
    { min: 8, max: 9, wp: 7 },
    { min: 7, max: 7, wp: 6 },
    { min: 5, max: 6, wp: 5 },
    { min: 4, max: 4, wp: 4 },
    { min: 2, max: 3, wp: 3 },
    { min: 1, max: 1, wp: 2 },
    { min: 0, max: 0, wp: 1 }
  ],

  "Porządkowanie Obrazków": [
    { min: 22, max: 30, wp: 19 },
    { min: 19, max: 21, wp: 18 },
    { min: 16, max: 18, wp: 17 },
    { min: 14, max: 15, wp: 16 },
    { min: 13, max: 13, wp: 15 },
    { min: 11, max: 12, wp: 14 },
    { min: 9, max: 10, wp: 13 },
    { min: 7, max: 8, wp: 12 },
    { min: 6, max: 6, wp: 11 },
    { min: 5, max: 5, wp: 10 },
    { min: 4, max: 4, wp: 9 },
    { min: 3, max: 3, wp: 8 },
    // WP=7: "-" w tabeli = brak danych
    { min: 2, max: 2, wp: 6 },
    // WP=5: "-" w tabeli = brak danych
    { min: 1, max: 1, wp: 4 },
    // WP=3: "-" w tabeli = brak danych
    // WP=2: "-" w tabeli = brak danych
    { min: 0, max: 0, wp: 1 }
  ],

  "Klocki": [
    { min: 45, max: 54, wp: 19 },
    { min: 39, max: 44, wp: 18 },
    { min: 37, max: 38, wp: 17 },
    { min: 33, max: 36, wp: 16 },
    { min: 30, max: 32, wp: 15 },
    { min: 28, max: 29, wp: 14 },
    { min: 25, max: 27, wp: 13 },
    { min: 22, max: 24, wp: 12 },
    { min: 20, max: 21, wp: 11 },
    { min: 17, max: 19, wp: 10 },
    { min: 14, max: 16, wp: 9 },
    { min: 12, max: 13, wp: 8 },
    { min: 10, max: 11, wp: 7 },
    { min: 9, max: 9, wp: 6 },
    { min: 7, max: 8, wp: 5 },
    { min: 4, max: 6, wp: 4 },
    { min: 1, max: 3, wp: 3 },
    // WP=2: "-" w tabeli = brak danych
    { min: 0, max: 0, wp: 1 }
  ],

  "Układanki": [
    { min: 34, max: 41, wp: 19 },
    { min: 33, max: 33, wp: 18 },
    { min: 32, max: 32, wp: 17 },
    { min: 31, max: 31, wp: 16 },
    // WP=15: "-" w tabeli = brak danych
    { min: 30, max: 30, wp: 14 },
    { min: 29, max: 29, wp: 13 },
    { min: 28, max: 28, wp: 12 },
    { min: 25, max: 27, wp: 11 },
    { min: 23, max: 24, wp: 10 },
    { min: 20, max: 22, wp: 9 },
    { min: 16, max: 19, wp: 8 },
    { min: 15, max: 15, wp: 7 },
    { min: 12, max: 14, wp: 6 },
    { min: 8, max: 11, wp: 5 },
    { min: 7, max: 7, wp: 4 },
    { min: 6, max: 6, wp: 3 },
    { min: 4, max: 5, wp: 2 },
    { min: 0, max: 3, wp: 1 }
  ],

  "Symbole Cyfr": [
    { min: 76, max: 93, wp: 19 },
    { min: 66, max: 75, wp: 18 },
    { min: 61, max: 65, wp: 17 },
    { min: 56, max: 60, wp: 16 },
    { min: 52, max: 55, wp: 15 },
    { min: 48, max: 51, wp: 14 },
    { min: 44, max: 47, wp: 13 },
    { min: 40, max: 43, wp: 12 },
    { min: 36, max: 39, wp: 11 },
    { min: 34, max: 35, wp: 10 },
    { min: 28, max: 30, wp: 9 },
    { min: 26, max: 27, wp: 8 },
    { min: 22, max: 25, wp: 7 },
    { min: 20, max: 21, wp: 6 },
    { min: 18, max: 19, wp: 5 },
    { min: 16, max: 17, wp: 4 },
    { min: 12, max: 15, wp: 3 },
    { min: 11, max: 11, wp: 2 },
    { min: 0, max: 10, wp: 1 }
  ]
}

export default data