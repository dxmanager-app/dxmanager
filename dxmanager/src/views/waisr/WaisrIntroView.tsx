import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import { ChevronDown, ChevronUp, Search } from "lucide-react"

/**
 * WAIS-R — kreator (Intro) — WERSJA PO UPROSZCZENIU
 *
 * Zmiany zgodnie z wymaganiami:
 * - Formularze "wyszukaj" i "dane pacjenta" połączone w JEDEN ekran (krok 2).
 * - Na górze szybkie wyszukiwanie (od 1. znaku) po bazie localStorage ("patients-db").
 *   Wybranie pacjenta auto-uzupełnia pola poniżej (można edytować/uzupełniać braki).
 * - Z formularza pacjenta USUWAMY: "data badania", "wiek (lata)", "wiek dokładny".
 *   Wiek będzie liczony i pokazywany dopiero na ekranie WS, na podstawie:
 *   - daty urodzenia (z tego formularza) oraz
 *   - daty badania (zmienna/edytowalna już na ekranie WS).
 * - Kafelki (sekcje) domyślnie ZWINIĘTE — widoczny tylko nagłówek.
 *   Rozwijają się po kliknięciu w dowolnym miejscu nagłówka (klik w treści nie zwija).
 * - Brak przycisków wyboru "zapisz w bazie" vs "tylko lokalnie".
 *   (Baza jest jedynie do wyszukiwania w tej iteracji).
 */

type GenderInternal = "M" | "F"
type GenderUI = "M" | "K"

type WaisrMeta = {
  fullName: string
  gender: GenderInternal
  maritalStatus: string
  occupation: string
  education: string
  birthDate: string // YYYY-MM-DD (lub pusty)
  // PAMIĘTAJ: brak examDate i brak age/ExactAge — liczymy później na ekranie WS
}

type Patient = {
  id: string
  fullName: string
  pesel?: string
  gender: GenderInternal
  birthDate?: string
  occupation?: string
  education?: string
  maritalStatus?: string
}

const STORAGE_KEY = "waisr-data"
const PATIENTS_KEY = "patients-db"

const toUI = (g?: GenderInternal): GenderUI => (g === "M" ? "M" : "K")
const fromUI = (u: GenderUI): GenderInternal => (u === "M" ? "M" : "F")

