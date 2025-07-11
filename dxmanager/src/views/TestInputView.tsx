import { useParams } from "react-router-dom"
import Mmpi2InputView from "@/views/mmpi2/Mmpi2InputView"

export default function TestInputView() {
  const { testId } = useParams()

  if (testId === "mmpi2") {
    return <Mmpi2InputView />
  }

  return <div>Nieznany test: {testId}</div>
}
