import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MainSidebar from "@/components/MainSidebar"
import HomePage from "@/views/Home"
import TestResultsList from "@/views/TestResultsList"

import TestIntro from "@/views/TestIntro"
import TestInputView from "@/views/TestInputView"
import TestResultView from "@/views/TestResultView"

// WAIS-R (dedykowane widoki)
import WaisrIntroView from "@/views/waisr/WaisrIntroView"
import WaisrInputView from "@/views/waisr/WaisrInputView"
import WaisrResults from "@/views/waisr/WaisrResults"

export default function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <MainSidebar />
        <main className="flex-1 overflow-y-auto bg-background text-foreground p-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/results" element={<TestResultsList />} />

            {/* Dedykowane trasy dla WAIS-R (przed parametrycznymi) */}
            <Route path="/tests/waisr" element={<WaisrIntroView />} />
            <Route path="/tests/waisr/input" element={<WaisrInputView />} />
            <Route path="/tests/waisr/results" element={<WaisrResults />} />

            {/* Dynamiczne ścieżki dla pozostałych testów */}
            <Route path="/tests/:testId" element={<TestIntro />} />
            <Route path="/tests/:testId/input" element={<TestInputView />} />
            <Route path="/tests/:testId/results" element={<TestResultView />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}
