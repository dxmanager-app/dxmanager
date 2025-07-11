import { useState } from "react"
import { Lock } from "lucide-react"
import AnswerMatrix from "@/components/mmpi2/AnswerMatrix"
import GenderToggle from "@/components/mmpi2/GenderToggle"
import { Button } from "@/components/ui/button"
import { calculateScores } from "@/logic/mmpi2/calculate"
import { Gender } from "@/logic/types"

export default function Mmpi2InputView() {
  const [answers, setAnswers] = useState<(0 | 1 | null)[]>(Array(567).fill(null))
  const [gender, setGender] = useState<Gender | null>(null)

  const handleClick = () => {
    if (!gender) return
    const converted = answers.map((a) =>
      a === 1 ? "T" : a === 0 ? "F" : null
    ) as ("T" | "F" | null)[]
    const result = calculateScores(converted, gender)
    console.log("Wyniki:", result)
  }

  const answered = answers.filter((a) => a !== null).length
  const disabled = !gender || answered < 537

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between px-2 min-h-[80px]">
        <GenderToggle value={gender} onChange={setGender} />

        <Button
          onClick={handleClick}
          disabled={disabled}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all
            ${disabled
              ? "bg-muted text-muted-foreground border border-gray-400 cursor-not-allowed shadow-none"
              : "bg-lime-600 text-white hover:bg-lime-700"
            }`}
        >
          {disabled && <Lock className="w-4 h-4" />}
          Oblicz wyniki
          <span className="ml-2 font-mono text-xs text-muted-foreground">
            ({answered}/567)
          </span>
        </Button>
      </div>

      <AnswerMatrix
        answers={answers}
        setAnswers={setAnswers}
        genderSelected={gender !== null}
      />
    </div>
  )
}
