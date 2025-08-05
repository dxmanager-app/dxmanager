// app/dxmanager/src/views/waisr/WaisrResults.tsx
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function WaisrResults() {
  const navigate = useNavigate()

  return (
    <section className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">WAIS-R(PL) – Wyniki przeliczone</h1>
      <p className="text-muted-foreground">
        Tutaj pojawią się wyniki przeliczone (WP) oraz wykres słupkowy dla wszystkich podtestów WAIS-R.
      </p>

      <div className="flex gap-4">
        <Button variant="outline" onClick={() => navigate(-1)}>
          Powrót
        </Button>
        <Button onClick={() => navigate("/")}>Zakończ</Button>
      </div>
    </section>
  )
}
