// src/views/mmpi2/Mmpi2InputView.tsx
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import AnswerMatrix from "@/components/mmpi2/AnswerMatrix"
import PatientInfoBar from "@/components/mmpi2/PatientInfoBar"
import ProgressBar from "@/components/ui/ProgressBar"
import { Answer } from "@/logic/types"
import { computeScores } from "../../logic/mmpi2/compute"
import { saveResult } from "@/lib/storage"

const TOTAL = 567
const MAX_MISSING = 30

export default function Mmpi2InputView() {
  const { testId = "mmpi2" } = useParams()
  const navigate = useNavigate()

  const [answers, setAnswers] = useState<Answer[]>(Array(TOTAL).fill(null))
  const [idx, setIdx] = useState(0)
  const [gender, setGender] = useState<"M" | "F" | null>(null)
  const [showDialog, setShowDialog] = useState(false)

  const save = (i: number, val: Answer) => {
    setAnswers((p) => {
      const n = [...p]
      n[i] = val
      return n
    })
    setIdx((v) => Math.min(v + 1, TOTAL - 1))
  }

  const done = answers.filter(Boolean).length
  const missing = TOTAL - done

  const handleFinish = () => {
    setShowDialog(true)
  }

  const handleProceed = () => {
    if (!gender) return
    const g = gender === "F" ? "K" : "M"
    const scores = computeScores(answers, g)
    saveResult({ testId, gender: g, answers, scores })
    navigate(`/tests/${testId}/results`, { replace: true })
  }

  return (
    <div className="relative flex flex-col h-full">
      <div className="text-white">
        <PatientInfoBar onGenderSelect={setGender} />
      </div>

      <div className="relative flex-1 min-h-0">
        <AnswerMatrix
          answers={answers}
          onAnswer={save}
          currentIndex={idx}
          onFocus={setIdx}
        />

        {idx === TOTAL - 1 && (
          <div className="mt-4 flex justify-end">
            <button
              className="px-4 py-2 rounded-md bg-primary text-white"
              onClick={handleFinish}
            >
              Zakończ test
            </button>
          </div>
        )}
      </div>

      <div className="h-4">
        <ProgressBar total={TOTAL} answered={done} />
      </div>

      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-background p-6 rounded-lg shadow-lg w-[90%] max-w-md text-center">
            {missing >= MAX_MISSING ? (
              <>
                <p className="mb-4 text-red-600">
                  Brakuje {missing} odpowiedzi. Nie możesz zakończyć testu przy 30 lub więcej brakach.
                </p>
                <button
                  className="px-4 py-2 rounded-md bg-primary text-white"
                  onClick={() => setShowDialog(false)}
                >
                  Wróć do testu
                </button>
              </>
            ) : (
              <>
                <p className="mb-4">
                  Brakuje {missing} odpowiedzi. Czy chcesz zakończyć test czy wrócić i poprawić?
                </p>
                <div className="flex justify-around">
                  <button
                    className="px-4 py-2 rounded-md bg-secondary"
                    onClick={() => setShowDialog(false)}
                  >
                    Poprawiam
                  </button>
                  <button
                    className="px-4 py-2 rounded-md bg-primary text-white"
                    onClick={handleProceed}
                  >
                    Przechodzę dalej
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
