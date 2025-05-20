'use client';

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  useEffect(() => {
    async function fetchAppointments() {
      const res = await fetch("/api/consultas/paciente");
      const data = await res.json();
      setUpcomingAppointments(data.consultas || []);
    }
    fetchAppointments();
    const interval = setInterval(fetchAppointments, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleCancel = async (id) => {
  const res = await fetch(`/api/consultas/${id}`, { method: "DELETE" });
  const data = await res.json();
  console.log("Resposta do backend:", data); // Veja a resposta aqui!
  setUpcomingAppointments(prev => prev.filter(a => a.ID_Consulta !== id));
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-1">Próximas Consultas</h2>
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm"
          onClick={() => router.push('/paciente/agenda')}
        >
          + Agendar
        </button>
      </div>
      {upcomingAppointments.length > 0 ? (
        <div className="space-y-3">
          {upcomingAppointments.map((consulta, idx) => (
            <div key={consulta.id || idx} className="border rounded-lg p-3 bg-white shadow-sm flex justify-between items-center">
              <div>
                <span className="font-bold">
                  Dr(a). {consulta.medico?.Nome}
                </span>
                <br />
                <span className="text-gray-600">
                  {consulta.medicos?.Especialidade}
                </span>
                <br />
                <span className="text-sm">
                  {(() => {
                    const data = new Date(consulta.Data_Horario);
                    data.setHours(data.getHours() + 3);
                    return (
                      <>
                        {data.toLocaleDateString("pt-BR")} - {data.toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' })}
                      </>
                    );
                  })()}
                </span>
              </div>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded-md text-sm h-8"
                onClick={() => handleCancel(consulta.ID_Consulta)}
              >
                Cancelar
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">Você não tem consultas agendadas.</p>
      )}
    </div>
  );
}