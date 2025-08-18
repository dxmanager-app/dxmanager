import React, { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { calculateWaisr } from "@/logic/waisr"
import { calculateAge, formatAgeString } from "@/lib/date/calculateAge"

/**
 * WaisrInputView — tryb uproszczony (WS), BEZ kreatora.
 * - Pasek: wyszukaj pacjenta lub „Dodaj pacjenta” (modal).
 * - Identyfikator = (Imię + Nazwisko) i/lub Kod pacjenta. PESEL opcjonalny.
 * - W formularzu: rozwijane „Stan cywilny” i „Wykształcenie” (obok „Kierunek”), pole „Uwagi”.
 * - Edytowalne na tym ekranie: data badania, czas wypełniania.
 * - Wprowadzamy WS; po prawej podgląd WP (WP−SD • WP • WP+SD).
 * - „Oblicz” zapisuje do localStorage("waisr-data") i przechodzi do /tests/waisr/results.
 *
 * ✅ Naprawa błędu Radix Select:
 *   - ŻADEN <SelectItem> nie ma value=""
 *   - Gdy brak wyboru, przekazujemy value={undefined} i używamy placeholderów.
 */

type RawScores = Record<string, string>

type EducationLevel =
  | "podstawowe"
  | "gimnazjalne"
  | "zsz"
  | "srednie_ogolne"
  | "srednie_techniczne"
  | "policealne"
  | "wyzsze_inz"
  | "wyzsze_mgr"
  | "podyplomowe"
  | "doktoranckie"

type MaritalStatus =
  | "single"
  | "married"
  | "partner"
  | "separated"
  | "divorced"
  | "widowed"

type Patient = {
  id: string
  firstName?: string
  lastName?: string
  pesel?: string
  patientCode?: string
  gender: "M" | "F"
  birthDateISO: string // YYYY-MM-DD
  maritalStatus?: MaritalStatus
  educationLevel?: EducationLevel
  educationMajor?: string // Kierunek
  occupation?: string
  address?: string
  notes?: string
}

const VERBAL: ReadonlyArray<string> = [
  "Wiadomości",
  "Powtarzanie Cyfr",
  "Słownik",
  "Arytmetyka",
  "Rozumienie",
  "Podobieństwa",
]

const PERFORMANCE: ReadonlyArray<string> = [
  "Braki w Obrazkach",
  "Porządkowanie Obrazków",
  "Klocki",
  "Układanki",
  "Symbole Cyfr",
]

// ——— helpers
const todayISO = () => new Date().toISOString().slice(0, 10)

function toISOFlexible(s: string): string | "" {
  const v = (s || "").trim()
  if (!v) return ""
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v)
  if (iso) return `${iso[1]}-${iso[2]}-${iso[3]}`
  const pl = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(v)
  if (pl) return `${pl[3]}-${pl[2]}-${pl[1]}`
  return ""
}

function primaryIdentifier(p: Patient | null): string {
  if (!p) return ""
  const name = [p.firstName, p.lastName].filter(Boolean).join(" ").trim()
  const parts: string[] = []
  if (name) parts.push(name)
  if (p.patientCode) parts.push(`Kod: ${p.patientCode}`)
  if (p.pesel) parts.push(`PESEL: ${p.pesel}`)
  return parts.join(" • ")
}

function uid() {
  return Math.random().toString(36).slice(2, 10)
}

const MARITAL_LABELS: Record<MaritalStatus, string> = {
  single: "Kawaler / Panna",
  married: "Żonaty / Zamężna",
  partner: "Wolny z partnerem/partnerką",
  separated: "Separacja",
  divorced: "Rozwiedziony / Rozwiedziona",
  widowed: "Wdowiec / Wdowa",
}

const EDUCATION_LABELS: Record<EducationLevel, string> = {
  podstawowe: "Podstawowe",
  gimnazjalne: "Gimnazjalne",
  zsz: "Zasadnicze zawodowe",
  srednie_ogolne: "Średnie ogólnokształcące",
  srednie_techniczne: "Średnie techniczne/zawodowe",
  policealne: "Policealne",
  wyzsze_inz: "Wyższe licencjackie / inż.",
  wyzsze_mgr: "Wyższe magisterskie",
  podyplomowe: "Podyplomowe",
  doktoranckie: "Doktoranckie",
}

