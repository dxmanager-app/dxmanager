// src/views/waisr/ModernWaisrView.tsx
import React, { useState, useMemo, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from 'recharts'
import { calculateAge } from '@/lib/date/calculateAge'
import { calculateWaisr, ALL_SUBTESTS, SUBTESTS_SLOWNE, SUBTESTS_BEZSLOWNE } from '@/logic/waisr/calculate'
import { getWPInterpretation, getIQInterpretation } from '@/logic/waisr/interpretations'
import type { Gender, CalculatedResult, ConfidenceInterval } from '@/logic/waisr/types'

// Komponent dla wpisywania dat z automatycznym formatowaniem DD-MM-YYYY
const DateInput = ({ id, value, onChange, placeholder }: {
  id: string
  value: string
  onChange: (value: string) => void
  placeholder: string
}) => {
  const [displayValue, setDisplayValue] = useState('')

  React.useEffect(() => {
    // Konwertuj z YYYY-MM-DD na DD-MM-YYYY dla wyświetlania
    if (value && value.includes('-') && value.length === 10) {
      const [year, month, day] = value.split('-')
      if (year.length === 4) {
        setDisplayValue(`${day}-${month}-${year}`)
        return
      }
    }
    setDisplayValue(value)
  }, [value])

  const handleChange = (inputValue: string) => {
    let cleanValue = inputValue.replace(/\D/g, '') // Tylko cyfry
    
    // Formatowanie podczas wpisywania: DD-MM-YYYY
    let formatted = cleanValue
    if (cleanValue.length >= 3) {
      formatted = cleanValue.slice(0, 2) + '-' + cleanValue.slice(2)
    }
    if (cleanValue.length >= 5) {
      formatted = cleanValue.slice(0, 2) + '-' + cleanValue.slice(2, 4) + '-' + cleanValue.slice(4, 8)
    }
    
    setDisplayValue(formatted)
    
    // Konwersja do YYYY-MM-DD dla kalkulacji
    if (cleanValue.length === 8) {
      const day = cleanValue.slice(0, 2)
      const month = cleanValue.slice(2, 4)  
      const year = cleanValue.slice(4, 8)
      onChange(`${year}-${month}-${day}`)
    } else {
      onChange(formatted)
    }
  }

  return (
    <Input
      id={id}
      type="text"
      placeholder={placeholder}
      value={displayValue}
      onChange={(e) => handleChange(e.target.value)}
      maxLength={10}
      className="font-mono"
    />
  )
}

// Funkcja ograniczania przedziałów ufności do 1-19
const clampWP = (value: number): number => Math.max(1, Math.min(19, value))

// Komponent dla pojedynczej wartości z tooltipem - bez zmiany kursora
const ValueWithTooltip = ({ value, interpretation, className = "", size = "normal" }: {
  value: number
  interpretation: any
  className?: string
  size?: "normal" | "large"
}) => {
  const sizeClass = size === "large" ? "text-base" : "text-sm"
  
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className={`${interpretation.color} ${className} ${sizeClass} inline-block`}>
          {value}
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <div className="text-center">
          <div className="font-medium">{interpretation.level || interpretation.category}</div>
          <div className="text-xs text-slate-600">
            {interpretation.percentile ? `Centyl: ${interpretation.percentile}` : `${interpretation.percentage} populacji`}
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  )
}

// Komponent dla przedziału ufności - wynik w środku jest nieco większy
const ConfidenceIntervalDisplay = ({ value, confidence, confidenceLevel, isWP = true }: {
  value: number
  confidence?: ConfidenceInterval
  confidenceLevel: 95 | 85
  isWP?: boolean
}) => {
  if (!confidence) {
    const interpretation = isWP ? getWPInterpretation(value) : getIQInterpretation(value)
    return <ValueWithTooltip value={value} interpretation={interpretation} size="large" />
  }

  const lower = isWP ? clampWP(confidence.lower) : confidence.lower
  const upper = isWP ? clampWP(confidence.upper) : confidence.upper
  
  const lowerInterp = isWP ? getWPInterpretation(lower) : getIQInterpretation(lower)
  const valueInterp = isWP ? getWPInterpretation(value) : getIQInterpretation(value)
  const upperInterp = isWP ? getWPInterpretation(upper) : getIQInterpretation(upper)

  return (
    <span className="font-mono whitespace-nowrap">
      <ValueWithTooltip value={lower} interpretation={lowerInterp} />
      <span className="mx-1">(</span>
      <ValueWithTooltip value={value} interpretation={valueInterp} size="large" className="font-semibold" />
      <span className="mx-1">)</span>
      <ValueWithTooltip value={upper} interpretation={upperInterp} />
    </span>
  )
}

