'use client';

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function HistoricoPage() {
  const { data: session } = useSession();
  const idPaciente = session?.user?.id;
  const [historico, setHistorico] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!session) return;
    if (!idPaciente) {
      setError("ID do paciente não encontrado.");
      setIsLoading(false);
      return;
    }
    const fetchData = async () => {
      try {
        const response = await fetch('/api/historico/paciente', {
          method: 'GET',
          headers: {
            authorization: `Bearer ${idPaciente}`,
          }
        });
        const data = await response.json();
        if (data.consultas) {
          setHistorico(data.consultas.map(c => {
            const dataHorario = new Date(c.Data_Horario);
            dataHorario.setHours(dataHorario.getHours() + 3); // Soma 3 horas

            const medico = c.medico || (Array.isArray(c.medicos) ? c.medicos[0] : c.medicos) || {};

            return {
              doctor: `Dr(a). ${medico.Nome || "Desconhecido"}`,
              specialty: c.medicos.Especialidade || "Especialidade não informada",
              date: dataHorario.toLocaleDateString("pt-BR"),
              time: dataHorario.toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' }),
            };
          }));
        } else {
          setError("Nenhum histórico encontrado.");
        }
      } catch (error) {
        setError("Erro ao buscar histórico.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [session, idPaciente]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Carregando...</div>;
  }

  console.log("Qtd consultas:", historico.length, historico);

  return (
  <div className="flex h-screen bg-gray-100">
    <div className="flex-1 p-4" style={{ maxHeight: '100vh', overflowY: 'auto' }}>
      <h1 className="text-xl font-bold mb-4">Histórico de Consultas</h1>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="space-y-3">
        {historico.length > 0 ? (
          historico.map((h, i) => (
            <div key={i} className="border rounded-lg p-3 bg-gray-50">
              <h4 className="font-bold">{h.doctor}</h4>
              <p className="text-gray-600">{h.specialty}</p>
              <p className="text-sm">{h.date} - {h.time}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">Você não tem histórico de consultas.</p>
        )}
      </div>
    </div>
  </div>
);
}