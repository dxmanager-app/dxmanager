// src/views/mmpi2/Mmpi2InputView.tsx
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import AnswerMatrix from "@/components/mmpi2/AnswerMatrix"
import PatientInfoBar from "@/components/mmpi2/PatientInfoBar"
import ProgressBar from "@/components/ui/ProgressBar"
import { Answer } from "@/logic/types"

const TOTAL = 567

export default function Mmpi2InputView() {
  /* --- routing --- */
  const { testId = "mmpi2" } = useParams()
  const navigate = useNavigate()

  /* --- state --- */
  const [answers, setAnswers] = useState<Answer[]>(Array(TOTAL).fill(null))
  const [idx, setIdx] = useState(0)
  const [gender, setGender] = useState<"M" | "K" | null>(null)

  /* --- zapis odpowiedzi --- */
  const save = (i: number, val: Answer) => {
    setAnswers((p) => {
      const n = [...p]
      n[i] = val
      return n
    })
    setIdx((v) => Math.min(v + 1, TOTAL - 1))
  }
  const done = answers.filter(Boolean).length

  /* --- gdy formularz pełny, ale brak płci → blokada + alert
     gdy formularz pełny + płeć → przejście do wyników */
  useEffect(() => {
    if (done === TOTAL) {
      if (gender) {
        navigate(`/tests/${testId}/results`, { replace: true })
      }
    }
  }, [done, gender, navigate, testId])

  /* --- render --- */
  return (
    <div className="relative flex flex-col h-full">
      {/* pasek danych pacjenta */}
      <PatientInfoBar onGenderSelect={setGender} />

      {/* formularz + ewentualna blokada */}
      <div className="relative flex-1 min-h-0">
        <AnswerMatrix
          answers={answers}
          onAnswer={save}
          currentIndex={idx}
          onFocus={setIdx}
        />

        {/* ALERT: pojawia się dopiero po wypełnieniu wszystkich odpowiedzi,
                  jeśli użytkownik nie wybrał płci */}
        {done === TOTAL && !gender && (
          <div className="absolute inset-0 z-20 flex items-start justify-center bg-background/80 backdrop-blur">
            <p className="mt-4 rounded-md bg-red-600 px-4 py-2 text-sm text-white shadow">
              Wybierz płeć, żeby obliczyć wyniki
            </p>
          </div>
        )}
      </div>

      {/* pasek postępu na dole */}
      <div className="h-4">
        <ProgressBar total={TOTAL} answered={done} />
      </div>
    </div>
  )
}
