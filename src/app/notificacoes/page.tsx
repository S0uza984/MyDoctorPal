import { useEffect, useState } from "react";

export default function Notificacoes() {
  // Simulação: ID do paciente logado
  const pacienteId = 1;
  const [consultas, setConsultas] = useState([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function fetchConsultas() {
      try {
        const res = await fetch(`/api/notificacoes/paciente?pacienteId=${pacienteId}`);
        const data = await res.json();
        if (res.ok) {
          setConsultas(data.consultas);
        } else {
          setErro(data.error || "Erro ao buscar notificações");
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
        <h4 className="text-blue-500 font-semibold">Consultas</h4>
        <ul className="space-y-2 text-gray-700 text-sm">
          <li>Histórico</li>
          <li className="font-semibold text-blue-500">Notificações</li>
          <li>Perfil</li>
          <li>Sair</li>
        </ul>
      </aside>
      <main className="flex-1">
        <header className="bg-blue-500 text-white px-6 py-3 flex justify-between">
          <span>MyDoctorPal</span>
          <span>Olá, João</span>
        </header>
        <section className="p-6">
          <h2 className="text-xl font-semibold mb-4">Notificações</h2>
          {erro && <div className="text-red-500 mb-4">{erro}</div>}
          {consultas.length === 0 && !erro && <div>Nenhuma notificação encontrada.</div>}
          <div className="space-y-4">
            {consultas.map((consulta) => (
              <div key={consulta.ID_Consulta} className={`border rounded p-4 text-sm mb-2 ${consulta.Status_ === 'CONFIRMADA' ? 'bg-blue-100 border-blue-300' : 'bg-red-100 border-red-300'}`}>
                <div className="font-bold">Consulta {consulta.Status_ === 'CONFIRMADA' ? 'Confirmada' : 'Cancelada'}</div>
                <div>Dr(a). {consulta.medicos.usuarios.Nome} - {consulta.medicos.Especialidade}</div>
                <div>{new Date(consulta.Data_).toLocaleDateString()} - {consulta.Horario}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
  