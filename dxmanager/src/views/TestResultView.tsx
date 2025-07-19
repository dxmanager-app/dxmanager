import { useParams } from "react-router-dom"
import Mmpi2Results from "@/views/mmpi2/Mmpi2Results"

export default function TestResultView() {
  const { testId } = useParams()

  if (testId === "mmpi2") {
    return <Mmpi2Results />
  }

  return (
    <div className="p-4 text-center">
      <p>Brak dedykowanego widoku dla testu: {testId}</p>
    </div>
  )
}
