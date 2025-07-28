// /app/dxmanager/src/components/patients/PatientProfile.tsx
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import PatientForm from "./PatientForm"

export default function PatientProfile() {
  // TODO: tutaj pobieramy dane pacjenta po ID (mock na razie) - usunięto zmienną patient, bo nieużywana

  return (
    <div className="space-y-6">
      {/* Dane pacjenta - metryczka */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Profil pacjenta</h2>
        <PatientForm />
      </section>

      <Separator />

      {/* Kafelki testów */}
      <section className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold">Przeprowadzone testy</h3>
          <Button>+ Nowy test</Button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {/* Placeholder dla kafelków */}
          <div className="rounded-xl border p-3 bg-muted/50">MMPI-2 (12.06.2025)</div>
          <div className="rounded-xl border p-3 bg-muted/50">WAIS-R (01.03.2025)</div>
        </div>
      </section>

      <Separator />

      {/* Wywiad */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold">Dane z wywiadu</h3>
        <textarea
          placeholder="Tutaj można zapisać dane z wywiadu..."
          className="input min-h-[100px]"
        />
      </section>
    </div>
  )
}
