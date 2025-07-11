import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MainMenuBar from "@/components/MainMenuBar"
import HomePage from "@/views/Home"
import TestResultsList from "@/views/TestResultsList"

import TestIntro from "@/views/TestIntro"
import TestInputView from "@/views/TestInputView"
import TestResultView from "@/views/TestResultView"

export default function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <MainMenuBar />
        <main className="flex-1 overflow-y-auto bg-background text-foreground p-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/results" element={<TestResultsList />} />

            {/* Dynamiczne ścieżki dla testów */}
            <Route path="/tests/:testId" element={<TestIntro />} />
            <Route path="/tests/:testId/input" element={<TestInputView />} />
            <Route path="/tests/:testId/results" element={<TestResultView />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}
