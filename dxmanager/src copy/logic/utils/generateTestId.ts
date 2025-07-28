// src/logic/utils/generateTestId.ts

/**
 * Generuje 18-cyfrowy identyfikator badania:
 * [RRMMDD][Kod testu 3 cyfry][Data ur. YYYYMMDD][Losowe 3 cyfry]
 */
export function generateTestId(testCode: number, examDate: Date, birthDate: Date): string {
  const pad = (n: number, len = 2) => n.toString().padStart(len, '0')
  const datePart =
    pad(examDate.getFullYear() % 100) +
    pad(examDate.getMonth() + 1) +
    pad(examDate.getDate())
  const testCodePart = pad(testCode, 3)
  const birthPart =
    birthDate.getFullYear().toString() +
    pad(birthDate.getMonth() + 1) +
    pad(birthDate.getDate())
  const randomPart = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `${datePart}${testCodePart}${birthPart}${randomPart}`
}
