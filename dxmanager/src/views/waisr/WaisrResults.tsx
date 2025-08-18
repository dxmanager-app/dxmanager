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
import { calculateWaisr } from "@/logic/waisr/calculate"
import { calculateAge, formatAgeString } from "@/lib/date/calculateAge"

// ===============================
// Kontekst
// - Usuwamy kreator.
// - Ten widok to teraz: WYBÓR/DO-DODANIA PACJENTA + METRYCZKA + EDYCJA WS + PODGLĄD WP (WP−SD • WP • WP+SD) + ZAPIS.
// - WS wprowadzamy bezpośrednio tutaj (zamiast tylko wyświetlać).
// ===============================

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
  educationMajor?: string
  occupation?: string
  address?: string
  notes?: string
}

const VERBAL: string[] = [
  "Wiadomości",
  "Powtarzanie Cyfr",
  "Słownik",
  "Arytmetyka",
  "Rozumienie",
  "Podobieństwa",
]

const PERFORMANCE: string[] = [
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

function primaryIdentifier(p: Patient | null | undefined) {
  if (!p) return ""
  const name = [p.firstName, p.lastName].filter(Boolean).join(" ").trim()
  const parts: string[] = []
  if (name) parts.push(name)
  if (p.patientCode) parts.push(`Kod: ${p.patientCode}`)
  if (p.pesel) parts.push(`PESEL: ${p.pesel}`)
  return parts.join(" • ")
}

function renderWP(wp?: number, sd?: number) {
  if (typeof wp !== "number") {
    return (
      <>
        <span className="opacity-50 tabular-nums">—</span>
        <span className="font-semibold tabular-nums text-foreground text-sm">—</span>
        <span className="opacity-50 tabular-nums">—</span>
      </>
    )
  }
  const left = typeof sd === "number" ? wp - sd : undefined
  const right = typeof sd === "number" ? wp + sd : undefined
  return (
    <>
      <span className="opacity-50 tabular-nums">{typeof left === "number" ? left : "—"}</span>
      <span className="font-semibold tabular-nums text-foreground text-sm">{wp}</span>
      <span className="opacity-50 tabular-nums">{typeof right === "number" ? right : "—"}</span>
    </>
  )
}

export default function WaisrResults() {
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

  // —— stan pracy (wcześniej używany klucz: "waisr-data")
  const [ls, setLs] = useState<any | null>(null)
  useEffect(() => {
    try {
      const raw = localStorage.getItem("waisr-data")
      setLs(raw ? JSON.parse(raw) : null)
    } catch {
      setLs(null)
    }
  }, [])

  // —— wybór pacjenta
  const [query, setQuery] = useState("")
  const [selectedId, setSelectedId] = useState<string | null>(ls?.patientId ?? null)
  const selectedPatient = useMemo(
    () => patients.find((p) => p.id === selectedId) || null,
    [patients, selectedId]
  )

  // —— data badania + czas (trzymamy tutaj)
  const [examDate, setExamDate] = useState<string>(ls?.examDate || todayISO())
  const [durationMin, setDurationMin] = useState<string>(ls?.duration || "")

  // —— WS (edytujemy tutaj!)
  const [rawScores, setRawScores] = useState<RawScores>(() => (ls?.rawScores ?? {}))

  // —— lista dopasowań (live)
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

  // —— wiek (dla norm): lata z daty ur. i daty badania
  const ageYears: number | null = useMemo(() => {
    if (!selectedPatient?.birthDateISO || !examDate) return null
    try {
      const a = calculateAge(new Date(selectedPatient.birthDateISO), new Date(toISOFlexible(examDate) || examDate))
      return a.years
    } catch {
      return null
    }
  }, [selectedPatient, examDate])

  // —— kalkulacja „na żywo”
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

  // —— zapis bieżącej pracy do "waisr-data" (stan roboczy)
  const persistWork = () => {
    const payload = {
      patientId: selectedPatient?.id ?? "",
      firstName: selectedPatient?.firstName ?? "",
      lastName: selectedPatient?.lastName ?? "",
      pesel: selectedPatient?.pesel ?? "",
      patientCode: selectedPatient?.patientCode ?? "",
      gender: selectedPatient?.gender ?? "",
      birthDate: selectedPatient?.birthDateISO ?? "",
      maritalStatus: selectedPatient?.maritalStatus,
      educationLevel: selectedPatient?.educationLevel,
      educationMajor: selectedPatient?.educationMajor ?? "",
      occupation: selectedPatient?.occupation ?? "",
      notes: selectedPatient?.notes ?? "",
      examDate,
      duration: durationMin,
      age: ageYears != null ? String(ageYears) : "",
      rawScores,
    }
    localStorage.setItem("waisr-data", JSON.stringify(payload))
    setLs(payload)
  }

  // —— „Zapis wyników” (snapshot lista)
  const saveSnapshot = () => {
    try {
      const listRaw = localStorage.getItem("waisr-snapshots")
      const list: any[] = listRaw ? JSON.parse(listRaw) : []
      list.unshift({
        savedAt: new Date().toISOString(),
        meta: {
          identifier: primaryIdentifier(selectedPatient),
          gender: selectedPatient?.gender ?? "",
          birthDate: selectedPatient?.birthDateISO ?? "",
          examDate,
          ageYears,
          exactAgeLabel:
            selectedPatient?.birthDateISO
              ? formatAgeString(calculateAge(new Date(selectedPatient.birthDateISO), new Date(toISOFlexible(examDate) || examDate)))
              : "",
          duration: durationMin,
        },
        rawScores,
        calc: liveCalc,
      })
      localStorage.setItem("waisr-snapshots", JSON.stringify(list))
    } catch {}
  }

  // —— modal „Dodaj pacjenta” (jak w poprzednim widoku)
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

  function toISOBirth(s: string) {
    return toISOFlexible(s) || s
  }

  const saveNewPatient = () => {
    if (!modalValidIdentifier) {
      alert("Podaj przynajmniej jeden identyfikator: Imię i nazwisko LUB Kod pacjenta (PESEL opcjonalny).")
      return
    }
    const bISO = toISOBirth(form.birthDateISO)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(bISO)) {
      alert("Podaj poprawną datę urodzenia (RRRR-MM-DD lub DD.MM.RRRR).")
      return
    }
    const p: Patient = { id: uid(), ...form, birthDateISO: bISO }
    const next = [p, ...patients]
    setPatients(next)
    localStorage.setItem("patients-db", JSON.stringify(next))
    setSelectedId(p.id)
    setOpenModal(false)
  }

  const noPatient = !selectedPatient

  return (
    <div className="mx-auto w-full max-w-[760px] p-4 space-y-6">
      {/* METRYCZKA + WYBÓR PACJENTA (kompakt) */}
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

          {query.trim() && (
            <div className="border rounded-md divide-y max-h-56 overflow-auto">
              {matches.length === 0 ? (
                <div className="p-2 text-sm text-muted-foreground">Brak wyników</div>
              ) : (
                matches.map((p) => (
                  <button
                    key={p.id}
                    className={`w-full text-left p-2 text-sm hover:bg-accent ${p.id === selectedId ? "bg-accent/60" : ""}`}
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
              <span className="text-muted-foreground">Data ur.: </span>
              <span className="font-medium">{selectedPatient?.birthDateISO ?? "—"}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Wiek w dniu badania: </span>
              <span className="font-medium">
                {selectedPatient?.birthDateISO
                  ? formatAgeString(
                      calculateAge(
                        new Date(selectedPatient.birthDateISO),
                        new Date(toISOFlexible(examDate) || examDate)
                      )
                    )
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
                <span className="font-medium whitespace-pre-wrap">{selectedPatient.notes}</span>
              </div>
            )}
          </div>

          <Separator />

          {/* Edytowalne tylko tu: data badania + czas + zmiana pacjenta */}
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

      {/* TABELA — EDYCJA WS + PODGLĄD WP */}
      <Card>
        <CardHeader className="py-3">
          <CardTitle className="text-sm font-semibold tracking-tight">Wyniki — wprowadzanie WS i podgląd WP</CardTitle>
        </CardHeader>
        <CardContent className="py-3 space-y-4">
          {/* Słowne */}
          <section>
            <div className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              Testy słowne
            </div>
            <div className="grid grid-cols-[170px_64px_116px] items-center text-[11px] text-muted-foreground border-b pb-1">
              <div className="pl-2">Test</div>
              <div className="text-right pr-2">WS</div>
              <div className="grid grid-cols-[36px_44px_36px] gap-0.5">
                <span className="text-center">WP−SD</span>
                <span className="text-center font-semibold text-foreground">WP</span>
                <span className="text-center">WP+SD</span>
              </div>
            </div>
            <div className="divide-y">
              {VERBAL.map((name) => {
                const { wp, sd } = readWpSd(name)
                return (
                  <div key={name} className="grid grid-cols-[170px_64px_116px] items-center py-1.5 text-[12px]">
                    <div className="pl-2 pr-2 truncate">{name}</div>
                    <div className="pr-2">
                      <Input
                        value={rawScores[name] || ""}
                        onChange={(e) => updateWS(name, e.target.value)}
                        className="h-8 text-right font-semibold bg-muted/30 tabular-nums"
                        inputMode="numeric"
                      />
                    </div>
                    <div className="grid grid-cols-[36px_44px_36px] items-center text-center tabular-nums">
                      {renderWP(wp, sd)}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          <Separator className="my-1" />

          {/* Bezsłowne */}
          <section>
            <div className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              Testy bezsłowne
            </div>
            <div className="grid grid-cols-[170px_64px_116px] items-center text-[11px] text-muted-foreground border-b pb-1">
              <div className="pl-2">Test</div>
              <div className="text-right pr-2">WS</div>
              <div className="grid grid-cols-[36px_44px_36px] gap-0.5">
                <span className="text-center">WP−SD</span>
                <span className="text-center font-semibold text-foreground">WP</span>
                <span className="text-center">WP+SD</span>
              </div>
            </div>
            <div className="divide-y">
              {PERFORMANCE.map((name) => {
                const { wp, sd } = readWpSd(name)
                return (
                  <div key={name} className="grid grid-cols-[170px_64px_116px] items-center py-1.5 text-[12px]">
                    <div className="pl-2 pr-2 truncate">{name}</div>
                    <div className="pr-2">
                      <Input
                        value={rawScores[name] || ""}
                        onChange={(e) => updateWS(name, e.target.value)}
                        className="h-8 text-right font-semibold bg-muted/30 tabular-nums"
                        inputMode="numeric"
                      />
                    </div>
                    <div className="grid grid-cols-[36px_44px_36px] items-center text-center tabular-nums">
                      {renderWP(wp, sd)}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        </CardContent>
      </Card>

      {/* AKCJE */}
      <div className="flex flex-wrap gap-2 justify-between">
        <div className="flex gap-2">
          <Button variant="secondary" onClick={clearWS}>
            Wyczyść WS
          </Button>
          <Button variant="outline" onClick={() => navigate("/tests/waisr/input")}>
            Wstecz
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={persistWork}>
            Zapisz roboczo
          </Button>
          <Button onClick={() => { persistWork(); saveSnapshot(); }}>
            Zapisz
          </Button>
        </div>
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
