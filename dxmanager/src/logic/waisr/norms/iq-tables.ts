// src/logic/waisr/iq/conversion-tables.ts
// Tabele konwersji suma WP → IQ dla wszystkich grup wieku WAIS-R(PL)

export interface IQConversion {
  sumWP: number
  iq: number
}

// Skala Słowna: suma WP → IQ słowne
export const verbalIQTable: IQConversion[] = [
  // IQ >150 (wyświetlamy jako 150+)
  { sumWP: 114, iq: 150 },
  { sumWP: 113, iq: 150 },
  { sumWP: 112, iq: 150 },
  { sumWP: 111, iq: 150 },
  
  // IQ 150-140
  { sumWP: 110, iq: 150 },
  { sumWP: 109, iq: 149 },
  { sumWP: 108, iq: 148 },
  { sumWP: 107, iq: 147 },
  { sumWP: 106, iq: 146 },
  { sumWP: 105, iq: 145 },
  { sumWP: 104, iq: 144 },
  { sumWP: 103, iq: 143 },
  { sumWP: 102, iq: 142 },
  { sumWP: 101, iq: 141 },
  { sumWP: 100, iq: 140 },
  
  // IQ 139-130
  { sumWP: 99, iq: 139 },
  { sumWP: 98, iq: 138 },
  { sumWP: 97, iq: 137 },
  { sumWP: 96, iq: 136 },
  { sumWP: 95, iq: 135 },
  { sumWP: 94, iq: 134 },
  { sumWP: 93, iq: 133 },
  { sumWP: 92, iq: 132 },
  { sumWP: 91, iq: 131 },
  { sumWP: 90, iq: 130 },
  
  // IQ 129-120
  { sumWP: 89, iq: 129 },
  { sumWP: 88, iq: 128 },
  { sumWP: 87, iq: 127 },
  { sumWP: 86, iq: 126 },
  { sumWP: 85, iq: 125 },
  { sumWP: 84, iq: 124 },
  { sumWP: 83, iq: 123 },
  { sumWP: 82, iq: 122 },
  { sumWP: 81, iq: 121 },
  { sumWP: 80, iq: 120 },
  
  // IQ 119-110
  { sumWP: 79, iq: 119 },
  { sumWP: 78, iq: 118 },
  { sumWP: 77, iq: 117 },
  { sumWP: 76, iq: 116 },
  { sumWP: 75, iq: 115 },
  { sumWP: 74, iq: 114 },
  { sumWP: 73, iq: 113 },
  { sumWP: 72, iq: 112 },
  { sumWP: 71, iq: 111 },
  { sumWP: 70, iq: 110 },
  
  // IQ 109-100
  { sumWP: 69, iq: 109 },
  { sumWP: 68, iq: 108 },
  { sumWP: 67, iq: 107 },
  { sumWP: 66, iq: 106 },
  { sumWP: 65, iq: 105 },
  { sumWP: 64, iq: 104 },
  { sumWP: 63, iq: 103 },
  { sumWP: 62, iq: 102 },
  { sumWP: 61, iq: 101 },
  { sumWP: 60, iq: 100 },
  
  // IQ 99-90
  { sumWP: 59, iq: 99 },
  { sumWP: 58, iq: 98 },
  { sumWP: 57, iq: 97 },
  { sumWP: 56, iq: 96 },
  { sumWP: 55, iq: 95 },
  { sumWP: 54, iq: 94 },
  { sumWP: 53, iq: 93 },
  { sumWP: 52, iq: 92 },
  { sumWP: 51, iq: 91 },
  { sumWP: 50, iq: 90 },
  
  // IQ 89-80
  { sumWP: 49, iq: 89 },
  { sumWP: 48, iq: 88 },
  { sumWP: 47, iq: 87 },
  { sumWP: 46, iq: 86 },
  { sumWP: 45, iq: 85 },
  { sumWP: 44, iq: 84 },
  { sumWP: 43, iq: 83 },
  { sumWP: 42, iq: 82 },
  { sumWP: 41, iq: 81 },
  { sumWP: 40, iq: 80 },
  
  // IQ 79-70
  { sumWP: 39, iq: 79 },
  { sumWP: 38, iq: 78 },
  { sumWP: 37, iq: 77 },
  { sumWP: 36, iq: 76 },
  { sumWP: 35, iq: 75 },
  { sumWP: 34, iq: 74 },
  { sumWP: 33, iq: 73 },
  { sumWP: 32, iq: 72 },
  { sumWP: 31, iq: 71 },
  { sumWP: 30, iq: 70 },
  
  // IQ 69-60
  { sumWP: 29, iq: 69 },
  { sumWP: 28, iq: 68 },
  { sumWP: 27, iq: 67 },
  { sumWP: 26, iq: 66 },
  { sumWP: 25, iq: 65 },
  { sumWP: 24, iq: 64 },
  { sumWP: 23, iq: 63 },
  { sumWP: 22, iq: 62 },
  { sumWP: 21, iq: 61 },
  { sumWP: 20, iq: 60 },
  
  // IQ 59-50
  { sumWP: 19, iq: 59 },
  { sumWP: 18, iq: 58 },
  { sumWP: 17, iq: 57 },
  { sumWP: 16, iq: 56 },
  { sumWP: 15, iq: 55 },
  { sumWP: 14, iq: 54 },
  { sumWP: 13, iq: 53 },
  { sumWP: 12, iq: 52 },
  { sumWP: 11, iq: 51 },
  { sumWP: 10, iq: 50 },
  
  // IQ 49-45
  { sumWP: 9, iq: 49 },
  { sumWP: 8, iq: 48 },
  { sumWP: 7, iq: 47 },
  { sumWP: 6, iq: 46 },
  
  // IQ <45 (najniższe)
  { sumWP: 5, iq: 45 }
]

