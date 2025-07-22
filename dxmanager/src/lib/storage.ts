// src/lib/storage.ts
import { v4 as uuid } from "uuid"

export interface SavedResult {
  id: string
  testId: string
  date: string       // ISO string
  gender: "M" | "K"
  answers: (null | "T" | "F")[]
  scores: Record<string, unknown>  // any shape you need
}

const KEY = "dxmanager-results"

function read(): SavedResult[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]") as SavedResult[]
  } catch {
    return []
  }
}

export function saveResult(r: Omit<SavedResult, "id" | "date">) {
  const arr = read()
  arr.push({ ...r, id: uuid(), date: new Date().toISOString() })
  localStorage.setItem(KEY, JSON.stringify(arr))
}

export function getResults() {
  return read()
}

export function getResult(id: string) {
  return read().find((r) => r.id === id) || null
}

export function deleteResult(id: string) {
  const arr = read().filter((r) => r.id !== id)
  localStorage.setItem(KEY, JSON.stringify(arr))
}
