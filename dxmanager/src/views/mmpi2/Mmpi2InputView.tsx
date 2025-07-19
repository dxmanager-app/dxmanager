import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Lock } from "lucide-react"
import AnswerMatrix from "@/components/mmpi2/AnswerMatrix"
import PatientInfoBar from "@/components/mmpi2/PatientInfoBar"
import { calculateScores } from "@/logic/mmpi2/calculate"
import { Answer, Gender } from "@/logic/types"

export default function Mmpi2InputView() {
  const navigate = useNavigate()
  const [answers, setAnswers] = useState<(0 | 1 | null)[]>(Array(567).fill(null))
  const [gender, setGender] = useState<Gender | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleAnswer = (index: number, value: Answer) => {
    const updated = answers.slice()
    updated[index] = value === "T" ? 1 : value === "F" ? 0 : null
    setAnswers(updated)
    setCurrentIndex(index + 1 < 567 ? index + 1 : index)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gender) return

      if (e.key === "ArrowLeft") {
        handleAnswer(currentIndex, "T")
      } else if (e.key === "ArrowRight") {
        handleAnswer(currentIndex, "F")
      } else if (e.key === "ArrowUp") {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0))
      } else if (e.key === "ArrowDown") {
        setCurrentIndex((prev) => (prev < 566 ? prev + 1 : 566))
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentIndex, gender])

const handleClick = () => {
  if (!gender) return
  const converted = answers.map((a) =>
    a === 1 ? "T" : a === 0 ? "F" : null
  ) as Answer[]
  const result = calculateScores(converted, gender)
  localStorage.setItem("mmpi2-scores", JSON.stringify(result)) // ⬅ nowość
  console.log("Zapisuję wynik:", result)
  console.log("L (15):", answers[14], "L (30):", answers[29], "L (45):", answers[44])
  navigate("/tests/mmpi2/results") // ⬅ uproszczone
}


  const answered = answers.filter((a) => a !== null).length
  const disabled = !gender || answered < 537

  return (
    <div className="relative w-full min-h-screen bg-[#f5f5f5] text-[#2c3639]">
      <PatientInfoBar gender={gender} setGender={setGender} />

      <div className="flex justify-end p-4 pt-2">
        <button
          onClick={handleClick}
          disabled={disabled}
          className={`relative flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md overflow-hidden
            transition-all duration-300 border-2 
            ${disabled
              ? "bg-gray-300 text-gray-600 opacity-40 border-gray-300 cursor-not-allowed"
              : "bg-[#a27b5c] text-white hover:bg-[#8c6246] shadow-md border-[#5a3c2d]"}
          `}
        >
          {disabled && <Lock className="w-4 h-4" />}
          Oblicz wyniki
          <span className="ml-2 font-mono text-xs text-muted-foreground">
            ({answered}/567)
          </span>

          {!disabled && (
            <span
              className="absolute bottom-0 left-0 h-[2px] bg-white/50"
              style={{ width: (answered / 567) * 100 + "%" }}
            />
          )}
        </button>
      </div>

      <div className="relative px-4 pb-6">
        {!gender && (
          <div className="absolute inset-0 z-10 bg-[#f5f5f5]/70 backdrop-blur-sm pointer-events-none" />
        )}
        <AnswerMatrix
          answers={answers.map((a) => a === 1 ? "T" : a === 0 ? "F" : null)}
          onAnswer={handleAnswer}
          currentIndex={currentIndex}
          onFocus={setCurrentIndex}
        />
      </div>
    </div>
  )
}
