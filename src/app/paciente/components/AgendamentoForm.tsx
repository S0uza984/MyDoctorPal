'use client';
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function AgendamentoForm() {
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [horarioSelecionado, setHorarioSelecionado] = useState("");
  const [especialidades, setEspecialidades] = useState<string[]>([]);
  const [medicos, setMedicos] = useState<any[]>([]);
  const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState("");
  const [medicoSelecionado, setMedicoSelecionado] = useState("");
  const [motivo, setMotivo] = useState("");
  const { data: session } = useSession();
  const idUsuario = session?.user?.id;
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    fetch("/api/agenda/paciente")
      .then(res => res.json())
      .then(data => {
        setEspecialidades(data.especialidades);
        setMedicos(data.medicos);
      });
  }, []);

  const medicosFiltrados = especialidadeSelecionada
    ? medicos.filter(m => m.especialidade === especialidadeSelecionada)
    : [];

  const handleAgendar = async (e: React.FormEvent) => {
  e.preventDefault();

  const res = await fetch("/api/agenda/paciente", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      idUsuario,
      medicoSelecionado,
      dataSelecionada,
      horarioSelecionado,
      motivo,
    }),
  });

  const data = await res.json();
  if (res.ok && data.ok) {
    setMensagem("Agendamento realizado com sucesso!");
  } else {
    setMensagem(data.error || "Erro ao agendar.");
  }
};

  return (
    <form className="space-y-4" onSubmit={handleAgendar}>
      <div>
        <label className="block text-sm font-medium mb-1">Especialidade:</label>
        <select
          className="w-full p-2 border rounded-md"
          value={especialidadeSelecionada}
          onChange={e => setEspecialidadeSelecionada(e.target.value)}
          required
        >
          <option value="">Selecione uma especialidade</option>
          {especialidades.map(esp => (
            <option key={esp} value={esp}>{esp}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Médico:</label>
        <select
          className="w-full p-2 border rounded-md"
          value={medicoSelecionado}
          onChange={e => setMedicoSelecionado(e.target.value)}
          required
        >
          <option value="">Selecione um médico</option>
          {medicosFiltrados.map(med => (
            <option key={med.id} value={med.id}>{med.nome}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Data:</label>
        <input
          type="date"
          className="w-full p-2 border rounded-md"
          value={dataSelecionada}
          onChange={e => setDataSelecionada(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Horário:</label>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 11 }, (_, i) => {
            const hora = 8 + i;
            const horaStr = hora.toString().padStart(2, "0") + ":00";
            return (
              <button
                key={horaStr}
                type="button"
                className={`p-2 rounded border font-semibold ${
                  horarioSelecionado === horaStr
                    ? "bg-blue-500 text-white"
                    : "bg-white text-blue-500 border-blue-500"
                }`}
                onClick={() => setHorarioSelecionado(horaStr)}
              >
                {horaStr}
              </button>
            );
          })}
        </div>
      </div>
       <div>
        <label className="block text-sm font-medium mb-1">Motivo da consulta:</label>
        <textarea
          className="w-full p-2 border rounded-md"
          value={motivo}
          onChange={e => setMotivo(e.target.value)}
          required
          rows={2}
          placeholder="Descreva o motivo da consulta"
        />
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-500 text-white py-1 px-6 rounded-full font-semibold mt-2 text-sm"
          disabled={
            !especialidadeSelecionada ||
            !medicoSelecionado ||
            !dataSelecionada ||
            !horarioSelecionado ||
            !motivo
          }
        >
          Confirmar
        </button>
      </div>
      {mensagem && (
        <div className={`text-center text-sm mt-4 ${mensagem.includes("sucesso") ? "text-green-600" : "text-red-600"}`}>
        {mensagem}
        </div>
        )}
    </form>
  );
}