export default function WaisrIntroView() {
  const navigate = useNavigate()
  const [step, setStep] = useState<1 | 2 | 3>(1)

  // Metryczka (bez examDate/age)
  const defaultMeta: WaisrMeta = useMemo(
    () => ({
      fullName: "",
      gender: "F",
      maritalStatus: "",
      occupation: "",
      education: "",
      birthDate: "",
    }),
    []
  )
  const [meta, setMeta] = useState<WaisrMeta>(defaultMeta)

  // Pseudo-baza pacjentów (read-only w tej iteracji)
  const [patients, setPatients] = useState<Patient[]>([])
  const [search, setSearch] = useState("")

  // Kafelki: startowo zwinięte
  const [openSearch, setOpenSearch] = useState(false)
  const [openForm, setOpenForm] = useState(false)

  useEffect(() => {
    try {
      const rawDb = localStorage.getItem(PATIENTS_KEY)
      if (rawDb) setPatients(JSON.parse(rawDb))
    } catch {}
  }, [])

  // Prefill z waisr-data (jeśli są jakieś dane metryczki)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const parsed = JSON.parse(raw) as Partial<WaisrMeta> | null
      if (!parsed || typeof parsed !== "object") return
      setMeta((prev) => {
        const next = { ...prev }
        for (const k of Object.keys(prev) as (keyof WaisrMeta)[]) {
          const v = (parsed as any)[k]
          if (typeof v === "string") (next as any)[k] = v
        }
        if ((parsed as any).gender === "M" || (parsed as any).gender === "F")
          next.gender = (parsed as any).gender
        return next
      })
    } catch {}
  }, [])

  // Zapis metryczki do waisr-data (bez WS)
  const saveMetaToStorage = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      const prev = raw ? JSON.parse(raw) : {}
      const payload = { ...prev, ...meta }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    } catch {}
  }

  // Filtrowanie „od pierwszego znaku”
  const filteredPatients = patients.filter((p) => {
    const q = search.trim().toLowerCase()
    if (!q) return false
    return (
      p.fullName.toLowerCase().includes(q) ||
      (p.pesel || "").toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q)
    )
  })

  // Podstaw dane pacjenta i otwórz formularz do edycji
  const pickPatient = (p: Patient) => {
    setMeta((m) => ({
      ...m,
      fullName: p.fullName ?? "",
      gender: p.gender ?? "F",
      birthDate: p.birthDate ?? "",
      occupation: p.occupation ?? "",
      education: p.education ?? "",
      maritalStatus: p.maritalStatus ?? "",
    }))
    setOpenForm(true)
  }

  // Nawigacja kroków
  const goNext = () => {
    if (step === 1) return setStep(2)
    if (step === 2) {
      saveMetaToStorage()
      return setStep(3)
    }
    if (step === 3) {
      saveMetaToStorage()
      return navigate("/tests/waisr/input")
    }
  }
  const goPrev = () => setStep((s) => (s > 1 ? ((s - 1) as 1 | 2 | 3) : s))

  // Uniwersalny kafelek „collapsible”: nagłówek przełącza; klik w treść nie zwija.
  const Section: React.FC<{
    title: string
    subtitle?: string
    open: boolean
    setOpen: (v: boolean) => void
    children: React.ReactNode
  }> = ({ title, subtitle, open, setOpen, children }) => (
    <div className="rounded-2xl border border-border bg-muted/10 shadow-sm">
      <div
        className="p-4 md:p-5 flex items-center justify-between cursor-pointer select-none"
        onClick={() => setOpen(!open)}
        role="button"
        aria-expanded={open}
      >
        <div>
          <h4 className="text-base md:text-lg font-semibold">{title}</h4>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </div>
      {open && <div className="px-4 pb-4 md:px-5 md:pb-5">{children}</div>}
    </div>
  )

  return (
    <div className="container mx-auto max-w-5xl p-4">
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">WAIS-R — kreator badania</CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Krok 1 — prosta instrukcja */}
          {step === 1 && (
            <div className="rounded-2xl border border-border bg-muted/10 p-4 md:p-5 shadow-sm">
              <div className="text-sm leading-relaxed space-y-2">
                <p>
                  W trybie uproszczonym wpiszesz WS (wyniki surowe) zsumowane per podtest. Logika
                  przeliczy WS → WP, sumy i wskaźniki. Wiek będzie liczony na ekranie WS na podstawie
                  <strong> daty urodzenia</strong> (tu) i <strong>daty badania</strong> (na ekranie WS).
                </p>
              </div>
            </div>
          )}

          {/* Krok 2 — połączone: wyszukiwarka + dane pacjenta */}
          {step === 2 && (
            <>
              <Section
                title="Szukaj w bazie pacjentów"
                subtitle="Wpisz imię, nazwisko, PESEL lub ID — wyniki pojawiają się od pierwszego znaku."
                open={openSearch}
                setOpen={setOpenSearch}
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="np. Jan Kowalski / 90010112345 / PAT-..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <Search className="h-4 w-4 opacity-60" />
                  </div>

                  {search.trim() !== "" && (
                    <div className="rounded-lg border border-border bg-background max-h-56 overflow-auto">
                      {filteredPatients.length === 0 ? (
                        <div className="p-3 text-sm text-muted-foreground">Brak wyników.</div>
                      ) : (
                        <ul className="divide-y divide-border">
                          {filteredPatients.map((p) => (
                            <li key={p.id} className="p-3 text-sm flex items-center justify-between gap-3">
                              <div className="min-w-0">
                                <div className="font-medium truncate">{p.fullName}</div>
                                <div className="text-muted-foreground truncate">
                                  ID: {p.id} {p.pesel ? `• PESEL: ${p.pesel}` : ""}{" "}
                                  {p.birthDate ? `• ur. ${p.birthDate}` : ""}
                                </div>
                              </div>
                              <div className="flex gap-2 shrink-0">
                                <Button variant="secondary" size="sm" onClick={() => pickPatient(p)}>
                                  Użyj
                                </Button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              </Section>

              <Section
                title="Dane pacjenta do tego badania"
                subtitle="Jeśli nie wybierasz z bazy — po prostu uzupełnij nowego pacjenta."
                open={openForm}
                setOpen={setOpenForm}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Imię i nazwisko</Label>
                    <Input
                      id="fullName"
                      value={meta.fullName}
                      onChange={(e) => setMeta((m) => ({ ...m, fullName: e.target.value }))}
                      placeholder="np. Jan Kowalski"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Płeć (M/K)</Label>
                    <Select
                      value={toUI(meta.gender)}
                      onValueChange={(v) => setMeta((m) => ({ ...m, gender: fromUI((v as GenderUI) || "K") }))}
                    >
                      <SelectTrigger id="gender" className="w-full">
                        <SelectValue placeholder="Wybierz płeć" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="M">Mężczyzna (M)</SelectItem>
                        <SelectItem value="K">Kobieta (K)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="birthDate">Data urodzenia</Label>
                    <Input
                      id="birthDate"
                      type="text"
                      inputMode="numeric"
                      placeholder="RRRR-MM-DD lub DD.MM.RRRR"
                      value={meta.birthDate}
                      onChange={(e) => setMeta((m) => ({ ...m, birthDate: e.target.value }))}
                    />
                    <p className="text-xs text-muted-foreground">
                      Datę badania ustawisz i zmienisz na ekranie WS.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maritalStatus">Stan cywilny</Label>
                    <Input
                      id="maritalStatus"
                      value={meta.maritalStatus}
                      onChange={(e) => setMeta((m) => ({ ...m, maritalStatus: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="occupation">Zawód</Label>
                    <Input
                      id="occupation"
                      value={meta.occupation}
                      onChange={(e) => setMeta((m) => ({ ...m, occupation: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="education">Wykształcenie</Label>
                    <Input
                      id="education"
                      value={meta.education}
                      onChange={(e) => setMeta((m) => ({ ...m, education: e.target.value }))}
                    />
                  </div>
                </div>
              </Section>
            </>
          )}

          {/* Krok 3 — podsumowanie (bez wieku/ExamDate, bo będą na ekranie WS) */}
          {step === 3 && (
            <div className="rounded-2xl border border-border bg-muted/10 p-4 md:p-5 shadow-sm">
              <div className="text-sm grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <div>
                    <span className="text-muted-foreground">Imię i nazwisko:</span>{" "}
                    <span className="font-medium">{meta.fullName || "—"}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Płeć:</span>{" "}
                    <span className="font-medium">{toUI(meta.gender)}</span>
                  </div>
                </div>
                <div>
                  <div>
                    <span className="text-muted-foreground">Data urodzenia:</span>{" "}
                    <span className="font-medium">{meta.birthDate || "—"}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Zawód • Wykształcenie:</span>{" "}
                    <span className="font-medium">
                      {meta.occupation || "—"} • {meta.education || "—"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Nawigacja dolna */}
          <div className="mt-2 flex justify-between">
            <Button type="button" variant="secondary" onClick={goPrev} disabled={step === 1}>
              Wstecz
            </Button>
            <Button type="button" onClick={goNext}>
              {step === 3 ? "Przejdź do wprowadzania WS" : "Dalej"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
