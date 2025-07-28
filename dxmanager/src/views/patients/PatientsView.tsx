// /app/dxmanager/src/views/patients/PatientsView.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

function calculateAge(birthDate: string): number {
  const birth = new Date(birthDate);
  const diff = Date.now() - birth.getTime();
  const age = new Date(diff).getUTCFullYear() - 1970;
  return age;
}

export default function PatientsView() {
  const navigate = useNavigate();

  const [patients] = useState([
    { id: "1", firstName: "Jan", lastName: "Kowalski", birthDate: "1985-01-01" },
    { id: "2", firstName: "Anna", lastName: "Nowak", birthDate: "1990-04-15" }
  ]);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<"firstName" | "lastName" | "age">("lastName");
  const [sortAsc, setSortAsc] = useState(true);

  const filteredPatients = patients
    .filter((p) => `${p.firstName} ${p.lastName}`.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const aVal = sortKey === "age" ? calculateAge(a.birthDate) : (a as any)[sortKey];
      const bVal = sortKey === "age" ? calculateAge(b.birthDate) : (b as any)[sortKey];
      return sortAsc
        ? aVal.toString().localeCompare(bVal.toString())
        : bVal.toString().localeCompare(aVal.toString());
    });

  const handleNewPatient = () => {
    navigate("/patients/new");
  };

  const handleEdit = (id: string) => {
    navigate(`/patients/${id}/edit`);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Pacjenci</h2>
        <Button onClick={handleNewPatient} size="lg" className="w-full sm:w-auto">+ Nowy pacjent</Button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <input
          type="text"
          placeholder="Szukaj pacjenta..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <Separator />

      <div className="overflow-x-auto rounded-xl border border-border shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-muted/40">
            <tr className="text-left text-foreground">
              <th
                className="p-2 font-semibold cursor-pointer"
                onClick={() => {
                  setSortKey("firstName");
                  setSortAsc(sortKey === "firstName" ? !sortAsc : true);
                }}
              >
                Imię {sortKey === "firstName" && (sortAsc ? "↑" : "↓")}
              </th>
              <th
                className="p-2 font-semibold cursor-pointer"
                onClick={() => {
                  setSortKey("lastName");
                  setSortAsc(sortKey === "lastName" ? !sortAsc : true);
                }}
              >
                Nazwisko {sortKey === "lastName" && (sortAsc ? "↑" : "↓")}
              </th>
              <th
                className="p-2 font-semibold cursor-pointer"
                onClick={() => {
                  setSortKey("age");
                  setSortAsc(sortKey === "age" ? !sortAsc : true);
                }}
              >
                Wiek {sortKey === "age" && (sortAsc ? "↑" : "↓")}
              </th>
              <th className="p-2 font-semibold text-center">Akcje</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <tr key={patient.id} className="border-t border-border hover:bg-muted/30">
                  <td className="p-2 text-foreground">{patient.firstName}</td>
                  <td className="p-2 text-foreground">{patient.lastName}</td>
                  <td className="p-2 text-foreground">{calculateAge(patient.birthDate)}</td>
                  <td className="p-2 text-center space-x-2">
                    <Button size="sm" variant="outline" onClick={() => navigate(`/patients/${patient.id}`)}>
                      Podgląd
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => handleEdit(patient.id)}>
                      Edytuj
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center p-6 text-muted-foreground">
                  Brak pacjentów do wyświetlenia
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
