// app/dxmanager/src/views/waisr/WaisrInputView.tsx
import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { calculateAge } from "@/lib/date/calculateAge"
import { calculateWaisr, SUBTESTS_SLOWNE, SUBTESTS_BEZSLOWNE, ALL_SUBTESTS } from "@/logic/waisr/calculate"
import { Gender } from "@/logic/waisr/types"

// ———————————————————————————————————————————————
// Typy i stałe
// ———————————————————————————————————————————————

/** Minimalny rekord pacjenta w LS (patients-db) */
type Patient = {
  id: string
  firstName?: string
  lastName?: string
  pesel?: string
  patientCode?: string
  gender?: Gender
  birthDate?: string // YYYY-MM-DD
  maritalStatus?: string
  educationLevel?: string
  educationMajor?: string
  occupation?: string
  notes?: string
}

/** Kształt sesji WAIS-R w LS (waisr-data) */
type WaisrData = {
  patientId: string
  firstName: string
  lastName: string
  pesel: string
  patientCode: string
  gender: Gender
  birthDate: string // YYYY-MM-DD
  maritalStatus?: string
  educationLevel?: string
  educationMajor?: string
  occupation?: string
  notes?: string
  examDate: string // YYYY-MM-DD
  duration: string // min
  age: string // lata (floor)
  rawScores: Record<string, string>
}

const LS_WAISR_DATA = "waisr-data"
const LS_PATIENTS_DB = "patients-db"
const LS_WAISR_SNAPSHOTS = "waisr-snapshots"

// Skrócone przypisania typu Gender
const FEMALE: Gender = "F"
const MALE: Gender = "M"

// ─────────────────────────────────────────────────────────────────────────────
// Helpers: daty / wiek / LocalStorage
// ─────────────────────────────────────────────────────────────────────────────
// akceptuje "YYYY-MM-DD" i "DD.MM.YYYY" → zwraca "YYYY-MM-DD" lub null
function normalizeDateInput(value: string): string | null {
  const trimmed = (value || "").trim()
  if (!trimmed) return null
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed
  const m = trimmed.match(/^(\d{2})\.(\d{2})\.(\d{4})$/)
  if (m) return `${m[3]}-${m[2]}-${m[1]}`
  return null
}

// pełne lata (floor)
function yearsFloor(birthIso?: string | null, examIso?: string | null): number {
  if (!birthIso || !examIso) return 0
  const b = new Date(birthIso)
  const e = new Date(examIso)
  if (isNaN(b.getTime()) || isNaN(e.getTime())) return 0
  let y = e.getFullYear() - b.getFullYear()
  const beforeBirthday = e.getMonth() < b.getMonth() || (e.getMonth() === b.getMonth() && e.getDate() < b.getDate())
  if (beforeBirthday) y -= 1
  return Math.max(0, y)
}

function loadPatients(): Patient[] {
  try {
    const raw = localStorage.getItem(LS_PATIENTS_DB)
    return raw ? (JSON.parse(raw) as Patient[]) : []
  } catch {
    return []
  }
}
function savePatients(patients: Patient[]) {
  localStorage.setItem(LS_PATIENTS_DB, JSON.stringify(patients))
}
function loadWaisr(): Partial<WaisrData> | null {
  try {
    const raw = localStorage.getItem(LS_WAISR_DATA)
    return raw ? (JSON.parse(raw) as Partial<WaisrData>) : null
  } catch {
    return null
  }
}
function saveWaisr(data: Partial<WaisrData>) {
  localStorage.setItem(LS_WAISR_DATA, JSON.stringify(data))
}
function appendSnapshot(snapshot: any) {
  const now = new Date().toISOString()
  const prev = JSON.parse(localStorage.getItem(LS_WAISR_SNAPSHOTS) || "[]")
  prev.push({ createdAt: now, snapshot })
  localStorage.setItem(LS_WAISR_SNAPSHOTS, JSON.stringify(prev))
}