// Skala Bezsłowna: suma WP → IQ bezsłowne
export const performanceIQTable: IQConversion[] = [
  // IQ >150 (wyświetlamy jako 150+)
  { sumWP: 95, iq: 150 },
  { sumWP: 94, iq: 150 },
  { sumWP: 93, iq: 150 },
  { sumWP: 92, iq: 150 },
  { sumWP: 91, iq: 150 },
  { sumWP: 90, iq: 150 },
  { sumWP: 89, iq: 150 },
  { sumWP: 88, iq: 150 },
  
  // IQ 150-140
  { sumWP: 87, iq: 150 },
  { sumWP: 86, iq: 149 },
  { sumWP: 85, iq: 148 },
  { sumWP: 84, iq: 147 },
  { sumWP: 83, iq: 146 },
  { sumWP: 82, iq: 145 },
  { sumWP: 81, iq: 144 },
  { sumWP: 80, iq: 143 },
  { sumWP: 79, iq: 142 },
  { sumWP: 78, iq: 141 },
  { sumWP: 77, iq: 140 },
  
  // IQ 139-130
  { sumWP: 76, iq: 139 },
  { sumWP: 75, iq: 138 },
  { sumWP: 74, iq: 137 },
  { sumWP: 73, iq: 136 },
  { sumWP: 72, iq: 135 },
  { sumWP: 71, iq: 134 },
  { sumWP: 70, iq: 133 },
  { sumWP: 69, iq: 132 },
  { sumWP: 68, iq: 131 },
  { sumWP: 67, iq: 130 },
  
  // IQ 129-120
  { sumWP: 66, iq: 129 },
  { sumWP: 65, iq: 128 },
  { sumWP: 64, iq: 127 },
  { sumWP: 63, iq: 126 },
  { sumWP: 62, iq: 125 },
  { sumWP: 61, iq: 124 },
  { sumWP: 60, iq: 123 },
  { sumWP: 59, iq: 122 },
  { sumWP: 58, iq: 121 },
  { sumWP: 57, iq: 120 },
  
  // IQ 119-110
  { sumWP: 56, iq: 119 },
  { sumWP: 55, iq: 118 },
  { sumWP: 54, iq: 117 },
  { sumWP: 53, iq: 116 },
  { sumWP: 52, iq: 115 },
  { sumWP: 51, iq: 114 },
  { sumWP: 50, iq: 113 },
  { sumWP: 49, iq: 112 },
  { sumWP: 48, iq: 111 },
  { sumWP: 47, iq: 110 },
  
  // IQ 109-100
  { sumWP: 46, iq: 109 },
  { sumWP: 45, iq: 108 },
  { sumWP: 44, iq: 107 },
  { sumWP: 43, iq: 106 },
  { sumWP: 42, iq: 105 },
  { sumWP: 41, iq: 104 },
  { sumWP: 40, iq: 103 },
  { sumWP: 39, iq: 102 },
  { sumWP: 38, iq: 101 },
  { sumWP: 37, iq: 100 },
  
  // IQ 99-90
  { sumWP: 36, iq: 99 },
  { sumWP: 35, iq: 98 },
  { sumWP: 34, iq: 97 },
  { sumWP: 33, iq: 96 },
  { sumWP: 32, iq: 95 },
  { sumWP: 31, iq: 94 },
  { sumWP: 30, iq: 93 },
  { sumWP: 29, iq: 92 },
  { sumWP: 28, iq: 91 },
  { sumWP: 27, iq: 90 },
  
  // IQ 89-80
  { sumWP: 26, iq: 89 },
  { sumWP: 25, iq: 88 },
  { sumWP: 24, iq: 87 },
  { sumWP: 23, iq: 86 },
  { sumWP: 22, iq: 85 },
  { sumWP: 21, iq: 84 },
  { sumWP: 20, iq: 83 },
  { sumWP: 19, iq: 82 },
  { sumWP: 18, iq: 81 },
  { sumWP: 17, iq: 80 },
  
  // IQ 79-70
  { sumWP: 16, iq: 79 },
  { sumWP: 15, iq: 78 },
  { sumWP: 14, iq: 77 },
  { sumWP: 13, iq: 76 },
  { sumWP: 12, iq: 75 },
  { sumWP: 11, iq: 74 },
  { sumWP: 10, iq: 73 },
  { sumWP: 9, iq: 72 },
  { sumWP: 8, iq: 71 },
  { sumWP: 7, iq: 70 },
  
  // IQ 69-60
  { sumWP: 6, iq: 69 },
  { sumWP: 5, iq: 68 },
  { sumWP: 4, iq: 67 },
  { sumWP: 3, iq: 66 },
  { sumWP: 2, iq: 65 },
  { sumWP: 1, iq: 64 },
  { sumWP: 0, iq: 63 }
]

