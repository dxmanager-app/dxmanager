import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MainMenuBar from "@/components/MainMenuBar"
import HomePage from "@/views/Home"
import MMPI2Page from "@/views/mmpi2/Mmpi2Input" // <-- zmień jeśli plik ma inną nazwę
import TestResultsList from "@/views/TestResultsList"


function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <MainMenuBar />

        <main className="flex-1 overflow-y-auto bg-background text-foreground p-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
<Route path="/results" element={<TestResultsList />} />            <Route path="/mmpi2" element={<MMPI2Page />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
