import { useParams, Link } from "react-router-dom"

export default function TestIntro() {
  const { testId } = useParams()

  if (testId !== "mmpi2") {
    return <div>Nieznany test: {testId}</div>
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">MMPI-2</h1>
      <p className="mb-6">Formularz do szybkiego wprowadzania wyników testu MMPI-2.</p>
      <Link
        to={`/tests/${testId}/input`}
        className="inline-block bg-brand-accent text-white px-4 py-2 rounded hover:bg-brand-accent/80"
      >
        Rozpocznij test
      </Link>
    </div>
  )
}
