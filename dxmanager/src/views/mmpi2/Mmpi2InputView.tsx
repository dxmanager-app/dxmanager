// src/views/mmpi2/Mmpi2InputView.tsx
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import AnswerMatrix from "@/components/mmpi2/AnswerMatrix"
import PatientInfoBar from "@/components/mmpi2/PatientInfoBar"
import ProgressBar from "@/components/ui/ProgressBar"
import { Answer } from "@/logic/types"
import { computeScores } from "../../logic/mmpi2/compute"
import { saveResult } from "@/lib/storage"

const TOTAL = 567

export default function Mmpi2InputView() {
  const { testId = "mmpi2" } = useParams()
  const navigate = useNavigate()

  const [answers, setAnswers] = useState<Answer[]>(Array(TOTAL).fill(null))
  const [idx, setIdx] = useState(0)
  const [gender, setGender] = useState<"M" | "F" | null>(null)

  const save = (i: number, val: Answer) => {
    setAnswers((p) => {
      const n = [...p]
      n[i] = val
      return n
    })
    setIdx((v) => Math.min(v + 1, TOTAL - 1))
  }

  const done = answers.filter(Boolean).length

  useEffect(() => {
    if (done === TOTAL && gender) {
      const g = gender === "F" ? "K" : "M"
      const scores = computeScores(answers, g)
      saveResult({ testId, gender: g, answers, scores })
      navigate(`/tests/${testId}/results`, { replace: true })
    }
  }, [done, gender, answers, testId, navigate])

  return (
    <div className="relative flex flex-col h-full">
      <PatientInfoBar onGenderSelect={setGender} />

      <div className="relative flex-1 min-h-0">
        <AnswerMatrix
          answers={answers}
          onAnswer={save}
          currentIndex={idx}
          onFocus={setIdx}
        />

        {done === TOTAL && !gender && (
          <div className="absolute inset-0 z-20 flex items-start justify-center bg-background/80 backdrop-blur">
            <p className="mt-4 rounded-md bg-red-600 px-4 py-2 text-sm text-white shadow">
              Wybierz płeć, żeby obliczyć wyniki
            </p>
          </div>
        )}
      </div>

      <div className="h-4">
        <ProgressBar total={TOTAL} answered={done} />
      </div>
    </div>
  )
}
