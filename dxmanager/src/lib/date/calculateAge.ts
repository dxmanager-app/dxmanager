// src/lib/date/calculateAge.ts

export type AgeInYearsMonthsDays = {
  years: number
  months: number
  days: number
}

/**
 * Zwraca wiek jako {lata, miesiące, dni} pomiędzy dwiema datami
 * @param birthDate data urodzenia
 * @param testDate data badania (domyślnie dziś)
 */
export function calculateAge(
  birthDate: Date,
  testDate: Date = new Date()
): AgeInYearsMonthsDays {
  const birth = new Date(
    birthDate.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  )
  const test = new Date(testDate.getFullYear(), testDate.getMonth(), testDate.getDate())

  let years = test.getFullYear() - birth.getFullYear()
  let months = test.getMonth() - birth.getMonth()
  let days = test.getDate() - birth.getDate()

  if (days < 0) {
    months--
    const previousMonth = new Date(test.getFullYear(), test.getMonth(), 0)
    days += previousMonth.getDate()
  }

  if (months < 0) {
    years--
    months += 12
  }

  return { years, months, days }
}

/**
 * Zwraca wiek jako string np. "14 lat, 3 miesiące, 2 dni"
 */
export function formatAgeString(age: AgeInYearsMonthsDays): string {
  const { years, months, days } = age
  const parts = []
  if (years > 0) parts.push(`${years} ${decline(years, 'rok', 'lata', 'lat')}`)
  if (months > 0) parts.push(`${months} ${decline(months, 'miesiąc', 'miesiące', 'miesięcy')}`)
  if (days > 0) parts.push(`${days} ${decline(days, 'dzień', 'dni', 'dni')}`)
  return parts.join(', ')
}

function decline(n: number, form1: string, form2: string, form5: string): string {
  if (n === 1) return form1
  if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) return form2
  return form5
}
