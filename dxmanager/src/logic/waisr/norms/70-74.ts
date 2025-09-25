// src/logic/waisr/norms/70-74.ts
// Normy na podstawie tabeli WAIS-R(PL) dla grupy wieku 70-74 lat
import type { NormsForGroup } from "../types"

const data: NormsForGroup = {
  "Wiadomości": [
    { min: 27, max: 29, wp: 19 },
    { min: 25, max: 26, wp: 18 },
    { min: 24, max: 24, wp: 17 },
    { min: 22, max: 23, wp: 16 },
    { min: 18, max: 21, wp: 15 },
    { min: 16, max: 17, wp: 14 },
    { min: 13, max: 15, wp: 13 },
    { min: 10, max: 12, wp: 12 },
    { min: 9, max: 9, wp: 11 },
    { min: 7, max: 8, wp: 10 },
    { min: 6, max: 6, wp: 9 },
    { min: 5, max: 5, wp: 8 },
    // WP=7: "-" w tabeli = brak danych
    { min: 4, max: 4, wp: 6 },
    // WP=5: "-" w tabeli = brak danych
    { min: 3, max: 3, wp: 4 },
    { min: 2, max: 2, wp: 3 },
    { min: 1, max: 1, wp: 2 },
    { min: 0, max: 0, wp: 1 }
  ],

  "Powtarzanie Cyfr": [
    { min: 17, max: 28, wp: 19 },
    { min: 16, max: 16, wp: 18 },
    { min: 14, max: 15, wp: 17 },
    { min: 13, max: 13, wp: 16 },
    { min: 12, max: 12, wp: 15 },
    { min: 11, max: 11, wp: 14 },
    { min: 10, max: 10, wp: 13 },
    { min: 9, max: 9, wp: 12 },
    // WP=11: "-" w tabeli = brak danych
    { min: 8, max: 8, wp: 10 },
    { min: 7, max: 7, wp: 9 },
    { min: 6, max: 6, wp: 8 },
    // WP=7: "-" w tabeli = brak danych
    { min: 5, max: 5, wp: 6 },
    { min: 4, max: 4, wp: 5 },
    { min: 3, max: 3, wp: 4 },
    { min: 2, max: 2, wp: 3 },
    { min: 1, max: 1, wp: 2 },
    { min: 0, max: 0, wp: 1 }
  ],

  "Słownik": [
    { min: 59, max: 70, wp: 19 },
    { min: 53, max: 58, wp: 18 },
    { min: 50, max: 52, wp: 17 },
    { min: 46, max: 49, wp: 16 },
    { min: 40, max: 45, wp: 15 },
    { min: 36, max: 39, wp: 14 },
    { min: 29, max: 35, wp: 13 },
    { min: 23, max: 28, wp: 12 },
    { min: 19, max: 22, wp: 11 },
    { min: 14, max: 18, wp: 10 },
    { min: 10, max: 13, wp: 9 },
    { min: 7, max: 9, wp: 8 },
    { min: 5, max: 6, wp: 7 },
    { min: 3, max: 4, wp: 6 },
    { min: 2, max: 2, wp: 5 },
    { min: 1, max: 1, wp: 4 },
    // WP=3: "-" w tabeli = brak danych
    // WP=2: "-" w tabeli = brak danych
    { min: 0, max: 0, wp: 1 }
  ],

  "Arytmetyka": [
    { min: 65, max: 84, wp: 19 },
    { min: 59, max: 64, wp: 18 },
    { min: 54, max: 58, wp: 17 },
    { min: 49, max: 53, wp: 16 },
    { min: 41, max: 48, wp: 15 },
    { min: 34, max: 40, wp: 14 },
    { min: 25, max: 33, wp: 13 },
    { min: 20, max: 24, wp: 12 },
    { min: 18, max: 19, wp: 11 },
    { min: 16, max: 17, wp: 10 },
    { min: 14, max: 15, wp: 9 },
    { min: 12, max: 13, wp: 8 },
    { min: 9, max: 11, wp: 7 },
    { min: 6, max: 8, wp: 6 },
    { min: 4, max: 5, wp: 5 },
    { min: 2, max: 3, wp: 4 },
    // WP=3: "-" w tabeli = brak danych
    // WP=2: "-" w tabeli = brak danych
    { min: 0, max: 1, wp: 1 }
  ],

  "Rozumienie": [
    { min: 30, max: 32, wp: 19 },
    { min: 28, max: 29, wp: 18 },
    { min: 25, max: 27, wp: 17 },
    { min: 23, max: 24, wp: 16 },
    { min: 21, max: 22, wp: 15 },
    { min: 20, max: 20, wp: 14 },
    { min: 18, max: 19, wp: 13 },
    { min: 17, max: 17, wp: 12 },
    { min: 15, max: 16, wp: 11 },
    { min: 13, max: 14, wp: 10 },
    { min: 11, max: 12, wp: 9 },
    { min: 9, max: 10, wp: 8 },
    { min: 6, max: 8, wp: 7 },
    { min: 5, max: 5, wp: 6 },
    { min: 3, max: 4, wp: 5 },
    { min: 2, max: 2, wp: 4 },
    { min: 1, max: 1, wp: 3 },
    // WP=2: "-" w tabeli = brak danych
    { min: 0, max: 0, wp: 1 }
  ],

  "Podobieństwa": [
    { min: 25, max: 28, wp: 19 },
    { min: 24, max: 24, wp: 18 },
    { min: 22, max: 23, wp: 17 },
    { min: 21, max: 21, wp: 16 },
    { min: 18, max: 20, wp: 15 },
    { min: 15, max: 17, wp: 14 },
    { min: 13, max: 14, wp: 13 },
    { min: 9, max: 12, wp: 12 },
    { min: 7, max: 8, wp: 11 },
    { min: 5, max: 6, wp: 10 },
    { min: 3, max: 4, wp: 9 },
    { min: 2, max: 2, wp: 8 },
    { min: 1, max: 1, wp: 7 },
    // WP=6: "-" w tabeli = brak danych
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
    { min: 21, max: 23, wp: 15 },
    { min: 19, max: 20, wp: 14 },
    { min: 15, max: 18, wp: 13 },
    { min: 13, max: 14, wp: 12 },
    { min: 11, max: 12, wp: 11 },
    { min: 9, max: 10, wp: 10 },
    { min: 7, max: 8, wp: 9 },
    { min: 5, max: 6, wp: 8 },
    { min: 3, max: 4, wp: 7 },
    { min: 2, max: 2, wp: 6 },
    { min: 1, max: 1, wp: 5 },
    // WP=4: "-" w tabeli = brak danych
    // WP=3: "-" w tabeli = brak danych
    // WP=2: "-" w tabeli = brak danych
    { min: 0, max: 0, wp: 1 }
  ],

  "Porządkowanie Obrazków": [
    { min: 15, max: 30, wp: 19 },
    { min: 13, max: 14, wp: 18 },
    { min: 12, max: 12, wp: 17 },
    { min: 11, max: 11, wp: 16 },
    { min: 9, max: 10, wp: 15 },
    { min: 8, max: 8, wp: 14 },
    { min: 6, max: 7, wp: 13 },
    { min: 5, max: 5, wp: 12 },
    { min: 4, max: 4, wp: 11 },
    { min: 3, max: 3, wp: 10 },
    { min: 2, max: 2, wp: 9 },
    // WP=8: "-" w tabeli = brak danych
    // WP=7: "-" w tabeli = brak danych
    { min: 1, max: 1, wp: 6 },
    // WP=5: "-" w tabeli = brak danych
    // WP=4: "-" w tabeli = brak danych
    // WP=3: "-" w tabeli = brak danych
    // WP=2: "-" w tabeli = brak danych
    { min: 0, max: 0, wp: 1 }
  ],

  "Klocki": [
    { min: 37, max: 54, wp: 19 },
    { min: 34, max: 36, wp: 18 },
    { min: 30, max: 33, wp: 17 },
    { min: 28, max: 29, wp: 16 },
    { min: 26, max: 27, wp: 15 },
    { min: 23, max: 25, wp: 14 },
    { min: 19, max: 22, wp: 13 },
    { min: 17, max: 18, wp: 12 },
    { min: 14, max: 16, wp: 11 },
    { min: 12, max: 13, wp: 10 },
    { min: 9, max: 11, wp: 9 },
    { min: 7, max: 8, wp: 8 },
    { min: 6, max: 6, wp: 7 },
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
    { min: 29, max: 29, wp: 15 },
    { min: 28, max: 28, wp: 14 },
    { min: 25, max: 27, wp: 13 },
    { min: 22, max: 24, wp: 12 },
    { min: 20, max: 21, wp: 11 },
    { min: 17, max: 19, wp: 10 },
    { min: 14, max: 16, wp: 9 },
    { min: 11, max: 13, wp: 8 },
    { min: 9, max: 10, wp: 7 },
    { min: 7, max: 8, wp: 6 },
    { min: 6, max: 6, wp: 5 },
    { min: 5, max: 5, wp: 4 },
    { min: 4, max: 4, wp: 3 },
    { min: 3, max: 3, wp: 2 },
    { min: 0, max: 2, wp: 1 }
  ],

  "Symbole Cyfr": [
    { min: 56, max: 93, wp: 19 },
    { min: 48, max: 55, wp: 18 },
    { min: 47, max: 47, wp: 17 },
    { min: 44, max: 46, wp: 16 },
    { min: 40, max: 43, wp: 15 },
    { min: 34, max: 39, wp: 14 },
    { min: 31, max: 33, wp: 13 },
    { min: 26, max: 30, wp: 12 },
    { min: 23, max: 25, wp: 11 },
    { min: 19, max: 22, wp: 10 },
    { min: 17, max: 18, wp: 9 },
    { min: 15, max: 16, wp: 8 },
    { min: 12, max: 14, wp: 7 },
    { min: 10, max: 11, wp: 6 },
    { min: 8, max: 9, wp: 5 },
    { min: 5, max: 7, wp: 4 },
    { min: 4, max: 4, wp: 3 },
    { min: 3, max: 3, wp: 2 },
    { min: 0, max: 2, wp: 1 }
  ]
}

export default data