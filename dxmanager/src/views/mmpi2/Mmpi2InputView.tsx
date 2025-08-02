import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import AnswerMatrix from "@/components/mmpi2/AnswerMatrix"
import PatientInfoBar from "@/components/mmpi2/PatientInfoBar"
import ProgressBar from "@/components/ui/ProgressBar"
import { Answer } from "@/logic/types"
import { computeScores } from "@/logic/mmpi2/compute"
import { saveResult } from "@/lib/storage"

// shadcn/ui
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

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

  const saveAndGoToResults = async () => {
    if (!gender) return
    const g = gender === "F" ? "K" : "M"
    const scores = computeScores(answers, g)
    const id = await saveResult({ testId, gender: g, answers, scores })
    navigate(`/tests/${testId}/results?id=${id}`, { replace: true })
  }

  const saveAndReset = async () => {
    if (!gender) return
    const g = gender === "F" ? "K" : "M"
    const scores = computeScores(answers, g)
    await saveResult({ testId, gender: g, answers, scores })
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
          <Button
            className="px-4 py-2"
            onClick={handleFinish}
          >
            Zakończ test
          </Button>
        </div>
      )}

      <div className="h-4">
        <ProgressBar total={TOTAL} answered={done} />
      </div>

      {/* Nowy, wystylizowany modal */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {missing >= MAX_MISSING
                ? "Zbyt wiele braków"
                : missing === 0
                  ? "Wszystkie odpowiedzi zostały udzielone"
                  : `Pominięto ${missing} odpowiedzi`}
            </DialogTitle>
            <DialogDescription>
              {missing >= MAX_MISSING
                ? "Nie możesz zakończyć testu przy 30 lub więcej pominięciach."
                : "Wybierz, co chcesz zrobić dalej:"}
            </DialogDescription>
          </DialogHeader>
          
<DialogFooter className="flex flex-wrap justify-center gap-3 mt-6">
  {missing >= MAX_MISSING ? (
    <Button
      className="flex-1 min-w-[160px]"
      onClick={() => setShowDialog(false)}
    >
      Wróć do testu
    </Button>
  ) : (
    <>
      <Button
        className="flex-1 min-w-[160px]"
        onClick={saveAndGoToResults}
      >
        Zapisz i zobacz wyniki
      </Button>
      <Button
        className="flex-1 min-w-[160px]"
        onClick={saveAndReset}
      >
        Zapisz i rozpocznij nowy test
      </Button>
      <Button
        className="flex-1 min-w-[160px]"
        onClick={() => setShowDialog(false)}
      >
        Poprawiam odpowiedzi
      </Button>
    </>
  )}
</DialogFooter>


        </DialogContent>
      </Dialog>

      {/* Przyciski debugowe – tylko w trybie development */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-20 left-4">
          <button
            className="px-4 py-2 rounded-md bg-red-600 text-white text-sm"
            onClick={() => {
              const filled = Array(TOTAL)
                .fill(null)
                .map(() => (Math.random() > 0.5 ? "T" : "F"))
              setAnswers(filled)
              setGender("M")
              setIdx(TOTAL - 1)
              setShowDialog(true)
            }}
          >
            Wypełnij automatycznie (debug)
          </button>
        </div>
      )}
    </div>
  )
}
