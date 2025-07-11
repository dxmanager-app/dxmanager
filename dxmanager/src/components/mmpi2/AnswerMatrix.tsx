import { useEffect, useRef, useState } from "react"

interface AnswerMatrixProps {
  answers: (0 | 1 | null)[]
  setAnswers: (a: (0 | 1 | null)[]) => void
  genderSelected: boolean
}

export default function AnswerMatrix({ answers, setAnswers, genderSelected }: AnswerMatrixProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [rows] = useState(10) // stała liczba wierszy

  // Obsługa klawiatury
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!genderSelected) return
      if (e.key === "ArrowLeft") {
        update(activeIndex, 1)
        setActiveIndex((i) => Math.min(i + 1, 566))
      } else if (e.key === "ArrowRight") {
        update(activeIndex, 0)
        setActiveIndex((i) => Math.min(i + 1, 566))
      } else if (e.key === "ArrowDown") {
        setActiveIndex((i) => Math.min(i + 1, 566))
      } else if (e.key === "ArrowUp") {
        setActiveIndex((i) => Math.max(i - 1, 0))
      }
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [activeIndex, genderSelected])

  useEffect(() => {
    const el = document.getElementById(`q-${activeIndex}`)
    el?.scrollIntoView({ block: "nearest", inline: "nearest" })
  }, [activeIndex])

  const update = (index: number, value: 0 | 1) => {
    if (!genderSelected) return
    const copy = [...answers]
    copy[index] = value
    setAnswers(copy)
  }

  const blocks: JSX.Element[] = []

  for (let col = 0; col < Math.ceil(answers.length / rows); col++) {
    const columnItems = []

    for (let row = 0; row < rows; row++) {
      const i = col * rows + row
      if (i >= answers.length) break
      const val = answers[i]
      const isActive = i === activeIndex

      columnItems.push(
        <div
          key={i}
          id={`q-${i}`}
          className={`flex items-center justify-between w-[180px] px-3 py-1 rounded-md border-2 text-sm
            ${isActive ? "ring-2 ring-accent border-accent bg-muted" : "border-muted bg-background"}
            ${!genderSelected ? "opacity-50 pointer-events-none" : ""}
          `}
        >
          <span className="font-medium text-muted-foreground">{i + 1}.</span>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => update(i, 1)}
              className={`px-3 py-1 text-xs rounded-md border-2 font-semibold shadow-sm transition-all
                ${val === 1
                  ? "bg-lime-600 text-white border-lime-700"
                  : "bg-white text-foreground border-gray-400 hover:bg-gray-100"}
              `}
            >
              TAK
            </button>
            <button
              type="button"
              onClick={() => update(i, 0)}
              className={`px-3 py-1 text-xs rounded-md border-2 font-semibold shadow-sm transition-all
                ${val === 0
                  ? "bg-lime-600 text-white border-lime-700"
                  : "bg-white text-foreground border-gray-400 hover:bg-gray-100"}
              `}
            >
              NIE
            </button>
          </div>
        </div>
      )
    }

    blocks.push(
      <div key={`col-${col}`} className="flex flex-col gap-1">
        {columnItems}
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="flex gap-3 px-4 py-2 overflow-x-auto"
      style={{
        marginTop: "100px",
        height: "calc(100vh - 140px)",
      }}
    >
      {blocks}
    </div>
  )
}
