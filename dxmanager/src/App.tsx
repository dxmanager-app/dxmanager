// app/dxmanager/src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MainSidebar from "@/components/MainSidebar"
import HomePage from "@/views/Home"
import TestResultsList from "@/views/TestResultsList"

import TestIntro from "@/views/TestIntro"
import TestInputView from "@/views/TestInputView"
import TestResultView from "@/views/TestResultView"

// WAIS-R — bez kreatora; Input/Edit używają tego samego widoku
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

            {/* WAIS-R (bez kreatora) */}
            <Route path="/tests/waisr" element={<WaisrInputView />} />
            <Route path="/tests/waisr/input" element={<WaisrInputView />} />
            <Route path="/tests/waisr/edit" element={<WaisrInputView />} />
            <Route path="/tests/waisr/results" element={<WaisrResults />} />

            {/* Pozostałe testy (dynamicznie) */}
            <Route path="/tests/:testId" element={<TestIntro />} />
            <Route path="/tests/:testId/input" element={<TestInputView />} />
            <Route path="/tests/:testId/results" element={<TestResultView />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}
