// /app/dxmanager/src/components/patients/PatientForm.tsx
import { useState } from "react"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

export default function PatientForm() {
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    middleName: "",
    lastName: "",
    pesel: "",
    birthDate: "",
    gender: "",
    address: "",
    contact: "",
    education: "",
    jobStatus: "",
    job: "",
    maritalStatus: "",
    children: "",
    diagnoses: "",
    medication: "",
    referralReason: "",
    notes: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: save patient data (localStorage or DB)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* ID */}
      {formData.id && <p className="text-xs text-muted-foreground">Id: {formData.id}</p>}

      {/* Identyfikacja */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold">Identyfikacja</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <input name="firstName" placeholder="Imię *" required value={formData.firstName} onChange={handleChange} className="input" />
          <input name="middleName" placeholder="Drugie imię" value={formData.middleName} onChange={handleChange} className="input" />
          <input name="lastName" placeholder="Nazwisko" value={formData.lastName} onChange={handleChange} className="input" />
          <input name="pesel" placeholder="PESEL" value={formData.pesel} onChange={handleChange} className="input" />
          <input type="date" name="birthDate" placeholder="Data urodzenia *" required value={formData.birthDate} onChange={handleChange} className="input" />
        </div>
      </section>

      <Separator />

      {/* Dane kontaktowe */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold">Dane kontaktowe</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <select name="gender" value={formData.gender} onChange={handleChange} className="input">
            <option value="">Płeć</option>
            <option value="M">Mężczyzna</option>
            <option value="F">Kobieta</option>
          </select>
          <input name="address" placeholder="Adres zamieszkania" value={formData.address} onChange={handleChange} className="input" />
          <input name="contact" placeholder="Telefon / e-mail" value={formData.contact} onChange={handleChange} className="input" />
        </div>
      </section>

      <Separator />

      {/* Dane edukacyjne/zawodowe */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold">Dane edukacyjne/zawodowe</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <input name="education" placeholder="Wykształcenie" value={formData.education} onChange={handleChange} className="input" />
          <input name="jobStatus" placeholder="Status zawodowy *" required value={formData.jobStatus} onChange={handleChange} className="input" />
          <input name="job" placeholder="Zawód" value={formData.job} onChange={handleChange} className="input" />
          <input name="maritalStatus" placeholder="Stan cywilny" value={formData.maritalStatus} onChange={handleChange} className="input" />
          <input name="children" placeholder="Liczba dzieci" value={formData.children} onChange={handleChange} className="input" />
        </div>
      </section>

      <Separator />

      {/* Dodatkowe informacje */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold">Dodatkowe informacje</h3>
        <textarea name="diagnoses" placeholder="Rozpoznania" value={formData.diagnoses} onChange={handleChange} className="input min-h-[60px]" />
        <textarea name="medication" placeholder="Leczenie farmakologiczne" value={formData.medication} onChange={handleChange} className="input min-h-[60px]" />
        <textarea name="referralReason" placeholder="Powód skierowania" value={formData.referralReason} onChange={handleChange} className="input min-h-[60px]" />
        <textarea name="notes" placeholder="Notatki" value={formData.notes} onChange={handleChange} className="input min-h-[60px]" />
      </section>

      <div className="flex justify-end gap-2">
        <Button type="submit">Zapisz</Button>
      </div>
    </form>
  )
}
