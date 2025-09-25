// src/views/waisr/WaisrMainView.tsx
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import WaisrInputView from './WaisrInputView'
import WaisrResultsView from './WaisrResultsView'
import { calculateWaisr } from '@/logic/waisr/calculate'
import type { CalculatedResult, Gender, RawScores, Subtest } from '@/logic/waisr/types'

type ViewMode = 'input' | 'results'

interface WaisrInputData {
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
}

export default function WaisrMainView() {
  const location = useLocation()
  
  // Stan komponentu
  const [viewMode, setViewMode] = useState<ViewMode>('input')
  const [currentResult, setCurrentResult] = useState<CalculatedResult | null>(null)
  const [currentRawScores, setCurrentRawScores] = useState<Record<string, string>>({})
  const [currentInputData, setCurrentInputData] = useState<WaisrInputData | null>(null)

  // Sprawdź czy przyszliśmy z danymi z poprzedniego widoku
  React.useEffect(() => {
    const state = location.state as { rawScores?: Record<string, string>, result?: CalculatedResult, inputData?: WaisrInputData } | null
    if (state?.rawScores) {
      setCurrentRawScores(state.rawScores)
    }
    if (state?.result) {
      setCurrentResult(state.result)
      setViewMode('results')
    }
    if (state?.inputData) {
      setCurrentInputData(state.inputData)
    }
  }, [location.state])

  // Funkcja callback dla obliczania wyników
  const handleCalculate = (inputData: WaisrInputData) => {
    try {
      // Konwertuj rawScores ze string na number/null
      const rawScoresConverted: RawScores = {}
      Object.entries(inputData.rawScores).forEach(([subtest, value]) => {
        if (value && value !== '0' && value.trim() !== '') {
          const numValue = parseInt(value, 10)
          if (!isNaN(numValue)) {
            rawScoresConverted[subtest as Subtest] = numValue
          }
        }
      })

      // Oblicz wyniki WAIS-R
      const result = calculateWaisr({
        age: inputData.age.years, // Używamy tylko lat - zgodnie z normami
        gender: inputData.gender,
        raw: rawScoresConverted
      })

      // Zapisz dane
      setCurrentResult(result)
      setCurrentRawScores(inputData.rawScores)
      setCurrentInputData(inputData)
      setViewMode('results')

    } catch (error) {
      console.error('Błąd podczas obliczania wyników WAIS-R:', error)
      alert('Wystąpił błąd podczas obliczania wyników. Sprawdź wprowadzone dane.')
    }
  }

  // Funkcje callback dla wyników
  const handleEditResults = () => {
    setViewMode('input')
  }

  const handleSaveReport = () => {
    if (!currentResult || !currentInputData) return
    
    // TODO: Implementacja zapisu raportu z pełnymi danymi
    const reportData = {
      personalInfo: currentInputData.personalInfo,
      demographicInfo: {
        gender: currentInputData.gender,
        age: currentInputData.age
      },
      testResults: currentResult,
      rawScores: currentRawScores
    }
    
    console.log('Zapisywanie raportu...', reportData)
    alert('Funkcja zapisu raportu zostanie wkrótce zaimplementowana!')
  }

  // Renderowanie odpowiedniego widoku
  if (viewMode === 'results' && currentResult) {
    return (
      <WaisrResultsView
        result={currentResult}
        rawScores={currentRawScores}
        onEdit={handleEditResults}
        onSaveReport={handleSaveReport}
      />
    )
  }

  return (
    <WaisrInputView
      onCalculate={handleCalculate}
    />
  )
}