// ─────────────────────────────────────────────────────────────────────────────
// Formularz dodawania pacjenta (modal)
// ─────────────────────────────────────────────────────────────────────────────
function AddPatientForm({ onSubmit }: { onSubmit: (p: Patient) => void }) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [patientCode, setPatientCode] = useState("")
  const [pesel, setPesel] = useState("")
  const [gender, setGender] = useState<Gender>("F")
  const [birthDate, setBirthDate] = useState("") // YYYY-MM-DD lub DD.MM.YYYY
  const [maritalStatus, setMaritalStatus] = useState<string | undefined>(undefined)
  const [educationLevel, setEducationLevel] = useState<string | undefined>(undefined)
  const [educationMajor, setEducationMajor] = useState("")
  const [occupation, setOccupation] = useState("")
  const [notes, setNotes] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const birthIso = birthDate ? normalizeDateInput(birthDate) : null
    onSubmit({
      id: crypto.randomUUID(),
      firstName: firstName.trim() || undefined,
      lastName: lastName.trim() || undefined,
      patientCode: patientCode.trim() || undefined,
      pesel: pesel.trim() || undefined,
      gender,
      birthDate: birthIso || undefined,
      maritalStatus,
      educationLevel,
      educationMajor: educationMajor.trim() || undefined,
      occupation: occupation.trim() || undefined,
      notes: notes.trim() || undefined,
    })
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <Label>Imię</Label>
          <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div>
          <Label>Nazwisko</Label>
          <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div>
          <Label>Kod pacjenta (opcjonalnie)</Label>
          <Input value={patientCode} onChange={(e) => setPatientCode(e.target.value)} />
        </div>
        <div>
          <Label>PESEL (opcjonalnie)</Label>
          <Input value={pesel} onChange={(e) => setPesel(e.target.value)} />
        </div>
        <div>
          <Label>Płeć</Label>
          <Select value={gender} onValueChange={(v: Gender) => setGender(v)}>
            <SelectTrigger>
              <SelectValue placeholder="Wybierz płeć (M/K)" />
            </SelectTrigger>
            <SelectContent>
              {/* Uwaga: brak value="" w Radix Select */}
              <SelectItem value="F">K</SelectItem>
              <SelectItem value="M">M</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Data urodzenia (RRRR-MM-DD lub DD.MM.RRRR)</Label>
          <Input value={birthDate} onChange={(e) => setBirthDate(e.target.value)} placeholder="np. 1987-03-14" />
        </div>
        <div>
          <Label>Stan cywilny</Label>
          <Select value={maritalStatus} onValueChange={(v) => setMaritalStatus(v)}>
            <SelectTrigger>
              <SelectValue placeholder="Wybierz…" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Stanu wolnego</SelectItem>
              <SelectItem value="married">Żonaty / Zamężna</SelectItem>
              <SelectItem value="divorced">Rozwiedziony/a</SelectItem>
              <SelectItem value="widowed">Wdowiec / Wdowa</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Wykształcenie</Label>
          <Select value={educationLevel} onValueChange={(v) => setEducationLevel(v)}>
            <SelectTrigger>
              <SelectValue placeholder="Wybierz…" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="primary">Podstawowe</SelectItem>
              <SelectItem value="vocational">Zawodowe</SelectItem>
              <SelectItem value="secondary">Średnie</SelectItem>
              <SelectItem value="higher">Wyższe</SelectItem>
              <SelectItem value="postgraduate">Podyplomowe</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Kierunek (opcjonalnie)</Label>
          <Input value={educationMajor} onChange={(e) => setEducationMajor(e.target.value)} />
        </div>
        <div>
          <Label>Zawód (opcjonalnie)</Label>
          <Input value={occupation} onChange={(e) => setOccupation(e.target.value)} />
        </div>
        <div className="md:col-span-2">
          <Label>Notatki (opcjonalnie)</Label>
          <Input value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="submit">Zapisz pacjenta</Button>
      </div>
    </form>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Główny widok — Input (WS + metryczka + live WP)
