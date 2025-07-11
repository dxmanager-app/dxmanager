import { useParams } from "react-router-dom"

export default function TestResultView() {
  const { testId } = useParams()
  return <div>Wyniki testu: {testId}</div>
}