// Niestandardowy komponent dla wykres profilu - poziome linie dla każdego podtestu
const ProfileChart = ({ data, showConfidence }: {
  data: any[]
  showConfidence: boolean
}) => {
  const verbals = data.filter(d => SUBTESTS_SLOWNE.includes(d.fullName as any))
  const performances = data.filter(d => SUBTESTS_BEZSLOWNE.includes(d.fullName as any))
  
  // Oblicz średnie
  const verbalWPs = verbals.filter(d => d.wp !== null).map(d => d.wp)
  const performanceWPs = performances.filter(d => d.wp !== null).map(d => d.wp)
  const allWPs = data.filter(d => d.wp !== null).map(d => d.wp)
  
  const verbalAvg = verbalWPs.length > 0 ? verbalWPs.reduce((a, b) => a + b, 0) / verbalWPs.length : 10
  const performanceAvg = performanceWPs.length > 0 ? performanceWPs.reduce((a, b) => a + b, 0) / performanceWPs.length : 10
  const totalAvg = allWPs.length > 0 ? allWPs.reduce((a, b) => a + b, 0) / allWPs.length : 10

  return (
    <div className="w-full h-96 relative">
      <div className="absolute top-4 right-4 text-xs text-slate-600 space-y-1">
        <div>AVG Słowne: {verbalAvg.toFixed(1)}</div>
        <div>AVG Bezsłowne: {performanceAvg.toFixed(1)}</div>
        <div>AVG Całkowite: {totalAvg.toFixed(1)}</div>
      </div>
      
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          layout="horizontal"
          data={data}
          margin={{ top: 20, right: 80, left: 100, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            type="number" 
            domain={[1, 19]}
            ticks={[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]}
            fontSize={10}
          />
          <YAxis 
            type="category" 
            dataKey="name" 
            width={90}
            fontSize={10}
            interval={0}
          />
          
          {/* Linie referencyjne dla średnich */}
          <ReferenceLine x={totalAvg} stroke="#64748b" strokeDasharray="4 4" />
          
          {/* Separator między skalami */}
          <ReferenceLine y={5.5} stroke="#374151" strokeWidth={2} />
          
          {/* Główne wyniki jako poziome linie */}
          <Bar 
            dataKey="wp" 
            fill="none" 
            stroke="#3b82f6" 
            strokeWidth={3}
            barSize={2}
          />
          
          {/* Przedziały ufności jeśli włączone */}
          {showConfidence && (
            <>
              <Bar 
                dataKey="confidenceLower" 
                fill="rgba(59, 130, 246, 0.3)"
                stroke="#3b82f6"
                strokeWidth={1}
                barSize={1}
              />
              <Bar 
                dataKey="confidenceUpper" 
                fill="rgba(59, 130, 246, 0.3)"
                stroke="#3b82f6"
                strokeWidth={1}
                barSize={1}
              />
            </>
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

export default function ModernWaisrView() {
  const [gender, setGender] = useState<Gender>("K")
  const [birthDate, setBirthDate] = useState("")
  const [examDate, setExamDate] = useState("")
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [education, setEducation] = useState("")
  const [occupation, setOccupation] = useState("")
  const [examiner, setExaminer] = useState("")
  const [rawScores, setRawScores] = useState<Record<string, string>>({})
  const [confidenceLevel, setConfidenceLevel] = useState<95 | 85>(95)
  const [showResults, setShowResults] = useState(false)
  const [showConfidenceInChart, setShowConfidenceInChart] = useState(false)

  // Refs dla automatycznego przeskakiwania między polami
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  // Obliczanie wieku z miesiącami i dniami
  const age = useMemo(() => {
    const birth = birthDate ? new Date(birthDate) : null
    const exam = examDate ? new Date(examDate) : null
    if (!birth || !exam) return { years: 0, months: 0, days: 0 }
    return calculateAge(birth, exam)
  }, [birthDate, examDate])

  const result = useMemo(() => {
    if (!age.years || !gender || !showResults) return null
    return calculateWaisr({
      mode: "basic",
      age: age.years,
      gender,
      raw: rawScores,
    })
  }, [age, gender, rawScores, showResults])

  const handleScoreChange = (subtest: string, value: string) => {
    setRawScores(prev => ({
      ...prev,
      [subtest]: value,
    }))
  }

  const handleScoreKeyDown = (e: React.KeyboardEvent, subtest: string) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault()
      const currentIndex = ALL_SUBTESTS.indexOf(subtest as any)
      const nextIndex = currentIndex + 1
      if (nextIndex < ALL_SUBTESTS.length) {
        const nextSubtest = ALL_SUBTESTS[nextIndex]
        inputRefs.current[nextSubtest]?.focus()
      }
    }
  }

  // Dane do wykresu profilu
  const chartData = useMemo(() => {
    if (!result) return []
    
    return ALL_SUBTESTS.map((subtest, index) => ({
      name: subtest.length > 12 ? subtest.substring(0, 10) + '...' : subtest,
      fullName: subtest,
      wp: result.bySubtest[subtest]?.wp || null,
      confidenceLower: result.bySubtest[subtest]?.confidence?.[confidenceLevel] ? 
        clampWP(result.bySubtest[subtest].confidence![confidenceLevel]!.lower) : null,
      confidenceUpper: result.bySubtest[subtest]?.confidence?.[confidenceLevel] ? 
        clampWP(result.bySubtest[subtest].confidence![confidenceLevel]!.upper) : null,
      index: index + 1
    }))
  }, [result, confidenceLevel])

  // Formatowanie wieku - zawsze pokazuj miesiące
  const formatAge = (ageData: { years: number, months: number, days: 0 }) => {
    if (ageData.years === 0) return "—"
    const parts = []
    parts.push(`${ageData.years} lat`)
    parts.push(`${ageData.months} mies.`)
    if (ageData.days > 0) parts.push(`${ageData.days} dni`)
    return parts.join(', ')
  }

  return (
    <TooltipProvider>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        
        {/* Nagłówek */}
        <div className="text-center border-b pb-4">
          <h1 className="text-3xl font-bold text-slate-800">WAIS-R(PL) ARKUSZ ODPOWIEDZI</h1>
          <p className="text-slate-600 mt-1">SKALA INTELIGENCJI WECHSLERA DLA DOROSŁYCH - WERSJA ZREWIDOWANA</p>
        </div>

        {/* Dane pacjenta - rozszerzone */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Dane osoby badanej</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <Label htmlFor="name">Imię i nazwisko</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jan Kowalski"
                />
              </div>
              
              <div>
                <Label htmlFor="address">Adres</Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="ul. Przykładowa 123, Warszawa"
                />
              </div>
              
              <div>
                <Label htmlFor="gender">Płeć</Label>
                <Select value={gender} onValueChange={(value: Gender) => setGender(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="K">Kobieta</SelectItem>
                    <SelectItem value="M">Mężczyzna</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="birthDate">Data urodzenia</Label>
                <DateInput
                  id="birthDate"
                  value={birthDate}
                  onChange={setBirthDate}
                  placeholder="dd-mm-rrrr"
                />
              </div>
              
              <div>
                <Label htmlFor="examDate">Data badania</Label>
                <DateInput
                  id="examDate"
                  value={examDate}
                  onChange={setExamDate}
                  placeholder="dd-mm-rrrr"
                />
              </div>
              
              <div>
                <Label>Wiek w dniu badania</Label>
                <div className="h-10 px-3 py-2 border rounded-md bg-slate-50 flex items-center">
                  <span className="text-sm font-medium">
                    {formatAge(age)}
                  </span>
                </div>
              </div>

              <div>
                <Label htmlFor="examiner">Badający</Label>
                <Input
                  id="examiner"
                  value={examiner}
                  onChange={(e) => setExaminer(e.target.value)}
                  placeholder="Dr Jan Nowak"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <Label htmlFor="education">Wykształcenie</Label>
                <Input
                  id="education"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  placeholder="wyższe"
                />
              </div>
              
              <div>
                <Label htmlFor="occupation">Zawód</Label>
                <Input
                  id="occupation"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  placeholder="inżynier"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabela wyników badania */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Testy Słowne */}
          <Card>
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-lg text-blue-800">Testy Słowne</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-hidden">
                <div className="grid grid-cols-3 bg-slate-100 border-b text-sm font-medium text-slate-600">
                  <div className="p-3">Podtest</div>
                  <div className="p-3 text-center">Wynik surowy</div>
                  <div className="p-3 text-center">Wynik przeliczony</div>
                </div>
                
                {SUBTESTS_SLOWNE.map((subtest, index) => (
                  <div key={subtest} className={`grid grid-cols-3 border-b ${index % 2 === 0 ? 'bg-white' : 'bg-slate-25'}`}>
                    <div className="p-3 font-medium text-sm">{subtest}</div>
                    <div className="p-3 text-center">
                      <input
                        ref={(el) => { inputRefs.current[subtest] = el }}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={rawScores[subtest] || ""}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '')
                          handleScoreChange(subtest, val)
                        }}
                        onKeyDown={(e) => handleScoreKeyDown(e, subtest)}
                        placeholder="0"
                        className="w-20 h-8 text-center text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="p-3 text-center">
                      {result?.bySubtest[subtest]?.wp ? (
                        <Badge variant="outline" className="cursor-default">
                          <ConfidenceIntervalDisplay 
                            value={result.bySubtest[subtest].wp!}
                            confidence={result.bySubtest[subtest].confidence?.[confidenceLevel]}
                            confidenceLevel={confidenceLevel}
                            isWP={true}
                          />
                        </Badge>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Testy Bezsłowne */}
          <Card>
            <CardHeader className="bg-green-50">
              <CardTitle className="text-lg text-green-800">Testy Bezsłowne</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-hidden">
                <div className="grid grid-cols-3 bg-slate-100 border-b text-sm font-medium text-slate-600">
                  <div className="p-3">Podtest</div>
                  <div className="p-3 text-center">Wynik surowy</div>
                  <div className="p-3 text-center">Wynik przeliczony</div>
                </div>
                
                {SUBTESTS_BEZSLOWNE.map((subtest, index) => (
                  <div key={subtest} className={`grid grid-cols-3 border-b ${index % 2 === 0 ? 'bg-white' : 'bg-slate-25'}`}>
                    <div className="p-3 font-medium text-sm">{subtest}</div>
                    <div className="p-3 text-center">
                      <input
                        ref={(el) => { inputRefs.current[subtest] = el }}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={rawScores[subtest] || ""}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '')
                          handleScoreChange(subtest, val)
                        }}
                        onKeyDown={(e) => handleScoreKeyDown(e, subtest)}
                        placeholder="0"
                        className="w-20 h-8 text-center text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="p-3 text-center">
                      {result?.bySubtest[subtest]?.wp ? (
                        <Badge variant="outline" className="cursor-default">
                          <ConfidenceIntervalDisplay 
                            value={result.bySubtest[subtest].wp!}
                            confidence={result.bySubtest[subtest].confidence?.[confidenceLevel]}
                            confidenceLevel={confidenceLevel}
                            isWP={true}
                          />
                        </Badge>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Przycisk Oblicz */}
        <div className="text-center">
          <Button 
            onClick={() => setShowResults(true)}
            disabled={!age.years || !gender}
            size="lg"
            className="px-8 py-3 text-lg"
          >
            Oblicz wyniki WAIS-R
          </Button>
        </div>

        {/* Wyniki - wyświetlane po kliknięciu Oblicz */}
        {showResults && result && (
          <>
            {/* Wyniki Czynnikowe */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Wyniki Czynnikowe</CardTitle>
                  <Select value={confidenceLevel.toString()} onValueChange={(value) => setConfidenceLevel(parseInt(value) as 95 | 85)}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="95">Przedział 95%</SelectItem>
                      <SelectItem value="85">Przedział 85%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Skala Słowna */}
                  <div className="text-center space-y-2">
                    <h3 className="font-medium text-blue-800">Rozumienie Werbalne</h3>
                    <div className="text-sm text-slate-600">Suma wyników przeliczonych: {result.sums.slowna || "—"}</div>
                    {result.iq?.slowne ? (
                      <div className="text-xl font-bold">
                        <ConfidenceIntervalDisplay 
                          value={result.iq.slowne}
                          confidence={result.confidenceIntervals?.iq?.slowne?.[confidenceLevel]}
                          confidenceLevel={confidenceLevel}
                          isWP={false}
                        />
                      </div>
                    ) : (
                      <div className="text-xl font-bold text-slate-400">—</div>
                    )}
                  </div>

                  {/* Skala Bezsłowna */}
                  <div className="text-center space-y-2">
                    <h3 className="font-medium text-green-800">Organizacja Percepcyjna</h3>
                    <div className="text-sm text-slate-600">Suma wyników przeliczonych: {result.sums.bezslowna || "—"}</div>
                    {result.iq?.bezslowne ? (
                      <div className="text-xl font-bold">
                        <ConfidenceIntervalDisplay 
                          value={result.iq.bezslowne}
                          confidence={result.confidenceIntervals?.iq?.bezslowne?.[confidenceLevel]}
                          confidenceLevel={confidenceLevel}
                          isWP={false}
                        />
                      </div>
                    ) : (
                      <div className="text-xl font-bold text-slate-400">—</div>
                    )}
                  </div>

                  {/* Skala Pełna */}
                  <div className="text-center space-y-2">
                    <h3 className="font-medium text-purple-800">Skala Pełna</h3>
                    <div className="text-sm text-slate-600">Suma wyników przeliczonych: {result.sums.pelna || "—"}</div>
                    {result.iq?.pelne ? (
                      <div className="text-xl font-bold">
                        <ConfidenceIntervalDisplay 
                          value={result.iq.pelne}
                          confidence={result.confidenceIntervals?.iq?.pelne?.[confidenceLevel]}
                          confidenceLevel={confidenceLevel}
                          isWP={false}
                        />
                      </div>
                    ) : (
                      <div className="text-xl font-bold text-slate-400">—</div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Analiza czynnikowa - jeśli dostępna */}
            {result?.factors && Object.keys(result.factors).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Analiza Czynnikowa</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Object.entries(result.factors).map(([factorName, factorData]) => {
                      const factor = factorData as { 
                        sum: number | null; 
                        iq?: number | null;
                        confidence?: {
                          95?: ConfidenceInterval;
                          85?: ConfidenceInterval;
                        };
                      }
                      return (
                        <div key={factorName} className="text-center space-y-2">
                          <h3 className="font-medium text-slate-800 text-sm">{factorName}</h3>
                          <div className="text-xs text-slate-600">Suma WP: {factor.sum || "—"}</div>
                          {factor.iq ? (
                            <div className="text-lg font-bold">
                              <ConfidenceIntervalDisplay 
                                value={factor.iq}
                                confidence={factor.confidence?.[confidenceLevel]}
                                confidenceLevel={confidenceLevel}
                                isWP={false}
                              />
                            </div>
                          ) : (
                            <div className="text-lg font-bold text-slate-400">—</div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tabela Wyników Przeliczonych - wykres profilu */}
            {chartData.some(d => d.wp !== null) && (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Tabela Wyników Przeliczonych</CardTitle>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="showConfidence"
                        checked={showConfidenceInChart}
                        onChange={(e) => setShowConfidenceInChart(e.target.checked)}
                        className="rounded"
                      />
                      <Label htmlFor="showConfidence" className="text-sm">
                        Pokaż przedziały ufności
                      </Label>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ProfileChart data={chartData} showConfidence={showConfidenceInChart} />
                </CardContent>
              </Card>
            )}

            {/* Info o grupie wiekowej */}
            <div className="text-center text-sm text-slate-500">
              Grupa wiekowa norm: {result.ageGroup} lat
            </div>
          </>
        )}
      </div>
    </TooltipProvider>
  )
}