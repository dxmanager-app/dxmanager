// app/dxmanager/src/lib/storage.ts

export function getFromStorage<T = unknown>(key: string, fallback: T): T {
  try {
    const json = localStorage.getItem(key)
    return json ? (JSON.parse(json) as T) : fallback
  } catch {
    return fallback
  }
}

export function setToStorage(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // błąd zapisu – ignorujemy
  }
}

// Poniżej zawartość oryginalnego pliku storage.ts przeniesiona z wcześniejszej wersji:
import { v4 as uuid } from "uuid"

export interface SavedResult {
  id: string
  testId: string
  date: string
  gender: "M" | "K"
  answers: (null | "T" | "F")[]
  scores: Record<string, unknown>
}

const FILE_NAME = "results.json"

let readTextFile: ((path: string) => Promise<string>) | undefined
let writeTextFile: ((path: string, contents: string) => Promise<void>) | undefined
let createDir: ((dir: string, opts: { recursive: boolean }) => Promise<void>) | undefined
let exists: ((path: string) => Promise<boolean>) | undefined
let appDataDir: (() => Promise<string>) | undefined

async function loadTauriModules() {
  if (!readTextFile && typeof window !== "undefined" && "__TAURI__" in window) {
    const fs = await import(/* @vite-ignore */ "@tauri-apps/api/fs")
    const path = await import(/* @vite-ignore */ "@tauri-apps/api/path")
    readTextFile = fs.readTextFile
    writeTextFile = fs.writeTextFile
    createDir = fs.createDir
    exists = fs.exists
    appDataDir = path.appDataDir
  }
}

async function getResultsPath(): Promise<string> {
  await loadTauriModules()
  if (!appDataDir || !exists || !createDir) throw new Error("Tauri API not available")
  const dir = await appDataDir()
  if (!(await exists(dir))) await createDir(dir, { recursive: true })
  return dir + FILE_NAME
}

function fallbackRead(): SavedResult[] {
  try {
    return JSON.parse(localStorage.getItem("dxmanager-results") || "[]")
  } catch {
    return []
  }
}

export async function getResults(): Promise<SavedResult[]> {
  await loadTauriModules()
  if (!readTextFile || !appDataDir) return fallbackRead()
  try {
    const path = await getResultsPath()
    const text = await readTextFile(path)
    return JSON.parse(text)
  } catch {
    return fallbackRead()
  }
}

export async function getResult(id: string): Promise<SavedResult | null> {
  console.log(">>> getResult() – szukamy id =", id)
  const results = await getResults()
  console.log(">>> dostępne wyniki =", results)
  return results.find((r) => r.id === id) || null
}

export async function saveResult(
  r: Omit<SavedResult, "id" | "date">
): Promise<string> {
  const results = await getResults()

  const existing = results.find(
    (x) =>
      x.testId === r.testId &&
      x.gender === r.gender &&
      JSON.stringify(x.answers) === JSON.stringify(r.answers) &&
      JSON.stringify(x.scores) === JSON.stringify(r.scores)
  )

  if (existing) {
    console.log(">>> saveResult() – znaleziono istniejący wynik id =", existing.id)
    return existing.id
  }

  const newId = uuid()
  results.push({ ...r, id: newId, date: new Date().toISOString() })

  console.log(">>> saveResult() – zapisujemy nowy wynik id =", newId)
  console.log(">>> wszystkie wyniki po zapisie =", results)

  await loadTauriModules()
  if (!writeTextFile || !appDataDir) {
    localStorage.setItem("dxmanager-results", JSON.stringify(results))
    return newId
  }
  try {
    const path = await getResultsPath()
    await writeTextFile(path, JSON.stringify(results, null, 2))
    return newId
  } catch {
    localStorage.setItem("dxmanager-results", JSON.stringify(results))
    return newId
  }
}

export async function deleteResult(id: string): Promise<void> {
  const results = (await getResults()).filter((r) => r.id !== id)
  await loadTauriModules()
  if (!writeTextFile || !appDataDir) {
    localStorage.setItem("dxmanager-results", JSON.stringify(results))
    return
  }
  try {
    const path = await getResultsPath()
    await writeTextFile(path, JSON.stringify(results, null, 2))
  } catch {
    localStorage.setItem("dxmanager-results", JSON.stringify(results))
  }
}
