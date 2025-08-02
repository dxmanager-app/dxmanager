// src/views/mmpi2/Mmpi2Results.tsx

import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { scaleHierarchy } from "@/logic/mmpi2/scale-hierarchy";
import { getResults, saveResult } from "@/lib/storage";
import { Answer } from "@/logic/types";
import { scaleLabels } from "@/logic/mmpi2/scaleLabels";
import { Settings } from "lucide-react";

type SortBy = "default" | "skalaAsc" | "skalaDesc" | "WSAsc" | "WSDesc" | "KAsc" | "KDesc" | "TAsc" | "TDesc";

export default function Mmpi2Results() {
  const { testId = "mmpi2" } = useParams();
  const [q] = useSearchParams();
  const fromStorage = Boolean(q.get("id"));
  const nav = useNavigate();

  const [gender, setGender] = useState<"M" | "K">("M");
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [scores, setScores] = useState<Record<string, any>>({});
  const [visibleCols, setVisibleCols] = useState<string[]>(["WS", "K", "T"]);
  const [visibleRows, setVisibleRows] = useState<Record<string, boolean>>({});
  const [sortBy, setSortBy] = useState<SortBy>("default");

  useEffect(() => {
    async function load() {
      const results = await getResults();
      const filtered = results.filter((r) => r.testId === testId);
      const last = filtered.length > 0 ? filtered[filtered.length - 1] : null;
      if (!last) return;
      setGender(last.gender as "M" | "K");
      setAnswers(last.answers);
      setScores(last.scores);

      // Inicjalizacja widocznych wierszy
      const initRows: Record<string, boolean> = {};
      Object.values(scaleHierarchy).flat().forEach((k) => {
        initRows[k] = true;
      });
      setVisibleRows(initRows);
    }
    load();
  }, [testId]);

  if (!Object.keys(scores).length) {
    return (
      <p className="p-4 text-center">
        Brak wyników do wyświetlenia dla testu: {testId}
      </p>
    );
  }

  const handleSave = () => {
    if (!fromStorage && gender && Object.keys(scores).length) {
      saveResult({ testId, gender, answers, scores });
      nav("/results");
    }
  };

  const handleColumnToggle = (col: string) => {
    setVisibleCols((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );
  };

  const getScoreValue = (key: string, col: string) => {
    const rec = scores[key];
    if (!rec) return "—";
    if (col === "T") return rec.t ?? "—";
    if (col === "K") return rec.k ?? "—";
    if (col === "WS") return rec.raw ?? "—";
    return "—";
  };

  const sortScales = (keys: string[]) => {
    switch (sortBy) {
      case "skalaAsc":
        return [...keys].sort((a, b) => a.localeCompare(b));
      case "skalaDesc":
        return [...keys].sort((a, b) => b.localeCompare(a));
      case "TAsc":
        return [...keys].sort(
          (a, b) => (scores[a]?.t ?? 0) - (scores[b]?.t ?? 0)
        );
      case "TDesc":
        return [...keys].sort(
          (a, b) => (scores[b]?.t ?? 0) - (scores[a]?.t ?? 0)
        );
      case "KAsc":
        return [...keys].sort(
          (a, b) => (scores[a]?.k ?? 0) - (scores[b]?.k ?? 0)
        );
      case "KDesc":
        return [...keys].sort(
          (a, b) => (scores[b]?.k ?? 0) - (scores[a]?.k ?? 0)
        );
      case "WSAsc":
        return [...keys].sort(
          (a, b) => (scores[a]?.raw ?? 0) - (scores[b]?.raw ?? 0)
        );
      case "WSDesc":
        return [...keys].sort(
          (a, b) => (scores[b]?.raw ?? 0) - (scores[a]?.raw ?? 0)
        );
      default:
        return keys;
    }
  };

  return (
    <section className="flex flex-col gap-4 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Wyniki testu MMPI-2</h2>
        {!fromStorage && (
          <Button onClick={handleSave} className="px-6">
            Zapisz wyniki
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {Object.entries(scaleHierarchy).map(([groupName, keys]) => {
          const sortedKeys = sortScales(keys as string[]);
          return (
            <Card key={groupName} className="overflow-hidden">
              <CardHeader className="flex justify-between items-center">
                <CardTitle className="text-base">{groupName}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <Settings className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleColumnToggle("WS")}>
                      <Checkbox checked={visibleCols.includes("WS")} />
                      <span className="ml-2">Wyświetl WS</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleColumnToggle("K")}>
                      <Checkbox checked={visibleCols.includes("K")} />
                      <span className="ml-2">Wyświetl K</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleColumnToggle("T")}>
                      <Checkbox checked={visibleCols.includes("T")} />
                      <span className="ml-2">Wyświetl T</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>

              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border p-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost">Skala</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem onClick={() => setSortBy("skalaAsc")}>
                                A-Z
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => setSortBy("skalaDesc")}>
                                Z-A
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => setSortBy("default")}>
                                Domyślnie
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </th>
                        {visibleCols.includes("WS") && (
                          <th className="border p-2">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost">WS</Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => setSortBy("WSAsc")}>
                                  Rosnąco
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSortBy("WSDesc")}>
                                  Malejąco
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </th>
                        )}
                        {visibleCols.includes("K") && (
                          <th className="border p-2">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost">K</Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => setSortBy("KAsc")}>
                                  Rosnąco
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSortBy("KDesc")}>
                                  Malejąco
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </th>
                        )}
                        {visibleCols.includes("T") && (
                          <th className="border p-2">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost">T</Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => setSortBy("TAsc")}>
                                  Rosnąco
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSortBy("TDesc")}>
                                  Malejąco
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {sortedKeys.map((k) => {
                        if (!visibleRows[k]) return null;
                        return (
                          <tr key={k} className="hover:bg-muted/50">
                            <td className="border p-2 text-sm">
                              <div className="font-semibold">{k}</div>
                              <div className="text-xs text-muted-foreground">
                                {scaleLabels[k]?.pl ?? ""}
                              </div>
                            </td>
                            {visibleCols.includes("WS") && (
                              <td className="border p-2 text-center">
                                {getScoreValue(k, "WS")}
                              </td>
                            )}
                            {visibleCols.includes("K") && (
                              <td className="border p-2 text-center">
                                {getScoreValue(k, "K")}
                              </td>
                            )}
                            {visibleCols.includes("T") && (
                              <td className="border p-2 text-center">
                                {getScoreValue(k, "T")}
                              </td>
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
