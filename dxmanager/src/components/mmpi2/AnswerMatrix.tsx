import React from "react"
import { Answer } from "@/logic/types"

export interface AnswerMatrixProps {
  answers: Answer[]
  onAnswer: (index: number, value: Answer) => void
  currentIndex: number
  onFocus: React.Dispatch<React.SetStateAction<number>>
}

const AnswerMatrix: React.FC<AnswerMatrixProps> = ({ answers, onAnswer, currentIndex, onFocus }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
      {answers.map((answer, index) => (
        <div
          key={index}
          onClick={() => onFocus(index)}
          className={`flex items-center justify-between rounded-md overflow-hidden border text-sm shadow-sm transition-all
            ${currentIndex === index ? "border-[#a27b5c] ring-2 ring-[#a27b5c] bg-[#fff8f3]" : "border-gray-300 bg-white hover:border-[#ccc]"}`}
        >
          <span className="px-2 font-mono text-xs w-8 text-right select-none">{index + 1}.</span>

          <div className="flex w-full divide-x divide-gray-300">
            <button
              onClick={(e) => {
                e.stopPropagation()
                onAnswer(index, "T")
              }}
              className={`w-1/2 px-2 py-1 text-xs font-semibold transition-colors
                ${answer === "T"
                  ? "bg-[#a27b5c] text-white"
                  : "bg-white text-[#2c3639] hover:bg-gray-100"}`}
            >
              Tak
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onAnswer(index, "F")
              }}
              className={`w-1/2 px-2 py-1 text-xs font-semibold transition-colors
                ${answer === "F"
                  ? "bg-[#a27b5c] text-white"
                  : "bg-white text-[#2c3639] hover:bg-gray-100"}`}
            >
              Nie
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnswerMatrix
