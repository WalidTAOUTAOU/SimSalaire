import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight } from "lucide-react";
import dayjs from "dayjs";
import "dayjs/locale/fr";

dayjs.locale("fr");

export default function SalaireCalendrier() {
  const [salaire, setSalaire] = useState(0);
  const [absences, setAbsences] = useState([]);
  const [joursOuvres, setJoursOuvres] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  useEffect(() => {
    const year = currentMonth.year();
    const month = currentMonth.month();
    const jours = [];

    const daysInMonth = currentMonth.daysInMonth();
    for (let d = 1; d <= daysInMonth; d++) {
      const date = dayjs(new Date(year, month, d));
      if (date.day() !== 0 && date.day() !== 6) {
        jours.push(date);
      }
    }
    setJoursOuvres(jours);
  }, [currentMonth]);

  const toggleAbsence = (dateStr) => {
    setAbsences((prev) =>
      prev.includes(dateStr)
        ? prev.filter((d) => d !== dateStr)
        : [...prev, dateStr]
    );
  };

  const salaireParJour = salaire && joursOuvres.length
    ? salaire / joursOuvres.length
    : 0;

  const salaireFinal =
    salaireParJour * (joursOuvres.length - absences.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00264d] to-[#004080] text-white py-8 px-4">
      <div className="max-w-5xl mx-auto bg-white text-black shadow-2xl rounded-2xl p-6">
        <h1 className="text-3xl font-extrabold text-center text-[#00264d] mb-6">
          Simulateur de Salaire Journalier - Maroc
        </h1>

        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <label className="font-medium">Salaire net mensuel (DH) :</label>
          <Input
            type="number"
            value={salaire}
            onChange={(e) => setSalaire(Number(e.target.value))}
            className="w-full sm:w-40 border border-gray-300"
          />
        </div>

        <div className="mb-4 flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => setCurrentMonth(currentMonth.subtract(1, "month"))}
            className="text-sm text-blue-800 border-blue-800"
          >
            <ChevronLeft className="w-5 h-5" /> Mois précédent
          </Button>
          <h2 className="text-lg font-bold text-[#004080]">
            {currentMonth.format("MMMM YYYY")}
          </h2>
          <Button
            variant="outline"
            onClick={() => setCurrentMonth(currentMonth.add(1, "month"))}
            className="text-sm text-blue-800 border-blue-800"
          >
            Mois suivant <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        <div className="mb-6 text-lg font-semibold text-green-700">
          Salaire estimé pour ce mois : {salaireFinal.toFixed(2)} DH
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {joursOuvres.map((date) => {
            const dateStr = date.format("YYYY-MM-DD");
            const isAbsent = absences.includes(dateStr);

            return (
              <Card
                key={dateStr}
                className={`transition shadow-md hover:shadow-xl border-2 cursor-pointer text-center ${
                  isAbsent ? "bg-red-100 border-red-300" : "bg-blue-50 border-blue-200"
                }`}
                onClick={() => toggleAbsence(dateStr)}
              >
                <CardContent className="p-4">
                  <div className="text-sm font-semibold text-gray-800">
                    {date.format("dddd D MMMM")}
                  </div>
                  <div className="text-lg font-bold mt-2">
                    {isAbsent ? "Absent" : `${salaireParJour.toFixed(2)} DH`}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 text-xs text-red-600 hover:underline"
                  >
                    Retirer ce jour
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
