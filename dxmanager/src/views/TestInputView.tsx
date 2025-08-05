// app/dxmanager/src/views/TestInputView.tsx
import { useParams } from "react-router-dom"
import { testRegistry } from "./TestRegistry"

export default function TestInputView() {
  const { testId = "mmpi2" } = useParams()

  const Component = testRegistry[testId]?.input

  if (!Component) {
    return <p className="p-4 text-center">Nieznany test: {testId}</p>
  }

  return <Component />
}
