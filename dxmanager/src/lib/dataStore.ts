// src/lib/dataStore.ts

import {
  exists,
  readTextFile,
  writeFile,
  BaseDirectory,
  createDir,
} from "@tauri-apps/api/fs"

const DATA_DIR = "data"
const SETTINGS_FILE = "settings.json"
const RESULTS_FILE = "results.json"

function isTauri() {
  return "__TAURI_IPC__" in window
}

async function ensureDataDir() {
  if (!isTauri()) return
  const dirExists = await exists(DATA_DIR, { dir: BaseDirectory.App })
  if (!dirExists) {
    await createDir(DATA_DIR, { dir: BaseDirectory.App, recursive: true })
  }
}

// SETTINGS
export async function getSettings<T = any>(): Promise<T> {
  if (!isTauri()) {
    // fallback w dev
    const data = localStorage.getItem("settings")
    return data ? (JSON.parse(data) as T) : ({} as T)
  }

  await ensureDataDir()
  const path = `${DATA_DIR}/${SETTINGS_FILE}`
  const fileExists = await exists(path, { dir: BaseDirectory.App })
  if (!fileExists) return {} as T
  const content = await readTextFile(path, { dir: BaseDirectory.App })
  return JSON.parse(content) as T
}

export async function saveSettings<T = any>(data: T) {
  if (!isTauri()) {
    localStorage.setItem("settings", JSON.stringify(data))
    return
  }

  await ensureDataDir()
  const path = `${DATA_DIR}/${SETTINGS_FILE}`
  await writeFile(
    { path, contents: JSON.stringify(data, null, 2) },
    { dir: BaseDirectory.App }
  )
}

// RESULTS
export async function getResults<T = any>(): Promise<T[]> {
  if (!isTauri()) {
    const data = localStorage.getItem("results")
    return data ? (JSON.parse(data) as T[]) : []
  }

  await ensureDataDir()
  const path = `${DATA_DIR}/${RESULTS_FILE}`
  const fileExists = await exists(path, { dir: BaseDirectory.App })
  if (!fileExists) return []
  const content = await readTextFile(path, { dir: BaseDirectory.App })
  return JSON.parse(content) as T[]
}

export async function saveResults<T = any>(data: T[]) {
  if (!isTauri()) {
    localStorage.setItem("results", JSON.stringify(data))
    return
  }

  await ensureDataDir()
  const path = `${DATA_DIR}/${RESULTS_FILE}`
  await writeFile(
    { path, contents: JSON.stringify(data, null, 2) },
    { dir: BaseDirectory.App }
  )
}
