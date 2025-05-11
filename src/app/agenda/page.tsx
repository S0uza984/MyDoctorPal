import { useEffect, useState } from "react";

export default function Agenda() {
  // Simulação: ID do médico logado
  const medicoId = 1;
  const [consultas, setConsultas] = useState([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function fetchConsultas() {
      try {
        const res = await fetch(`/api/agenda/medico?medicoId=${medicoId}`);
        const data = await res.json();
        if (res.ok) {
          setConsultas(data.consultas);
        } else {
          setErro(data.error || "Erro ao buscar agenda");
        }
      } catch (e) {
        setErro("Erro ao conectar com o servidor.");
      }
    }
    fetchConsultas();
  }, []);

  return (
    <div className="min-h-screen flex">
      <aside className="w-48 bg-white border-r p-4 space-y-4">
        <h4 className="text-blue-500 font-semibold">Agenda</h4>
        <ul className="space-y-2 text-gray-700 text-sm">
          <li className="hover:text-blue-500 cursor-pointer">Notificações</li>
          <li className="hover:text-blue-500 cursor-pointer">Perfil</li>
          <li className="hover:text-blue-500 cursor-pointer">Sair</li>
        </ul>
      </aside>
      <main className="flex-1">
        <header className="bg-blue-500 text-white px-6 py-3 flex justify-between">
          <span>MyDoctorPal</span>
          <span>Dr. Carlos Silva</span>
        </header>
        <section className="p-6">
          <h2 className="text-xl font-semibold mb-4">Minha Agenda</h2>
          {erro && <div className="text-red-500 mb-4">{erro}</div>}
          {consultas.length === 0 && !erro && <div>Nenhuma consulta encontrada.</div>}
          <div className="space-y-4">
            {consultas.map((consulta) => (
              <div key={consulta.ID_Consulta} className="p-4 border rounded bg-white">
                <div><strong>Paciente:</strong> {consulta.pacientes.usuarios.Nome}</div>
                <div><strong>Data:</strong> {new Date(consulta.Data_).toLocaleDateString()} <strong>Horário:</strong> {consulta.Horario}</div>
                <div><strong>Status:</strong> {consulta.Status_}</div>
                <div><strong>Descrição:</strong> {consulta.Descricao || "-"}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
  