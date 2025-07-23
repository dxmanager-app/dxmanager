// src/components/mmpi2/AnswerMatrix.tsx
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import { Answer } from "@/logic/types"
import { Button } from "@/components/ui/button"

export interface AnswerMatrixProps {
  answers: Answer[]
  onAnswer: (index: number, value: Answer) => void
  currentIndex: number
  onFocus: React.Dispatch<React.SetStateAction<number>>
}

/**
 * MMPI‑2 – szybkie wprowadzanie wyników
 * Kolumny po 15 pytań (układ pionowy) – zero scrolla, pełna obsługa klawiatury i myszy.
 * Przyciski TAK/NIE korzystają z komponentu <Button> shadcn/ui.
 */

const QUESTIONS_PER_COLUMN = 15
const COLUMN_MIN_WIDTH = 180 // px

export const AnswerMatrix: React.FC<AnswerMatrixProps> = ({
  answers,
  onAnswer,
  currentIndex,
  onFocus,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [columns, setColumns] = useState(1)

  const playBeep = (idx: number, nextAnswer: Answer) => {
    if (answers[idx] === nextAnswer) return
    const next = idx + 1
    const soundId = next % 15 === 0 ? "milestone" : "beep"
    const element = document.getElementById(soundId) as HTMLAudioElement | null
    if (!element?.src) return
    const freshAudio = new Audio(element.src)
    freshAudio.play().catch(() => {})
  }

  /* 🔄 Re‑calculate number of columns on resize */
  const recalcColumns = useCallback(() => {
    const width = containerRef.current?.clientWidth ?? 0
    const count = Math.max(1, Math.floor(width / COLUMN_MIN_WIDTH))
    setColumns(count)
  }, [])

  useLayoutEffect(() => {
    recalcColumns()
    const ro = new ResizeObserver(recalcColumns)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [recalcColumns])

  /* 🔢 Pagination */
  const questionsPerPage = columns * QUESTIONS_PER_COLUMN
  const currentPage = Math.floor(currentIndex / questionsPerPage)
  const start = currentPage * questionsPerPage
  const end = Math.min(start + questionsPerPage, answers.length)
  const pageIndexes = Array.from({ length: end - start }, (_, i) => start + i)

  /* ⌨️ Keyboard */
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key))
        return
      e.preventDefault()
      switch (e.key) {
        case "ArrowLeft":
          onAnswer(currentIndex, "T")
          playBeep(currentIndex, "T")
          break
        case "ArrowRight":
          onAnswer(currentIndex, "F")
          playBeep(currentIndex, "F")
          break
        case "ArrowDown":
          onFocus((idx) => Math.min(idx + 1, answers.length - 1))
          break
        case "ArrowUp":
          onFocus((idx) => Math.max(idx - 1, 0))
          break
      }
    },
    [answers, currentIndex, onAnswer, onFocus]
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [handleKey])

  /* 🔍 Focus */
  useEffect(() => {
    const activeEl = document.querySelector(
      `[data-question='${currentIndex}']`
    ) as HTMLElement | null
    activeEl?.focus({ preventScroll: true })
  }, [currentIndex, start])

  /* 💄 Style helpers – tylko klasy util, resztę bierze shadcn Button */
  const yesClasses = (idx: number) =>
    `h-7 w-9 text-xs leading-none transition-colors ${
      answers[idx] === "T"
        ? "bg-primary text-primary-foreground border-primary"
        : "border-border text-foreground dark:text-muted-foreground"
    }`
  const noClasses = (idx: number) =>
    `h-7 w-9 text-xs leading-none transition-colors ${
      answers[idx] === "F"
        ? "bg-primary text-primary-foreground border-primary"
        : "border-border text-foreground dark:text-muted-foreground"
    }`

  /* --- RENDER --- */
  return (
    <div
      ref={containerRef}
      className="grid gap-y-1 gap-x-3 h-full"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(${COLUMN_MIN_WIDTH}px, 1fr))`,
        gridAutoFlow: "column",
        gridTemplateRows: `repeat(${QUESTIONS_PER_COLUMN}, minmax(0, 1fr))`,
      }}
    >
      {pageIndexes.map((idx) => {
        const col = Math.floor((idx - start) / QUESTIONS_PER_COLUMN)
        const row = (idx - start) % QUESTIONS_PER_COLUMN
        return (
          <div
            key={idx}
            data-question={idx}
            style={{ gridColumn: col + 1, gridRow: row + 1 }}
            className={`flex items-center gap-2 px-1 py-0.5 ${
              idx === currentIndex ? "ring-2 ring-inset ring-primary" : ""
            }`}
            tabIndex={0}
            onClick={() => onFocus(idx)}
          >
            {/* numer pytania */}
            <span className="font-semibold tabular-nums w-9 text-right">
              {idx + 1}
            </span>
            {/* przyciski TAK / NIE – shadcn Button */}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className={yesClasses(idx)}
              onClick={(e) => {
                e.stopPropagation()
                onAnswer(idx, "T")
                playBeep(idx, "T")
              }}
            >
              Tak
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className={noClasses(idx)}
              onClick={(e) => {
                e.stopPropagation()
                onAnswer(idx, "F")
                playBeep(idx, "F")
              }}
            >
              Nie
            </Button>
          </div>
        )
      })}
    </div>
  )
}

export default AnswerMatrix
