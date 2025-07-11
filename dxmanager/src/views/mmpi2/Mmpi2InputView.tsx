// src/views/mmpi2/Mmpi2InputView.tsx

import { useState } from "react"
import AnswerMatrix from "@/components/mmpi2/AnswerMatrix"
import GenderToggle from "@/components/mmpi2/GenderToggle"
import ScoreModeToggle from "@/components/mmpi2/ScoreModeToggle"
import { Button } from "@/components/ui/button"
import { calculateScores } from "@/logic/mmpi2/calculate"
import { Gender, ScoreMode, Answer } from "@/logic/types"


export default function Mmpi2InputView() {
  const [answers, setAnswers] = useState<Answer[]>(Array(567).fill(null))
  const [gender, setGender] = useState<Gender>("female")
  const [scoreMode, setScoreMode] = useState<ScoreMode>("t")
  const [resultsReady, setResultsReady] = useState(false)

  const handleCalculate = () => {
    const scores = calculateScores(answers, gender)
    console.log("Wyniki:", scores)
    setResultsReady(true)
  }

  const answeredCount = answers.filter((a) => a !== null).length

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <GenderToggle value={gender} onChange={setGender} />
        <ScoreModeToggle value={scoreMode} onChange={setScoreMode} />
        <Button
          onClick={handleCalculate}
          disabled={answeredCount < 300}
          className="ml-auto"
        >
          Oblicz wyniki ({answeredCount}/567)
        </Button>
      </div>

      <AnswerMatrix
        answers={answers}
        onChange={setAnswers}
        highlightActive
      />
    </div>
  )
}
