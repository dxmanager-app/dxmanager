// src/logic/waisr/norms/45-54.ts
// Normy na podstawie tabeli WAIS-R(PL) dla grupy wieku 45-54 lat
import type { NormsForGroup } from "../types"

const data: NormsForGroup = {
  "Wiadomości": [
    { min: 28, max: 29, wp: 19 },
    { min: 26, max: 27, wp: 18 },
    { min: 24, max: 25, wp: 17 },
    { min: 23, max: 23, wp: 16 },
    { min: 22, max: 22, wp: 15 },
    { min: 21, max: 21, wp: 14 },
    { min: 19, max: 20, wp: 13 },
    { min: 16, max: 18, wp: 12 },
    { min: 14, max: 15, wp: 11 },
    { min: 11, max: 13, wp: 10 },
    { min: 9, max: 10, wp: 9 },
    { min: 8, max: 8, wp: 8 },
    { min: 6, max: 7, wp: 7 },
    { min: 5, max: 5, wp: 6 },
    { min: 4, max: 4, wp: 5 },
    // WP=4: "-" w tabeli = brak danych
    { min: 3, max: 3, wp: 3 },
    { min: 2, max: 2, wp: 2 },
    { min: 0, max: 1, wp: 1 }
  ],

  "Powtarzanie Cyfr": [
    { min: 21, max: 28, wp: 19 },
    { min: 20, max: 20, wp: 18 },
    { min: 18, max: 19, wp: 17 },
    { min: 17, max: 17, wp: 16 },
    { min: 15, max: 16, wp: 15 },
    { min: 14, max: 14, wp: 14 },
    { min: 13, max: 13, wp: 13 },
    { min: 12, max: 12, wp: 12 },
    { min: 11, max: 11, wp: 11 },
    { min: 10, max: 10, wp: 10 },
    { min: 9, max: 9, wp: 9 },
    { min: 8, max: 8, wp: 8 },
    // WP=7: "-" w tabeli = brak danych
    { min: 7, max: 7, wp: 6 },
    { min: 6, max: 6, wp: 5 },
    { min: 5, max: 5, wp: 4 },
    { min: 4, max: 4, wp: 3 },
    { min: 2, max: 3, wp: 2 },
    { min: 0, max: 1, wp: 1 }
  ],

  "Słownik": [
    { min: 63, max: 70, wp: 19 },
    { min: 60, max: 62, wp: 18 },
    { min: 58, max: 59, wp: 17 },
    { min: 54, max: 57, wp: 16 },
    { min: 50, max: 53, wp: 15 },
    { min: 47, max: 49, wp: 14 },
    { min: 44, max: 46, wp: 13 },
    { min: 38, max: 43, wp: 12 },
    { min: 32, max: 37, wp: 11 },
    { min: 27, max: 31, wp: 10 },
    { min: 19, max: 26, wp: 9 },
    { min: 13, max: 18, wp: 8 },
    { min: 10, max: 12, wp: 7 },
    { min: 9, max: 9, wp: 6 },
    { min: 7, max: 8, wp: 5 },
    { min: 5, max: 6, wp: 4 },
    { min: 2, max: 4, wp: 3 },
    { min: 1, max: 1, wp: 2 },
    { min: 0, max: 0, wp: 1 }
  ],

  "Arytmetyka": [
    { min: 79, max: 84, wp: 19 },
    { min: 74, max: 78, wp: 18 },
    { min: 73, max: 73, wp: 17 },
    { min: 67, max: 72, wp: 16 },
    { min: 63, max: 66, wp: 15 },
    { min: 53, max: 62, wp: 14 },
    { min: 47, max: 52, wp: 13 },
    { min: 38, max: 46, wp: 12 },
    { min: 32, max: 37, wp: 11 },
    { min: 26, max: 31, wp: 10 },
    { min: 22, max: 25, wp: 9 },
    { min: 18, max: 21, wp: 8 },
    { min: 15, max: 17, wp: 7 },
    { min: 13, max: 14, wp: 6 },
    { min: 9, max: 12, wp: 5 },
    { min: 6, max: 8, wp: 4 },
    { min: 2, max: 5, wp: 3 },
    // WP=2: "-" w tabeli = brak danych
    { min: 0, max: 1, wp: 1 }
  ],

  "Rozumienie": [
    { min: 31, max: 32, wp: 19 },
    { min: 30, max: 30, wp: 18 },
    { min: 28, max: 29, wp: 17 },
    { min: 26, max: 27, wp: 16 },
    { min: 25, max: 25, wp: 15 },
    { min: 24, max: 24, wp: 14 },
    { min: 22, max: 23, wp: 13 },
    { min: 20, max: 21, wp: 12 },
    { min: 18, max: 19, wp: 11 },
    { min: 16, max: 17, wp: 10 },
    { min: 14, max: 15, wp: 9 },
    { min: 11, max: 13, wp: 8 },
    { min: 9, max: 10, wp: 7 },
    { min: 8, max: 8, wp: 6 },
    { min: 7, max: 7, wp: 5 },
    { min: 6, max: 6, wp: 4 },
    { min: 4, max: 5, wp: 3 },
    { min: 1, max: 3, wp: 2 },
    { min: 0, max: 0, wp: 1 }
  ],

  "Podobieństwa": [
    { min: 28, max: 28, wp: 19 },
    { min: 27, max: 27, wp: 18 },
    { min: 26, max: 26, wp: 17 },
    { min: 25, max: 25, wp: 16 },
    { min: 24, max: 24, wp: 15 },
    { min: 22, max: 23, wp: 14 },
    { min: 20, max: 21, wp: 13 },
    { min: 17, max: 19, wp: 12 },
    { min: 15, max: 16, wp: 11 },
    { min: 13, max: 14, wp: 10 },
    { min: 10, max: 12, wp: 9 },
    { min: 8, max: 9, wp: 8 },
    { min: 6, max: 7, wp: 7 },
    { min: 4, max: 5, wp: 6 },
    { min: 2, max: 3, wp: 5 },
    { min: 1, max: 1, wp: 4 },
    // WP=3: "-" w tabeli = brak danych
    // WP=2: "-" w tabeli = brak danych
    { min: 0, max: 0, wp: 1 }
  ],

  "Braki w Obrazkach": [
    { min: 36, max: 36, wp: 19 },
    { min: 34, max: 35, wp: 18 },
    { min: 33, max: 33, wp: 17 },
    { min: 31, max: 32, wp: 16 },
    { min: 30, max: 30, wp: 15 },
    { min: 27, max: 29, wp: 14 },
    { min: 25, max: 26, wp: 13 },
    { min: 22, max: 24, wp: 12 },
    { min: 19, max: 21, wp: 11 },
    { min: 17, max: 18, wp: 10 },
    { min: 14, max: 16, wp: 9 },
    { min: 12, max: 13, wp: 8 },
    { min: 10, max: 11, wp: 7 },
    { min: 8, max: 9, wp: 6 },
    { min: 7, max: 7, wp: 5 },
    { min: 4, max: 6, wp: 4 },
    { min: 2, max: 3, wp: 3 },
    { min: 1, max: 1, wp: 2 },
    { min: 0, max: 0, wp: 1 }
  ],

  "Porządkowanie Obrazków": [
    { min: 24, max: 30, wp: 19 },
    { min: 23, max: 23, wp: 18 },
    { min: 22, max: 22, wp: 17 },
    { min: 20, max: 21, wp: 16 },
    { min: 17, max: 19, wp: 15 },
    { min: 15, max: 16, wp: 14 },
    { min: 12, max: 14, wp: 13 },
    { min: 10, max: 11, wp: 12 },
    { min: 8, max: 9, wp: 11 },
    { min: 7, max: 7, wp: 10 },
    { min: 5, max: 6, wp: 9 },
    { min: 4, max: 4, wp: 8 },
    { min: 3, max: 3, wp: 7 },
    // WP=6: "-" w tabeli = brak danych
    { min: 2, max: 2, wp: 5 },
    // WP=4: "-" w tabeli = brak danych
    { min: 1, max: 1, wp: 3 },
    // WP=2: "-" w tabeli = brak danych
    { min: 0, max: 0, wp: 1 }
  ],

  "Klocki": [
    { min: 49, max: 54, wp: 19 },
    { min: 45, max: 48, wp: 18 },
    { min: 43, max: 44, wp: 17 },
    { min: 41, max: 42, wp: 16 },
    { min: 39, max: 40, wp: 15 },
    { min: 36, max: 38, wp: 14 },
    { min: 33, max: 35, wp: 13 },
    { min: 29, max: 32, wp: 12 },
    { min: 25, max: 28, wp: 11 },
    { min: 21, max: 24, wp: 10 },
    { min: 19, max: 20, wp: 9 },
    { min: 14, max: 18, wp: 8 },
    { min: 12, max: 13, wp: 7 },
    { min: 11, max: 11, wp: 6 },
    { min: 9, max: 10, wp: 5 },
    { min: 6, max: 8, wp: 4 },
    { min: 4, max: 5, wp: 3 },
    { min: 1, max: 3, wp: 2 },
    { min: 0, max: 0, wp: 1 }
  ],

  "Układanki": [
    { min: 36, max: 41, wp: 19 },
    { min: 35, max: 35, wp: 18 },
    { min: 34, max: 34, wp: 17 },
    { min: 33, max: 33, wp: 16 },
    { min: 32, max: 32, wp: 15 },
    { min: 31, max: 31, wp: 14 },
    { min: 30, max: 30, wp: 13 },
    // WP=12: "-" w tabeli = brak danych
    { min: 28, max: 29, wp: 11 },
    { min: 25, max: 27, wp: 10 },
    { min: 22, max: 24, wp: 9 },
    { min: 18, max: 21, wp: 8 },
    { min: 15, max: 17, wp: 7 },
    { min: 13, max: 14, wp: 6 },
    { min: 11, max: 12, wp: 5 },
    { min: 9, max: 10, wp: 4 },
    { min: 7, max: 8, wp: 3 },
    { min: 5, max: 6, wp: 2 },
    { min: 0, max: 4, wp: 1 }
  ],

  "Symbole Cyfr": [
    { min: 90, max: 93, wp: 19 },
    { min: 78, max: 89, wp: 18 },
    { min: 73, max: 77, wp: 17 },
    { min: 68, max: 72, wp: 16 },
    { min: 63, max: 67, wp: 15 },
    { min: 57, max: 62, wp: 14 },
    { min: 53, max: 56, wp: 13 },
    { min: 48, max: 52, wp: 12 },
    { min: 43, max: 47, wp: 11 },
    { min: 39, max: 42, wp: 10 },
    { min: 34, max: 38, wp: 9 },
    { min: 30, max: 33, wp: 8 },
    { min: 27, max: 29, wp: 7 },
    { min: 23, max: 26, wp: 6 },
    { min: 19, max: 22, wp: 5 },
    { min: 16, max: 18, wp: 4 },
    { min: 12, max: 15, wp: 3 },
    { min: 11, max: 11, wp: 2 },
    { min: 0, max: 10, wp: 1 }
  ]
}

export default data