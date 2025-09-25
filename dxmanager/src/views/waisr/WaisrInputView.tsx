// src/views/waisr/WaisrInputView.tsx
import React, { useState, useMemo, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { calculateAge } from '@/lib/date/calculateAge'
import { ALL_SUBTESTS, SUBTESTS_SLOWNE, SUBTESTS_BEZSLOWNE } from '@/logic/waisr/calculate'
import type { Gender } from '@/logic/waisr/types'

// Komponent dla wpisywania dat z automatycznym formatowaniem DD-MM-YYYY
const DateInput = ({ id, value, onChange, placeholder }: {
  id: string
  value: string
  onChange: (value: string) => void
  placeholder: string
}) => {
  const [displayValue, setDisplayValue] = useState('')

  React.useEffect(() => {
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
    let cleanValue = inputValue.replace(/\D/g, '')
    
    let formatted = cleanValue
    if (cleanValue.length >= 3) {
      formatted = cleanValue.slice(0, 2) + '-' + cleanValue.slice(2)
    }
    if (cleanValue.length >= 5) {
      formatted = cleanValue.slice(0, 2) + '-' + cleanValue.slice(2, 4) + '-' + cleanValue.slice(4, 8)
    }
    
    setDisplayValue(formatted)
    
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

interface WaisrInputViewProps {
  onCalculate: (data: {
    gender: Gender
    age: { years: number, months: number, days: number }
    rawScores: Record<string, string>
    personalInfo: {
      name: string
      address: string
      education: string
      occupation: string
      examiner: string
      birthDate: string
      examDate: string
    }
  }) => void
}

export default function WaisrInputView({ onCalculate }: WaisrInputViewProps) {
  const [gender, setGender] = useState<Gender>("K")
  const [birthDate, setBirthDate] = useState("")
  const [examDate, setExamDate] = useState("")
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [education, setEducation] = useState("")
  const [occupation, setOccupation] = useState("")
  const [examiner, setExaminer] = useState("")
  const [rawScores, setRawScores] = useState<Record<string, string>>({})

  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  const age = useMemo(() => {
    const birth = birthDate ? new Date(birthDate) : null
    const exam = examDate ? new Date(examDate) : null
    if (!birth || !exam) return { years: 0, months: 0, days: 0 }
    return calculateAge(birth, exam)
  }, [birthDate, examDate])

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

  const formatAge = (ageData: { years: number, months: number, days: number }) => {
    if (ageData.years === 0) return "—"
    const parts = []
    parts.push(`${ageData.years} lat`)
    parts.push(`${ageData.months} mies.`)
    if (ageData.days > 0) parts.push(`${ageData.days} dni`)
    return parts.join(', ')
  }

  const handleCalculate = () => {
    onCalculate({
      gender,
      age,
      rawScores,
      personalInfo: {
        name,
        address,
        education,
        occupation,
        examiner,
        birthDate,
        examDate
      }
    })
  }

  const canCalculate = age.years > 0 && gender && Object.values(rawScores).some(score => score && score !== "0")

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      
      {/* Nagłówek */}
      <div className="text-center border-b pb-4">
        <h1 className="text-3xl font-bold text-slate-800">WAIS-R(PL) ARKUSZ ODPOWIEDZI</h1>
        <p className="text-slate-600 mt-1">SKALA INTELIGENCJI WECHSLERA DLA DOROSŁYCH - WERSJA ZREWIDOWANA</p>
      </div>

      {/* Sekcja 1: Dane podstawowe */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-blue-800">Dane podstawowe</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name">Imię i nazwisko</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jan Kowalski"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="address">Adres</Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="ul. Przykładowa 123, Warszawa"
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sekcja 2: Dane demograficzne */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-green-800">Dane demograficzne</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="gender">Płeć</Label>
              <Select value={gender} onValueChange={(value: Gender) => setGender(value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="K">Kobieta</SelectItem>
                  <SelectItem value="M">Mężczyzna</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="education">Wykształcenie</Label>
              <Input
                id="education"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                placeholder="wyższe"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="occupation">Zawód</Label>
              <Input
                id="occupation"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                placeholder="inżynier"
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sekcja 3: Daty i wiek */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-purple-800">Daty badania</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              <div className="h-10 px-3 py-2 border rounded-md bg-slate-50 flex items-center mt-1">
                <span className="text-sm font-medium">
                  {formatAge(age)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sekcja 4: Badający */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-orange-800">Osoba badająca</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-w-md">
            <Label htmlFor="examiner">Badający</Label>
            <Input
              id="examiner"
              value={examiner}
              onChange={(e) => setExaminer(e.target.value)}
              placeholder="Dr Jan Nowak"
              className="mt-1"
            />
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
              <div className="grid grid-cols-2 bg-slate-100 border-b text-sm font-medium text-slate-600">
                <div className="p-3">Podtest</div>
                <div className="p-3 text-center">Wynik surowy</div>
              </div>
              
              {SUBTESTS_SLOWNE.map((subtest, index) => (
                <div key={subtest} className={`grid grid-cols-2 border-b ${index % 2 === 0 ? 'bg-white' : 'bg-slate-25'}`}>
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
              <div className="grid grid-cols-2 bg-slate-100 border-b text-sm font-medium text-slate-600">
                <div className="p-3">Podtest</div>
                <div className="p-3 text-center">Wynik surowy</div>
              </div>
              
              {SUBTESTS_BEZSLOWNE.map((subtest, index) => (
                <div key={subtest} className={`grid grid-cols-2 border-b ${index % 2 === 0 ? 'bg-white' : 'bg-slate-25'}`}>
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
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Przycisk obliczania - nowy design */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-8">
        <div className="text-center space-y-4">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              Gotowy do obliczenia wyników?
            </h3>
            <p className="text-slate-600 text-sm">
              Upewnij się, że wprowadzono wszystkie wyniki surowe i dane demograficzne. 
              Wyniki zostaną obliczone zgodnie z polskimi normami WAIS-R.
            </p>
          </div>
          
          <Button 
            onClick={handleCalculate}
            disabled={!canCalculate}
            size="lg"
            className="px-12 py-4 text-lg bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Oblicz wyniki WAIS-R
          </Button>
          
          {!canCalculate && (
            <p className="text-sm text-amber-600 mt-2">
              Wprowadź datę urodzenia, datę badania, płeć i przynajmniej jeden wynik surowy
            </p>
          )}
        </div>
      </div>
    </div>
  )
}