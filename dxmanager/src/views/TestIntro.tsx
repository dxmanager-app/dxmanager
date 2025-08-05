// app/dxmanager/src/views/TestIntro.tsx
import { Link, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function TestIntro() {
  const { testId = "mmpi2" } = useParams()

  const isWaisr = testId === "waisr"

  return (
    <section className="flex h-full flex-col items-center justify-center gap-8 bg-background px-4 text-foreground">
      {/* Nagłówek */}
      <h1 className="text-3xl font-semibold capitalize">
        {isWaisr ? "WAIS-R(PL)" : testId} — wprowadzanie wyników
      </h1>

      {/* Instrukcja */}
      <div className="max-w-prose space-y-4 text-sm text-muted-foreground">
        {isWaisr ? (
          <>
            <p>
              Ten ekran służy do przepisania wyników surowych z podtestów WAIS-R(PL).
              W następnym kroku zostaną one przeliczone na wyniki przeliczone (WP)
              według odpowiednich norm wiekowych.
            </p>
            <p>
              Wprowadź wyniki surowe dla każdego podtestu (Skala słowna i Skala bezsłowna).
            </p>
          </>
        ) : (
          <>
            <p>
              Ten ekran służy do szybkiego przepisania odpowiedzi z papierowego
              arkusza. Widoczna będzie tylko część pytań — reszta pojawi się
              automatycznie, gdy przejdziesz dalej.
            </p>

            <p className="font-medium">Sterowanie klawiaturą:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <kbd className="kbd">←</kbd> — <b>TAK</b> + następne pytanie
              </li>
              <li>
                <kbd className="kbd">→</kbd> — <b>NIE</b> + następne pytanie
              </li>
              <li>
                <kbd className="kbd">↓</kbd> — pomiń i dalej
              </li>
              <li>
                <kbd className="kbd">↑</kbd> — wróć do poprzedniego
              </li>
            </ul>

            <p>
              Możesz też używać myszy — kliknij <b>TAK</b> lub <b>NIE</b>, aby
              zaznaczyć odpowiedź.
            </p>
          </>
        )}
      </div>

      {/* Przycisk start */}
      <Button
        asChild
        size="lg"
        variant="outline"
        className="dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90 shadow hover:shadow-md"
      >
        <Link to={`/tests/${testId}/input`}>Rozpocznij</Link>
      </Button>
    </section>
  )
}

/* Jeśli helper .kbd nie został jeszcze dodany, wrzuć raz w index.css:
@layer components {
  .kbd {
    @apply inline-flex items-center justify-center rounded border px-1 text-xs font-mono;
  }
}
*/
