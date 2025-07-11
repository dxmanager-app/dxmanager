import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface AnswerMatrixProps {
  answers: (1 | 0 | null)[]
  setAnswers: (a: (1 | 0 | null)[]) => void
}

export default function AnswerMatrix({ answers, setAnswers }: AnswerMatrixProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const updateAnswer = (index: number, value: 1 | 0 | null) => {
    const updated = [...answers]
    updated[index] = value
    setAnswers(updated)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      updateAnswer(activeIndex, 0)
      setActiveIndex((prev) => Math.min(prev + 1, 566))
    } else if (e.key === "ArrowLeft") {
      updateAnswer(activeIndex, 1)
      setActiveIndex((prev) => Math.min(prev + 1, 566))
    } else if (e.key === "ArrowDown") {
      updateAnswer(activeIndex, null)
      setActiveIndex((prev) => Math.min(prev + 1, 566))
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prev) => Math.max(prev - 1, 0))
    }
  }

  useEffect(() => {
    const listener = (e: KeyboardEvent) => handleKeyDown(e)
    window.addEventListener("keydown", listener)
    return () => window.removeEventListener("keydown", listener)
  }, [activeIndex, answers])

  return (
    <div
      ref={containerRef}
      className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      {answers.map((value, index) => (
        <div
          key={index}
          className={cn(
            "flex items-center gap-2 p-2 rounded-lg border border-border",
            index === activeIndex && "bg-muted"
          )}
        >
          <span className="w-6 text-sm text-right">{index + 1}.</span>
          <button
            onClick={() => updateAnswer(index, 1)}
            className={cn(
              "px-2 py-1 rounded text-sm border",
              value === 1 ? "bg-blue-500 text-white" : "bg-background"
            )}
          >
            Tak
          </button>
          <button
            onClick={() => updateAnswer(index, 0)}
            className={cn(
              "px-2 py-1 rounded text-sm border",
              value === 0 ? "bg-blue-500 text-white" : "bg-background"
            )}
          >
            Nie
          </button>
        </div>
      ))}
    </div>
  )
}