export default function WaisrInputView() {
  const navigate = useNavigate()

  // —— „baza” pacjentów (localStorage)
  const [patients, setPatients] = useState<Patient[]>([])
  useEffect(() => {
    try {
      const raw = localStorage.getItem("patients-db")
      setPatients(raw ? JSON.parse(raw) : [])
    } catch {
      setPatients([])
    }
  }, [])

  // —— wybór pacjenta
  const [query, setQuery] = useState("")
  const [selectedId, setSelectedId] = useState<string | null>(null)

  // —— edytowane na tym ekranie
  const [examDate, setExamDate] = useState<string>(todayISO())
  const [durationMin, setDurationMin] = useState<string>("")

  // —— WS
  const [rawScores, setRawScores] = useState<RawScores>(() => {
    try {
      const raw = localStorage.getItem("waisr-data")
      const parsed = raw ? JSON.parse(raw) : null
      return parsed?.rawScores ?? {}
    } catch {
      return {}
    }
  })

  // —— prefill z ewentualnych poprzednich danych testu
  useEffect(() => {
    try {
      const raw = localStorage.getItem("waisr-data")
      if (!raw) return
      const d = JSON.parse(raw)
      if (d?.patientId) setSelectedId(d.patientId)
      if (typeof d?.examDate === "string") setExamDate(d.examDate)
      if (typeof d?.duration === "string") setDurationMin(d.duration)
    } catch {
      /* ignore */
    }
  }, [])

  const selectedPatient = useMemo(
    () => patients.find((p) => p.id === selectedId) || null,
    [patients, selectedId]
  )

  // —— lista dopasowań do wyszukiwarki (po 1 znaku)
  const matches = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return patients
      .filter((p) => {
        const name = `${p.firstName || ""} ${p.lastName || ""}`.toLowerCase()
        return (
          name.includes(q) ||
          (p.pesel || "").toLowerCase().includes(q) ||
          (p.patientCode || "").toLowerCase().includes(q)
        )
      })
      .slice(0, 8)
  }, [query, patients])

  // —— wiek (lata) dla kalkulatora
  const ageYears: number | null = useMemo(() => {
    if (!selectedPatient?.birthDateISO || !examDate) return null
    try {
      const a = calculateAge(new Date(selectedPatient.birthDateISO), new Date(examDate))
      return a.years // wiek w latach (zaokrąglony w dół)
    } catch {
      return null
    }
  }, [selectedPatient, examDate])

  // —— WP/SD „na żywo”
  const liveCalc = useMemo(() => {
    if (!selectedPatient || ageYears == null) return null
    try {
      return (calculateWaisr as any)({
        age: ageYears,
        gender: selectedPatient.gender,
        rawScores,
      })
    } catch {
      return null
    }
  }, [selectedPatient, ageYears, rawScores])

  const readWpSd = (subtest: string): { wp?: number; sd?: number } => {
    const src = (liveCalc as any) || {}
    const direct = src[subtest]
    if (direct && typeof direct === "object") return { wp: direct.wp, sd: direct.sd }
    const nested = src.subtests?.[subtest]
    if (nested && typeof nested === "object") return { wp: nested.wp, sd: nested.sd }
    return {}
  }

  // —— obsługa WS
  const updateWS = (name: string, value: string) =>
    setRawScores((prev) => ({ ...prev, [name]: value }))

  const clearWS = () => setRawScores({})

  // —— zapis i przejście
  const onCalculateAndGo = () => {
    if (!selectedPatient) {
      alert("Wybierz pacjenta lub dodaj nowego.")
      return
    }
    if (!toISOFlexible(examDate) && !/^\d{4}-\d{2}-\d{2}$/.test(examDate)) {
      alert("Podaj poprawną datę badania (RRRR-MM-DD lub DD.MM.RRRR).")
      return
    }
    const examISO = toISOFlexible(examDate) || examDate
    const payload = {
      patientId: selectedPatient.id,
      firstName: selectedPatient.firstName || "",
      lastName: selectedPatient.lastName || "",
      pesel: selectedPatient.pesel || "",
      patientCode: selectedPatient.patientCode || "",
      gender: selectedPatient.gender,
      birthDate: selectedPatient.birthDateISO,
      maritalStatus: selectedPatient.maritalStatus || undefined,
      educationLevel: selectedPatient.educationLevel || undefined,
      educationMajor: selectedPatient.educationMajor || "",
      occupation: selectedPatient.occupation || "",
      notes: selectedPatient.notes || "",
      examDate: examISO,
      duration: durationMin,
      age: ageYears != null ? String(ageYears) : "",
      rawScores,
    }
    localStorage.setItem("waisr-data", JSON.stringify(payload))
    navigate("/tests/waisr/results")
  }

  // --------------------------------------------------------------------------------
  // Modal „Dodaj pacjenta”
  // --------------------------------------------------------------------------------
  const [openModal, setOpenModal] = useState(false)
  const [form, setForm] = useState<Omit<Patient, "id">>({
    firstName: "",
    lastName: "",
    pesel: "",
    patientCode: "",
    gender: "F",
    birthDateISO: "",
    maritalStatus: undefined,
    educationLevel: undefined,
    educationMajor: "",
    occupation: "",
    address: "",
    notes: "",
  })

  const modalValidIdentifier = useMemo(() => {
    const name = `${form.firstName || ""} ${form.lastName || ""}`.trim()
    return Boolean(name || form.pesel || form.patientCode)
  }, [form])

  const saveNewPatient = () => {
    if (!modalValidIdentifier) {
      alert("Podaj przynajmniej jeden identyfikator: Imię i nazwisko LUB Kod pacjenta (PESEL opcjonalny).")
      return
    }
    const bISO = toISOFlexible(form.birthDateISO) || form.birthDateISO
    if (!/^\d{4}-\d{2}-\d{2}$/.test(bISO)) {
      alert("Podaj poprawną datę urodzenia (RRRR-MM-DD lub DD.MM.RRRR).")
      return
    }
    const p: Patient = { id: uid(), ...form, birthDateISO: bISO }
    const next = [p, ...patients]
    setPatients(next)
    localStorage.setItem("patients-db", JSON.stringify(next))
    setSelectedId(p.id) // od razu wybierz nowego
    setOpenModal(false)
  }

  // --------------------------------------------------------------------------------

  return (
    <div className="container mx-auto max-w-[860px] p-4 space-y-6">
      {/* Pasek wyboru pacjenta */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Pacjent</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Input
              placeholder="Szukaj po imieniu i nazwisku, PESEL lub kodzie…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1"
            />
            <Button variant="secondary" onClick={() => setOpenModal(true)}>
              Dodaj pacjenta
            </Button>
          </div>

          {/* Podpowiedzi wyników wyszukiwania */}
          {query.trim() && (
            <div className="border rounded-md divide-y max-h-64 overflow-auto">
              {matches.length === 0 ? (
                <div className="p-2 text-sm text-muted-foreground">Brak wyników</div>
              ) : (
                matches.map((p) => (
                  <button
                    key={p.id}
                    className={`w-full text-left p-2 text-sm hover:bg-accent ${
                      p.id === selectedId ? "bg-accent/60" : ""
                    }`}
                    onClick={() => {
                      setSelectedId(p.id)
                      setQuery("")
                    }}
                  >
                    {primaryIdentifier(p)}
                  </button>
                ))
              )}
            </div>
          )}

          {/* Wybrany pacjent — mała metryczka (readonly) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-muted-foreground">Wybrany: </span>
              <span className="font-medium">{primaryIdentifier(selectedPatient) || "—"}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Płeć: </span>
              <span className="font-medium">{selectedPatient?.gender ?? "—"}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Data urodzenia: </span>
              <span className="font-medium">{selectedPatient?.birthDateISO ?? "—"}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Wiek w dniu badania: </span>
              <span className="font-medium">
                {selectedPatient?.birthDateISO
                  ? formatAgeString(calculateAge(new Date(selectedPatient.birthDateISO), new Date(examDate)))
                  : "—"}
              </span>
            </div>
            {selectedPatient?.educationLevel && (
              <div className="md:col-span-2">
                <span className="text-muted-foreground">Wykształcenie: </span>
                <span className="font-medium">
                  {EDUCATION_LABELS[selectedPatient.educationLevel]}
                  {selectedPatient.educationMajor ? ` — ${selectedPatient.educationMajor}` : ""}
                </span>
              </div>
            )}
            {selectedPatient?.maritalStatus && (
              <div className="md:col-span-2">
                <span className="text-muted-foreground">Stan cywilny: </span>
                <span className="font-medium">{MARITAL_LABELS[selectedPatient.maritalStatus]}</span>
              </div>
            )}
            {selectedPatient?.occupation && (
              <div className="md:col-span-2">
                <span className="text-muted-foreground">Zawód: </span>
                <span className="font-medium">{selectedPatient.occupation}</span>
              </div>
            )}
            {selectedPatient?.notes && (
              <div className="md:col-span-2">
                <span className="text-muted-foreground">Uwagi: </span>
                <span className="font-medium">{selectedPatient.notes}</span>
              </div>
            )}
          </div>

          <Separator />

          {/* Edytowalne tylko tu: data badania + czas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Data badania</Label>
              <Input
                placeholder="RRRR-MM-DD lub DD.MM.RRRR"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Czas wypełniania (min)</Label>
              <Input
                type="number"
                inputMode="numeric"
                min={0}
                step={1}
                placeholder="np. 45"
                value={durationMin}
                onChange={(e) => setDurationMin(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              {selectedPatient && (
                <Button variant="outline" className="w-full" onClick={() => setSelectedId(null)}>
                  Zmień pacjenta
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sekcja: Testy słowne */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Testy słowne</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {VERBAL.map((name) => {
            const { wp, sd } = readWpSd(name)
            const left = typeof wp === "number" && typeof sd === "number" ? wp - sd : undefined
            const right = typeof wp === "number" && typeof sd === "number" ? wp + sd : undefined
            return (
              <div key={name} className="grid grid-cols-12 items-center gap-2">
                <div className="col-span-6 sm:col-span-5 text-sm">{name}</div>
                <div className="col-span-3 sm:col-span-3">
                  <Input
                    value={rawScores[name] || ""}
                    onChange={(e) => updateWS(name, e.target.value)}
                    className="font-semibold bg-muted/30 h-8 text-sm"
                    inputMode="numeric"
                  />
                </div>
                <div className="col-span-3 sm:col-span-4 text-xs sm:text-sm text-muted-foreground tabular-nums">
                  {ageYears == null ? (
                    <span>—</span>
                  ) : (
                    <span>
                      <span className="opacity-50">{left ?? "—"}</span>{" "}
                      <span className="font-semibold text-foreground">{wp ?? "—"}</span>{" "}
                      <span className="opacity-50">{right ?? "—"}</span>
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Sekcja: Testy bezsłowne */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Testy bezsłowne</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {PERFORMANCE.map((name) => {
            const { wp, sd } = readWpSd(name)
            const left = typeof wp === "number" && typeof sd === "number" ? wp - sd : undefined
            const right = typeof wp === "number" && typeof sd === "number" ? wp + sd : undefined
            return (
              <div key={name} className="grid grid-cols-12 items-center gap-2">
                <div className="col-span-6 sm:col-span-5 text-sm">{name}</div>
                <div className="col-span-3 sm:col-span-3">
                  <Input
                    value={rawScores[name] || ""}
                    onChange={(e) => updateWS(name, e.target.value)}
                    className="font-semibold bg-muted/30 h-8 text-sm"
                    inputMode="numeric"
                  />
                </div>
                <div className="col-span-3 sm:col-span-4 text-xs sm:text-sm text-muted-foreground tabular-nums">
                  {ageYears == null ? (
                    <span>—</span>
                  ) : (
                    <span>
                      <span className="opacity-50">{left ?? "—"}</span>{" "}
                      <span className="font-semibold text-foreground">{wp ?? "—"}</span>{" "}
                      <span className="opacity-50">{right ?? "—"}</span>
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Przyciski */}
      <div className="flex justify-between">
        <Button variant="secondary" onClick={clearWS}>
          Wyczyść WS
        </Button>
        <Button onClick={onCalculateAndGo}>Oblicz</Button>
      </div>

      {/* Modal: Dodaj pacjenta */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="sm:max-w-[760px]">
          <DialogHeader>
            <DialogTitle>Dodaj pacjenta</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Identyfikatory */}
            <div className="space-y-1">
              <Label className="text-xs">Imię</Label>
              <Input
                value={form.firstName}
                onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Nazwisko</Label>
              <Input
                value={form.lastName}
                onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Kod pacjenta (alternatywa lub dodatek)</Label>
              <Input
                value={form.patientCode}
                onChange={(e) => setForm((f) => ({ ...f, patientCode: e.target.value }))}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">PESEL (opcjonalnie)</Label>
              <Input
                value={form.pesel}
                onChange={(e) => setForm((f) => ({ ...f, pesel: e.target.value }))}
              />
            </div>

            {/* Płeć / data ur. */}
            <div className="space-y-1">
              <Label className="text-xs">Płeć</Label>
              <Select
                value={form.gender}
                onValueChange={(v) => setForm((f) => ({ ...f, gender: v as "M" | "F" }))}
              >
                <SelectTrigger><SelectValue placeholder="Wybierz" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="M">Mężczyzna</SelectItem>
                  <SelectItem value="F">Kobieta</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label className="text-xs">Data urodzenia</Label>
              <Input
                placeholder="RRRR-MM-DD lub DD.MM.RRRR"
                value={form.birthDateISO}
                onChange={(e) => setForm((f) => ({ ...f, birthDateISO: e.target.value }))}
              />
            </div>

            {/* Stan cywilny */}
            <div className="space-y-1">
              <Label className="text-xs">Stan cywilny</Label>
              <Select
                value={form.maritalStatus ?? undefined}
                onValueChange={(v) => setForm((f) => ({ ...f, maritalStatus: v as MaritalStatus }))}
              >
                <SelectTrigger><SelectValue placeholder="Wybierz stan cywilny" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">{MARITAL_LABELS.single}</SelectItem>
                  <SelectItem value="married">{MARITAL_LABELS.married}</SelectItem>
                  <SelectItem value="partner">{MARITAL_LABELS.partner}</SelectItem>
                  <SelectItem value="separated">{MARITAL_LABELS.separated}</SelectItem>
                  <SelectItem value="divorced">{MARITAL_LABELS.divorced}</SelectItem>
                  <SelectItem value="widowed">{MARITAL_LABELS.widowed}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Wykształcenie + kierunek */}
            <div className="space-y-1">
              <Label className="text-xs">Wykształcenie</Label>
              <Select
                value={form.educationLevel ?? undefined}
                onValueChange={(v) => setForm((f) => ({ ...f, educationLevel: v as EducationLevel }))}
              >
                <SelectTrigger><SelectValue placeholder="Wybierz poziom" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="podstawowe">{EDUCATION_LABELS.podstawowe}</SelectItem>
                  <SelectItem value="gimnazjalne">{EDUCATION_LABELS.gimnazjalne}</SelectItem>
                  <SelectItem value="zsz">{EDUCATION_LABELS.zsz}</SelectItem>
                  <SelectItem value="srednie_ogolne">{EDUCATION_LABELS.srednie_ogolne}</SelectItem>
                  <SelectItem value="srednie_techniczne">{EDUCATION_LABELS.srednie_techniczne}</SelectItem>
                  <SelectItem value="policealne">{EDUCATION_LABELS.policealne}</SelectItem>
                  <SelectItem value="wyzsze_inz">{EDUCATION_LABELS.wyzsze_inz}</SelectItem>
                  <SelectItem value="wyzsze_mgr">{EDUCATION_LABELS.wyzsze_mgr}</SelectItem>
                  <SelectItem value="podyplomowe">{EDUCATION_LABELS.podyplomowe}</SelectItem>
                  <SelectItem value="doktoranckie">{EDUCATION_LABELS.doktoranckie}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Kierunek (jeśli dotyczy)</Label>
              <Input
                value={form.educationMajor}
                onChange={(e) => setForm((f) => ({ ...f, educationMajor: e.target.value }))}
              />
            </div>

            {/* Zawód / Uwagi */}
            <div className="space-y-1 md:col-span-2">
              <Label className="text-xs">Zawód (opcjonalnie)</Label>
              <Input
                value={form.occupation}
                onChange={(e) => setForm((f) => ({ ...f, occupation: e.target.value }))}
              />
            </div>

            <div className="space-y-1 md:col-span-2">
              <Label className="text-xs">Uwagi (opcjonalnie)</Label>
              <textarea
                rows={3}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={form.notes}
                onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="secondary" onClick={() => setOpenModal(false)}>
              Anuluj
            </Button>
            <Button onClick={saveNewPatient}>Zapisz</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
