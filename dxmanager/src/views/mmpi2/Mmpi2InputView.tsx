// src/views/mmpi2/Mmpi2InputView.tsx

import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import AnswerMatrix from "@/components/mmpi2/AnswerMatrix"
import PatientInfoBar from "@/components/mmpi2/PatientInfoBar"
import ProgressBar from "@/components/ui/ProgressBar"
import { Answer } from "@/logic/types"
import { computeScores } from "@/logic/mmpi2/compute"
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

  const saveAndGoToResults = () => {
    if (!gender) return
    const g = gender === "F" ? "K" : "M"
    const scores = computeScores(answers, g)
    const id = saveResult({ testId, gender: g, answers, scores })
    navigate(`/results/${id}`, { replace: true })
  }

  const saveAndReset = () => {
    if (!gender) return
    const g = gender === "F" ? "K" : "M"
    const scores = computeScores(answers, g)
    saveResult({ testId, gender: g, answers, scores })
    setAnswers(Array(TOTAL).fill(null))
    setIdx(0)
    setGender(null)
    setShowDialog(false)
  }

  return (
    <div className="relative flex flex-col h-full bg-white dark:bg-background">
      <div>
        <PatientInfoBar onGenderSelect={setGender} />
      </div>

      <div className="relative flex-1 min-h-0">
        <AnswerMatrix
          answers={answers}
          onAnswer={save}
          currentIndex={idx}
          onFocus={setIdx}
          disableNavigation={idx === TOTAL - 1}
        />
      </div>

      {idx === TOTAL - 1 && (
        <div className="sticky bottom-4 flex justify-end px-4 mt-2">
          <button
            className="px-4 py-2 rounded-md bg-primary text-black dark:text-black"
            onClick={handleFinish}
          >
            Zakończ test
          </button>
        </div>
      )}

      <div className="h-4">
        <ProgressBar total={TOTAL} answered={done} />
      </div>

      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-background p-6 rounded-lg shadow-lg w-[90%] max-w-md text-center">
            {missing >= MAX_MISSING ? (
              <>
                <p className="mb-4 text-red-600">
                  Pominięto {missing} odpowiedzi. Nie możesz zakończyć testu przy 30 lub więcej pominięciach.
                </p>
                <button
                  className="px-4 py-2 rounded-md bg-gray-700 text-white dark:text-black"
                  onClick={() => setShowDialog(false)}
                >
                  Wróć do testu
                </button>
              </>
            ) : (
              <>
                <p className="mb-4">
                  {missing === 0
                    ? "Udzielono wszystkich odpowiedzi. Wybierz jedną z opcji poniżej:"
                    : `Pominięto ${missing} odpowiedzi. Wybierz jedną z opcji poniżej:`}
                </p>
                <div className="flex flex-col gap-3">
                  <button
                    className="px-4 py-2 rounded-md bg-gray-700 text-white dark:text-black"
                    onClick={saveAndGoToResults}
                  >
                    Zapisz i zobacz wyniki
                  </button>
                  <button
                    className="px-4 py-2 rounded-md bg-gray-700 text-white dark:text-black"
                    onClick={saveAndReset}
                  >
                    Zapisz i rozpocznij nowy test
                  </button>
                  <button
                    className="px-4 py-2 rounded-md bg-gray-700 text-white dark:text-black"
                    onClick={() => setShowDialog(false)}
                  >
                    Poprawiam odpowiedzi
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
