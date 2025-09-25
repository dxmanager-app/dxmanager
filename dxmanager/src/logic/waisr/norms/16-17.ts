// src/logic/waisr/norms/16-17.ts
// POPRAWIONE normy na podstawie Excel 1617 at.ods - WSZYSTKIE WP od 19 do 1
import type { NormsForGroup } from "../types"

const data: NormsForGroup = {
  "Wiadomości": [
    { min: 27, max: 29, wp: 19 },
    { min: 24, max: 26, wp: 18 },
    { min: 22, max: 23, wp: 17 },
    { min: 21, max: 21, wp: 16 },
    { min: 19, max: 20, wp: 15 },
    { min: 17, max: 18, wp: 14 },
    { min: 16, max: 16, wp: 13 },
    { min: 13, max: 15, wp: 12 },
    { min: 11, max: 12, wp: 11 },
    { min: 9, max: 10, wp: 10 },
    { min: 8, max: 8, wp: 9 },
    { min: 6, max: 7, wp: 8 },
    { min: 5, max: 5, wp: 7 },
    { min: 4, max: 4, wp: 6 },
    { min: 3, max: 3, wp: 5 },
    // WP=4: "-" w Excel = ERROR - ten WP nie powinien wystąpić
    { min: 2, max: 2, wp: 3 },
    { min: 1, max: 1, wp: 2 },
    { min: 0, max: 0, wp: 1 }
  ],

  "Powtarzanie Cyfr": [
    { min: 23, max: 28, wp: 19 },
    { min: 22, max: 22, wp: 18 },
    { min: 19, max: 21, wp: 17 },
    { min: 18, max: 18, wp: 16 },
    { min: 17, max: 17, wp: 15 },
    { min: 15, max: 16, wp: 14 },
    { min: 14, max: 14, wp: 13 },
    { min: 13, max: 13, wp: 12 },
    { min: 12, max: 12, wp: 11 },
    { min: 11, max: 11, wp: 10 },
    { min: 10, max: 10, wp: 9 },
    { min: 9, max: 9, wp: 8 },
    // WP=7: "-" w Excel = ERROR
    { min: 8, max: 8, wp: 6 },
    { min: 7, max: 7, wp: 5 },
    { min: 6, max: 6, wp: 4 },
    { min: 5, max: 5, wp: 3 },
    { min: 2, max: 4, wp: 2 },
    { min: 0, max: 1, wp: 1 }
  ],

  "Słownik": [
    { min: 63, max: 70, wp: 19 },
    { min: 56, max: 62, wp: 18 },
    { min: 54, max: 55, wp: 17 },
    { min: 52, max: 53, wp: 16 },
    { min: 49, max: 51, wp: 15 },
    { min: 46, max: 48, wp: 14 },
    { min: 44, max: 45, wp: 13 },
    { min: 40, max: 43, wp: 12 },
    { min: 36, max: 39, wp: 11 },
    { min: 31, max: 35, wp: 10 },
    { min: 25, max: 30, wp: 9 },
    { min: 22, max: 24, wp: 8 },
    { min: 16, max: 21, wp: 7 },
    { min: 11, max: 15, wp: 6 },
    { min: 7, max: 10, wp: 5 },
    { min: 5, max: 6, wp: 4 },
    { min: 3, max: 4, wp: 3 },
    { min: 1, max: 2, wp: 2 },
    { min: 0, max: 0, wp: 1 }
  ],

  "Arytmetyka": [
    { min: 79, max: 84, wp: 19 },
    { min: 73, max: 78, wp: 18 },
    { min: 66, max: 72, wp: 17 },
    { min: 59, max: 65, wp: 16 },
    { min: 52, max: 58, wp: 15 },
    { min: 48, max: 51, wp: 14 },
    { min: 42, max: 47, wp: 13 },
    { min: 38, max: 41, wp: 12 },
    { min: 31, max: 37, wp: 11 },
    { min: 26, max: 30, wp: 10 },
    { min: 22, max: 25, wp: 9 },
    { min: 19, max: 21, wp: 8 },
    { min: 16, max: 18, wp: 7 },
    { min: 13, max: 15, wp: 6 },
    { min: 10, max: 12, wp: 5 },
    { min: 7, max: 9, wp: 4 },
    { min: 4, max: 6, wp: 3 },
    { min: 2, max: 3, wp: 2 },
    { min: 0, max: 1, wp: 1 }
  ],

  "Rozumienie": [
    { min: 27, max: 32, wp: 19 },
    // WP=18: "-" w Excel = ERROR - ten WP nie powinien wystąpić
    { min: 26, max: 26, wp: 17 },
    { min: 25, max: 25, wp: 16 },
    { min: 24, max: 24, wp: 15 },
    { min: 23, max: 23, wp: 14 },
    { min: 22, max: 22, wp: 13 },
    { min: 20, max: 21, wp: 12 },
    { min: 18, max: 19, wp: 11 },
    { min: 16, max: 17, wp: 10 },
    { min: 14, max: 15, wp: 9 },
    { min: 11, max: 13, wp: 8 },
    { min: 9, max: 10, wp: 7 },
    { min: 7, max: 8, wp: 6 },
    { min: 4, max: 6, wp: 5 },
    { min: 2, max: 3, wp: 4 },
    { min: 1, max: 1, wp: 3 },
    // WP=2: "-" w Excel = ERROR
    { min: 0, max: 0, wp: 1 }
  ],

  "Podobieństwa": [
    { min: 27, max: 28, wp: 19 },
    { min: 26, max: 26, wp: 18 },
    { min: 25, max: 25, wp: 17 },
    { min: 24, max: 24, wp: 16 },
    { min: 23, max: 23, wp: 15 },
    { min: 22, max: 22, wp: 14 },
    { min: 20, max: 21, wp: 13 },
    { min: 18, max: 19, wp: 12 },
    { min: 16, max: 17, wp: 11 },
    { min: 14, max: 15, wp: 10 },
    { min: 12, max: 13, wp: 9 },
    { min: 10, max: 11, wp: 8 },
    { min: 8, max: 9, wp: 7 },
    { min: 4, max: 7, wp: 6 },
    { min: 3, max: 3, wp: 5 },
    { min: 2, max: 2, wp: 4 },
    { min: 1, max: 1, wp: 3 },
    // WP=2: "-" w Excel = ERROR
    { min: 0, max: 0, wp: 1 }
  ],

  "Braki w Obrazkach": [
    { min: 35, max: 36, wp: 19 },
    { min: 34, max: 34, wp: 18 },
    { min: 33, max: 33, wp: 17 },
    { min: 32, max: 32, wp: 16 },
    { min: 31, max: 31, wp: 15 },
    { min: 28, max: 30, wp: 14 },
    { min: 27, max: 27, wp: 13 },
    { min: 25, max: 26, wp: 12 },
    { min: 24, max: 24, wp: 11 },
    { min: 23, max: 23, wp: 10 },
    { min: 21, max: 22, wp: 9 },
    { min: 19, max: 20, wp: 8 },
    { min: 15, max: 18, wp: 7 },
    { min: 13, max: 14, wp: 6 },
    { min: 11, max: 12, wp: 5 },
    { min: 8, max: 10, wp: 4 },
    { min: 5, max: 7, wp: 3 },
    { min: 4, max: 4, wp: 2 },
    { min: 0, max: 3, wp: 1 }
  ],

  "Porządkowanie Obrazków": [
    { min: 26, max: 30, wp: 19 },
    { min: 25, max: 25, wp: 18 },
    { min: 24, max: 24, wp: 17 },
    { min: 23, max: 23, wp: 16 },
    { min: 22, max: 22, wp: 15 },
    { min: 20, max: 21, wp: 14 },
    { min: 18, max: 19, wp: 13 },
    { min: 16, max: 17, wp: 12 },
    { min: 14, max: 15, wp: 11 },
    { min: 12, max: 13, wp: 10 },
    { min: 10, max: 11, wp: 9 },
    { min: 8, max: 9, wp: 8 },
    { min: 6, max: 7, wp: 7 },
    { min: 4, max: 5, wp: 6 },
    { min: 3, max: 3, wp: 5 },
    { min: 2, max: 2, wp: 4 },
    { min: 1, max: 1, wp: 3 },
    // WP=2: "-" w Excel = ERROR
    { min: 0, max: 0, wp: 1 }
  ],

  "Klocki": [
    { min: 49, max: 54, wp: 19 },
    { min: 47, max: 48, wp: 18 },
    { min: 46, max: 46, wp: 17 },
    { min: 45, max: 45, wp: 16 },
    { min: 44, max: 44, wp: 15 },
    { min: 42, max: 43, wp: 14 },
    { min: 40, max: 41, wp: 13 },
    { min: 37, max: 39, wp: 12 },
    { min: 34, max: 36, wp: 11 },
    { min: 31, max: 33, wp: 10 },
    { min: 25, max: 30, wp: 9 },
    { min: 21, max: 24, wp: 8 },
    { min: 19, max: 20, wp: 7 },
    { min: 15, max: 18, wp: 6 },
    { min: 13, max: 14, wp: 5 },
    { min: 10, max: 12, wp: 4 },
    { min: 7, max: 9, wp: 3 },
    { min: 4, max: 6, wp: 2 },
    { min: 0, max: 3, wp: 1 }
  ],

  "Układanki": [
    { min: 39, max: 41, wp: 19 },
    // WP=18: "-" w Excel = ERROR
    { min: 37, max: 38, wp: 17 },
    { min: 36, max: 36, wp: 16 },
    { min: 34, max: 35, wp: 15 },
    // WP=14: "-" w Excel = ERROR
    { min: 33, max: 33, wp: 13 },
    { min: 32, max: 32, wp: 12 },
    { min: 31, max: 31, wp: 11 },
    { min: 30, max: 30, wp: 10 },
    { min: 29, max: 29, wp: 9 },
    { min: 25, max: 28, wp: 8 },
    { min: 23, max: 24, wp: 7 },
    { min: 20, max: 22, wp: 6 },
    { min: 17, max: 19, wp: 5 },
    { min: 16, max: 16, wp: 4 },
    { min: 15, max: 15, wp: 3 },
    { min: 12, max: 14, wp: 2 },
    { min: 0, max: 11, wp: 1 }
  ],

  "Symbole Cyfr": [
    { min: 93, max: 93, wp: 19 },
    { min: 92, max: 92, wp: 18 },
    { min: 87, max: 91, wp: 17 },
    { min: 80, max: 86, wp: 16 },
    { min: 75, max: 79, wp: 15 },
    { min: 71, max: 74, wp: 14 },
    { min: 66, max: 70, wp: 13 },
    { min: 61, max: 65, wp: 12 },
    { min: 56, max: 60, wp: 11 },
    { min: 52, max: 55, wp: 10 },
    { min: 47, max: 51, wp: 9 },
    { min: 43, max: 46, wp: 8 },
    { min: 39, max: 42, wp: 7 },
    { min: 36, max: 38, wp: 6 },
    { min: 31, max: 35, wp: 5 },
    { min: 23, max: 30, wp: 4 },
    { min: 22, max: 22, wp: 3 },
    { min: 21, max: 21, wp: 2 },
    { min: 0, max: 20, wp: 1 }
  ]
}

export default data