// ─────────────────────────────────────────────────────────────────────────────
export default function WaisrInputView() {
  // Pacjenci + wybór
  const [patients, setPatients] = useState<Patient[]>(() => loadPatients())
  const [selectedPatientId, setSelectedPatientId] = useState<string | undefined>(undefined)
  const selectedPatient = patients.find((p) => p.id === selectedPatientId)

  // Sesja z LS
  const prev = loadWaisr() || {}
  const todayIso = new Date().toISOString().slice(0, 10)

  // Metryczka
  const [firstName, setFirstName] = useState(prev.firstName || "")
  const [lastName, setLastName] = useState(prev.lastName || "")
  const [pesel, setPesel] = useState(prev.pesel || "")
  const [patientCode, setPatientCode] = useState(prev.patientCode || "")
  const [gender, setGender] = useState<Gender>((prev.gender as Gender) || "F")
  const [birthDate, setBirthDate] = useState(prev.birthDate || "")
  const [examDate, setExamDate] = useState(prev.examDate || todayIso)
  const [duration, setDuration] = useState(prev.duration || "")

  // WS
  const [rawScores, setRawScores] = useState<Record<string, string>>(() => {
    const base: Record<string, string> = {}
    const prevRaw = prev.rawScores || {}
    for (const s of ALL_SUBTESTS) base[s] = prevRaw[s] ?? ""
    return base
  })

  // Zasilenie metryczki po wyborze pacjenta
  useEffect(() => {
    if (!selectedPatient) return
    setFirstName(selectedPatient.firstName || "")
    setLastName(selectedPatient.lastName || "")
    setPesel(selectedPatient.pesel || "")
    setPatientCode(selectedPatient.patientCode || "")
    setBirthDate(selectedPatient.birthDate || "")
    setGender((selectedPatient.gender as Gender) || "F")
    saveWaisr({
      ...(loadWaisr() || {}),
      patientId: selectedPatient.id,
      firstName: selectedPatient.firstName || "",
      lastName: selectedPatient.lastName || "",
      pesel: selectedPatient.pesel || "",
      patientCode: selectedPatient.patientCode || "",
      gender: (selectedPatient.gender as Gender) || "F",
      birthDate: selectedPatient.birthDate || "",
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPatientId])

  // Wiek
  const birthIso = useMemo(() => (birthDate ? normalizeDateInput(birthDate) : null), [birthDate])
  const examIso = useMemo(() => (examDate ? normalizeDateInput(examDate) : null), [examDate])
  const ageFloor = useMemo(() => yearsFloor(birthIso, examIso), [birthIso, examIso])
  const ageExact = useMemo(() => {
    if (!birthIso || !examIso) return null
    try {
      return calculateAge(new Date(birthIso), new Date(examIso)) as any
    } catch {
      return null
    }
  }, [birthIso, examIso])

  // Live WP
  const computed = useMemo(() => {
    try {
      const rawNum: Record<string, number> = {}
      for (const k of Object.keys(rawScores)) {
        const v = Number(rawScores[k])
        if (!isNaN(v)) rawNum[k] = v
      }
      return calculateWaisr({ age: ageFloor, gender, raw: rawNum })
    } catch {
      return null
    }
  }, [rawScores, ageFloor, gender]) as any

  // Filtrowanie pacjentów
  const [query, setQuery] = useState("")
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return patients
    return patients.filter((p) => {
      const idParts = [
        `${p.firstName || ""} ${p.lastName || ""}`.trim().toLowerCase(),
        (p.pesel || "").toLowerCase(),
        (p.patientCode || "").toLowerCase(),
      ]
      return idParts.some((s) => s.includes(q))
    })
  }, [patients, query])

  // Akcje
  function saveWorking() {
    const data: Partial<WaisrData> = {
      patientId: selectedPatientId || "",
      firstName,
      lastName,
      pesel,
      patientCode,
      gender,
      birthDate: birthIso || "",
      examDate: examIso || "",
      duration,
      age: String(ageFloor),
      rawScores,
    }
    saveWaisr(data)
  }
  function saveSnapshot() {
    appendSnapshot({
      savedAt: new Date().toISOString(),
      data: JSON.parse(localStorage.getItem(LS_WAISR_DATA) || "{}"),
      computed,
    })
  }
  function clearRaw() {
    const next: Record<string, string> = {}
    for (const s of ALL_SUBTESTS) next[s] = ""
    setRawScores(next)
    const ls = loadWaisr() || {}
    saveWaisr({ ...ls, rawScores: next })
  }
  function changePatientReset() {
    setSelectedPatientId(undefined)
    setFirstName("")
    setLastName("")
    setPesel("")
    setPatientCode("")
    setBirthDate("")
    setGender("F")
    saveWaisr({
      patientId: "",
      firstName: "",
      lastName: "",
      pesel: "",
      patientCode: "",
      gender: "F",
      birthDate: "",
      examDate: examIso || "",
      duration: "",
      age: "",
      rawScores,
    })
  }

  // ───────────────────────────────────────────────────────────────────────────
  // Widoki pomocnicze
  // ───────────────────────────────────────────────────────────────────────────
  function PatientSearchBar() {
    return (
      <div className="flex gap-2 items-center">
        <Input
          placeholder="Szukaj pacjenta: imię i nazwisko / PESEL / kod"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-[420px]"
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button>Dodaj pacjenta</Button>
          </DialogTrigger>
          <DialogContent className="max-w-[720px]">
            <DialogHeader>
              <DialogTitle>Dodaj pacjenta</DialogTitle>
            </DialogHeader>
            <AddPatientForm
              onSubmit={(p) => {
                const next = [p, ...patients]
                setPatients(next)
                savePatients(next)
                setSelectedPatientId(p.id)
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  function PatientsQuickList() {
    if (!filtered.length) return <div className="text-sm text-muted-foreground">Brak wyników…</div>
    return (
      <div className="flex gap-2 flex-wrap">
        {filtered.slice(0, 12).map((p) => {
          const label =
            [p.firstName, p.lastName].filter(Boolean).join(" ") || p.patientCode || p.pesel || "(bez identyfikatora)"
          return (
            <Button
              key={p.id}
              variant={p.id === selectedPatientId ? "default" : "secondary"}
              onClick={() => setSelectedPatientId(p.id)}
              className="h-8"
            >
              {label}
            </Button>
          )
        })}
      </div>
    )
  }

  // ───────────────────────────────────────────────────────────────────────────
  // Render
  // ───────────────────────────────────────────────────────────────────────────
  return (
    <div className="container mx-auto px-4 py-4 space-y-6">
      {/* Pasek: wyszukiwarka + akcje */}
      <div className="flex items-center justify-between gap-4">
        <PatientSearchBar />
        <div className="flex gap-2">
          <Button variant="secondary" onClick={saveWorking}>Zapis roboczy</Button>
          <Button variant="outline" onClick={saveSnapshot}>Zapis snapshot</Button>
          <Button variant="ghost" onClick={clearRaw}>Wyczyść WS</Button>
        </div>
      </div>

      {!selectedPatient && <PatientsQuickList />}

      {/* Metryczka kompaktowa */}
      <Card>
        <CardHeader className="py-3">
          <CardTitle className="text-base">Metryczka</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="md:col-span-2">
            <Label className="text-xs">Identyfikator</Label>
            <div className="text-sm">
              {(() => {
                const parts = [
                  [firstName, lastName].filter(Boolean).join(" ").trim() || undefined,
                  patientCode || undefined,
                  pesel || undefined,
                ].filter(Boolean)
                return parts.length ? parts.join(" • ") : <span className="text-muted-foreground">—</span>
              })()}
            </div>
          </div>

          <div>
            <Label className="text-xs">Płeć</Label>
            <Select value={gender} onValueChange={(v: Gender) => setGender(v)}>
              <SelectTrigger>
                <SelectValue placeholder="Wybierz płeć (M/K)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="F">K</SelectItem>
                <SelectItem value="M">M</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs">Data urodzenia</Label>
            <Input value={birthDate} onChange={(e) => setBirthDate(e.target.value)} placeholder="RRRR-MM-DD lub DD.MM.RRRR" />
          </div>

          <div>
            <Label className="text-xs">Wiek (co do dnia)</Label>
            <div className="text-sm">
              {ageExact ? (
                <>
                  {ageExact.years} lat, {ageExact.months} mies., {ageExact.days} dni
                </>
              ) : (
                <span className="text-muted-foreground">—</span>
              )}
            </div>
          </div>

          <div>
            <Label className="text-xs">Data badania</Label>
            <Input value={examDate} onChange={(e) => setExamDate(e.target.value)} placeholder="RRRR-MM-DD lub DD.MM.RRRR" />
          </div>

          <div>
            <Label className="text-xs">Czas badania (min)</Label>
            <Input value={duration} onChange={(e) => setDuration(e.target.value.replace(/[^\d]/g, ""))} inputMode="numeric" />
          </div>

          <div className="md:col-span-4 flex items-center gap-2">
            <Button variant="ghost" onClick={changePatientReset} className="h-8">Zmień pacjenta</Button>
            <Separator orientation="vertical" className="h-6" />
            <Button variant="outline" onClick={clearRaw} className="h-8">Wyczyść WS</Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabela WS + live WP */}
      <Card>
        <CardHeader className="py-3">
          <CardTitle className="text-base">Wyniki surowe (WS) i przeliczenie (WP)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <ScoresTable
            title="Testy słowne"
            rows={SUBTESTS_SLOWNE}
            rawScores={rawScores}
            onChangeRaw={(name, val) => {
              const next = { ...rawScores, [name]: val }
              setRawScores(next)
              const prevLS = loadWaisr() || {}
              saveWaisr({ ...prevLS, rawScores: next })
            }}
            getWp={(name) => (computed ? computed.bySubtest?.[name]?.wp ?? null : null)}
          />
          <Separator />
          <ScoresTable
            title="Testy bezsłowne"
            rows={SUBTESTS_BEZSLOWNE}
            rawScores={rawScores}
            onChangeRaw={(name, val) => {
              const next = { ...rawScores, [name]: val }
              setRawScores(next)
              const prevLS = loadWaisr() || {}
              saveWaisr({ ...prevLS, rawScores: next })
            }}
            getWp={(name) => (computed ? computed.bySubtest?.[name]?.wp ?? null : null)}
          />

          {/* Podsumowania */}
          <section className="text-sm text-muted-foreground">
            {computed ? (
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                <div>
                  <span className="font-medium text-foreground">Wiek (lata, floor):</span> {ageFloor}
                </div>
                <div>
                  <span className="font-medium text-foreground">Grupa wieku:</span> {computed.ageGroup}
                </div>
                <div>
                  <span className="font-medium text-foreground">Suma WP – słowne:</span> {computed.sums?.slowna ?? "—"}
                </div>
                <div>
                  <span className="font-medium text-foreground">Suma WP – bezsłowne:</span> {computed.sums?.bezslowna ?? "—"}
                </div>
                <div>
                  <span className="font-medium text-foreground">Suma WP – pełna:</span> {computed.sums?.pelna ?? "—"}
                </div>
              </div>
            ) : (
              <div>Uzupełnij WS i metryczkę, aby zobaczyć przeliczenia WP.</div>
            )}
          </section>
        </CardContent>
      </Card>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Tabela wyników
// ─────────────────────────────────────────────────────────────────────────────
function ScoresTable({
  title,
  rows,
  rawScores,
  onChangeRaw,
  getWp,
}: {
  title: string
  rows: readonly string[]
  rawScores: Record<string, string>
  onChangeRaw: (name: string, value: string) => void
  getWp: (name: string) => number | null
}) {
  const colWidths = ["52%", "12%", "12%", "12%", "12%"]
  const tableClass = "w-full table-fixed text-[12px] tabular-nums border-collapse [&_td]:py-1.5 [&_th]:py-1.5 [&_td]:px-2 [&_th]:px-2"

  return (
    <div className="space-y-3">
      <div className="font-medium">{title}</div>
      <div className="rounded-md border overflow-hidden">
        <table className={tableClass}>
          <colgroup>
            {colWidths.map((w, i) => (
              <col key={i} style={{ width: w }} />
            ))}
          </colgroup>
          <thead className="bg-muted/50 text-left">
            <tr className="border-b border-border">
              <th>Podtest</th>
              <th className="text-center">WS</th>
              <th className="text-center text-muted-foreground/70">WP−SD</th>
              <th className="text-center">WP</th>
              <th className="text-center text-muted-foreground/70">WP+SD</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((name) => {
              const wp = getWp(name)
              return (
                <tr key={name} className="border-b last:border-b-0 border-border">
                  <td className="text-left">{name}</td>
                  <td>
                    <Input
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={rawScores[name] ?? ""}
                      onChange={(e) => onChangeRaw(name, e.target.value.replace(/[^\d]/g, ""))}
                      className="h-7 text-[12px]"
                    />
                  </td>
                  {/* SD jeszcze niezaimplementowane → placeholder "—" */}
                  <td className="text-center text-muted-foreground/70">—</td>
                  <td className="text-center font-medium">{wp ?? "—"}</td>
                  <td className="text-center text-muted-foreground/70">—</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