// Skala Pełna: suma WP → IQ pełne
export const fullScaleIQTable: IQConversion[] = [
  // IQ >150 (wyświetlamy jako 150+)
  { sumWP: 209, iq: 150 },
  { sumWP: 208, iq: 150 },
  { sumWP: 207, iq: 150 },
  { sumWP: 206, iq: 150 },
  { sumWP: 205, iq: 150 },
  { sumWP: 204, iq: 150 },
  { sumWP: 203, iq: 150 },
  { sumWP: 202, iq: 150 },
  { sumWP: 201, iq: 150 },
  { sumWP: 200, iq: 150 },
  { sumWP: 199, iq: 150 },
  { sumWP: 198, iq: 150 },
  
  // IQ 150-140 (zakresy)
  { sumWP: 197, iq: 150 },
  { sumWP: 196, iq: 150 },
  { sumWP: 195, iq: 149 },
  { sumWP: 194, iq: 148 },
  { sumWP: 193, iq: 148 },
  { sumWP: 192, iq: 147 },
  { sumWP: 191, iq: 147 },
  { sumWP: 190, iq: 146 },
  { sumWP: 189, iq: 146 },
  { sumWP: 188, iq: 145 },
  { sumWP: 187, iq: 144 },
  { sumWP: 186, iq: 144 },
  { sumWP: 185, iq: 143 },
  { sumWP: 184, iq: 143 },
  { sumWP: 183, iq: 142 },
  { sumWP: 182, iq: 142 },
  { sumWP: 181, iq: 141 },
  { sumWP: 180, iq: 140 },
  { sumWP: 179, iq: 140 },
  
  // IQ 139-130
  { sumWP: 178, iq: 139 },
  { sumWP: 177, iq: 139 },
  { sumWP: 176, iq: 138 },
  { sumWP: 175, iq: 138 },
  { sumWP: 174, iq: 137 },
  { sumWP: 173, iq: 136 },
  { sumWP: 172, iq: 136 },
  { sumWP: 171, iq: 135 },
  { sumWP: 170, iq: 135 },
  { sumWP: 169, iq: 134 },
  { sumWP: 168, iq: 133 },
  { sumWP: 167, iq: 133 },
  { sumWP: 166, iq: 132 },
  { sumWP: 165, iq: 132 },
  { sumWP: 164, iq: 131 },
  { sumWP: 163, iq: 131 },
  { sumWP: 162, iq: 130 },
  
  // IQ 129-120
  { sumWP: 161, iq: 129 },
  { sumWP: 160, iq: 129 },
  { sumWP: 159, iq: 128 },
  { sumWP: 158, iq: 128 },
  { sumWP: 157, iq: 127 },
  { sumWP: 156, iq: 127 },
  { sumWP: 155, iq: 126 },
  { sumWP: 154, iq: 125 },
  { sumWP: 153, iq: 125 },
  { sumWP: 152, iq: 124 },
  { sumWP: 151, iq: 124 },
  { sumWP: 150, iq: 123 },
  { sumWP: 149, iq: 123 },
  { sumWP: 148, iq: 122 },
  { sumWP: 147, iq: 121 },
  { sumWP: 146, iq: 121 },
  { sumWP: 145, iq: 120 },
  { sumWP: 144, iq: 120 },
  
  // IQ 119-110
  { sumWP: 143, iq: 119 },
  { sumWP: 142, iq: 118 },
  { sumWP: 141, iq: 118 },
  { sumWP: 140, iq: 117 },
  { sumWP: 139, iq: 117 },
  { sumWP: 138, iq: 116 },
  { sumWP: 137, iq: 116 },
  { sumWP: 136, iq: 115 },
  { sumWP: 135, iq: 114 },
  { sumWP: 134, iq: 114 },
  { sumWP: 133, iq: 113 },
  { sumWP: 132, iq: 113 },
  { sumWP: 131, iq: 112 },
  { sumWP: 130, iq: 112 },
  { sumWP: 129, iq: 111 },
  { sumWP: 128, iq: 110 },
  { sumWP: 127, iq: 110 },
  
  // IQ 109-100
  { sumWP: 126, iq: 109 },
  { sumWP: 125, iq: 109 },
  { sumWP: 124, iq: 108 },
  { sumWP: 123, iq: 108 },
  { sumWP: 122, iq: 107 },
  { sumWP: 121, iq: 106 },
  { sumWP: 120, iq: 106 },
  { sumWP: 119, iq: 105 },
  { sumWP: 118, iq: 105 },
  { sumWP: 117, iq: 104 },
  { sumWP: 116, iq: 103 },
  { sumWP: 115, iq: 103 },
  { sumWP: 114, iq: 102 },
  { sumWP: 113, iq: 102 },
  { sumWP: 112, iq: 101 },
  { sumWP: 111, iq: 101 },
  { sumWP: 110, iq: 100 },
  
  // IQ 99-90
  { sumWP: 109, iq: 99 },
  { sumWP: 108, iq: 99 },
  { sumWP: 107, iq: 98 },
  { sumWP: 106, iq: 98 },
  { sumWP: 105, iq: 97 },
  { sumWP: 104, iq: 97 },
  { sumWP: 103, iq: 96 },
  { sumWP: 102, iq: 95 },
  { sumWP: 101, iq: 95 },
  { sumWP: 100, iq: 94 },
  { sumWP: 99, iq: 94 },
  { sumWP: 98, iq: 93 },
  { sumWP: 97, iq: 93 },
  { sumWP: 96, iq: 92 },
  { sumWP: 95, iq: 91 },
  { sumWP: 94, iq: 91 },
  { sumWP: 93, iq: 90 },
  { sumWP: 92, iq: 90 },
  
  // IQ 89-80
  { sumWP: 91, iq: 89 },
  { sumWP: 90, iq: 88 },
  { sumWP: 89, iq: 88 },
  { sumWP: 88, iq: 87 },
  { sumWP: 87, iq: 87 },
  { sumWP: 86, iq: 86 },
  { sumWP: 85, iq: 86 },
  { sumWP: 84, iq: 85 },
  { sumWP: 83, iq: 84 },
  { sumWP: 82, iq: 84 },
  { sumWP: 81, iq: 83 },
  { sumWP: 80, iq: 83 },
  { sumWP: 79, iq: 82 },
  { sumWP: 78, iq: 82 },
  { sumWP: 77, iq: 81 },
  { sumWP: 76, iq: 80 },
  { sumWP: 75, iq: 80 },
  
  // IQ 79-70
  { sumWP: 74, iq: 79 },
  { sumWP: 73, iq: 79 },
  { sumWP: 72, iq: 78 },
  { sumWP: 71, iq: 78 },
  { sumWP: 70, iq: 77 },
  { sumWP: 69, iq: 76 },
  { sumWP: 68, iq: 76 },
  { sumWP: 67, iq: 75 },
  { sumWP: 66, iq: 75 },
  { sumWP: 65, iq: 74 },
  { sumWP: 64, iq: 73 },
  { sumWP: 63, iq: 73 },
  { sumWP: 62, iq: 72 },
  { sumWP: 61, iq: 72 },
  { sumWP: 60, iq: 71 },
  { sumWP: 59, iq: 71 },
  { sumWP: 58, iq: 70 },
  
  // IQ 69-60
  { sumWP: 57, iq: 69 },
  { sumWP: 56, iq: 69 },
  { sumWP: 55, iq: 68 },
  { sumWP: 54, iq: 68 },
  { sumWP: 53, iq: 67 },
  { sumWP: 52, iq: 67 },
  { sumWP: 51, iq: 66 },
  { sumWP: 50, iq: 65 },
  { sumWP: 49, iq: 65 },
  { sumWP: 48, iq: 64 },
  { sumWP: 47, iq: 64 },
  { sumWP: 46, iq: 63 },
  { sumWP: 45, iq: 63 },
  { sumWP: 44, iq: 62 },
  { sumWP: 43, iq: 61 },
  { sumWP: 42, iq: 61 },
  { sumWP: 41, iq: 60 },
  { sumWP: 40, iq: 60 },
  
  // IQ 59-50
  { sumWP: 39, iq: 59 },
  { sumWP: 38, iq: 58 },
  { sumWP: 37, iq: 58 },
  { sumWP: 36, iq: 57 },
  { sumWP: 35, iq: 57 },
  { sumWP: 34, iq: 56 },
  { sumWP: 33, iq: 56 },
  { sumWP: 32, iq: 55 },
  { sumWP: 31, iq: 54 },
  { sumWP: 30, iq: 54 },
  { sumWP: 29, iq: 53 },
  { sumWP: 28, iq: 53 },
  { sumWP: 27, iq: 52 },
  { sumWP: 26, iq: 52 },
  { sumWP: 25, iq: 51 },
  { sumWP: 24, iq: 50 },
  { sumWP: 23, iq: 50 },
  
  // IQ 49-45
  { sumWP: 22, iq: 49 },
  { sumWP: 21, iq: 49 },
  { sumWP: 20, iq: 48 },
  { sumWP: 19, iq: 48 },
  { sumWP: 18, iq: 47 },
  { sumWP: 17, iq: 46 },
  { sumWP: 16, iq: 46 },
  { sumWP: 15, iq: 45 },
  { sumWP: 14, iq: 45 }
]

// Funkcje do konwersji
export function getVerbalIQ(sumWP: number): number {
  // Znajdź najbliższą wartość w tabeli
  for (const entry of verbalIQTable) {
    if (sumWP >= entry.sumWP) {
      return entry.iq
    }
  }
  // Jeśli suma jest bardzo niska, zwróć najniższe IQ
  return 45
}

export function getPerformanceIQ(sumWP: number): number {
  for (const entry of performanceIQTable) {
    if (sumWP >= entry.sumWP) {
      return entry.iq
    }
  }
  return 45
}

export function getFullScaleIQ(sumWP: number): number {
  for (const entry of fullScaleIQTable) {
    if (sumWP >= entry.sumWP) {
      return entry.iq
    }
  }
  return 45
}