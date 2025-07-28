export type Answer = "T" | "F" | null

export type Gender = "M" | "F"

export interface Score {
  name: string
  value: number
  tscore: number
}

export interface PatientData {
  id?: string
  firstName?: string
  lastName?: string
  birthDate?: string
  sex: Gender
  education?: string
  occupation?: string
  testDate: string
  age?: number
  notes?: string
  reason?: string
  handedness?: "left" | "right" | "mixed"
}