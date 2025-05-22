'use client';
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function NotificacoesPage() {

  const { data: session } = useSession(); // Obter a sessão do usuário
  const idPaciente = session?.user?.id; // ID do paciente logado
  const [error, setError] = useState(""); // Estado para erros
  const [isLoading, setIsLoading] = useState(true); // Estado de carregamento
  const [notifications, setNotifications] = useState([]); // Estado para notificações
useEffect(() => 
  {
     if (!session) {
      console.log("Sessão ainda não carregada");
      return;
    }
    if (!idPaciente) {
      console.log("ID do paciente não encontrado");
      setError("ID do paciente não encontrado.");
      setIsLoading(false); // Finaliza o carregamento
      return;
    }
    const fetchData = async () => {
      try {
        const response = await fetch('/api/consultas/paciente', {
          method: 'GET',
          headers: {
            authorization: `Bearer ${idPaciente}`, // Inclui o ID no header
          }
        });
        const data = await response.json();
        console.log("Dados recebidos:", data);
        if (data.consultas) {
          console.log("Consultas recebidas:", data.consultas);
          const notifications = data.consultas.map(consulta => {
  const dataHorario = new Date(consulta.Data_Horario);
  // Adiciona 3 horas
  dataHorario.setHours(dataHorario.getHours() + 3);

  return {
    id: consulta.ID_Consulta,
    type: consulta.Status_,
    doctor: `Dr(a). ${consulta.medico.Nome}`,
    date: dataHorario.toLocaleDateString("pt-BR"),
    time: dataHorario.toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' }),
  };
});
  setNotifications(notifications);
        } else {
          setError("Nenhuma notificação encontrada.");
        }
      }
catch (error) {
    console.error("Erro ao buscar notificações:", error);
     setError(error.message || "Erro ao buscar dados.");
  }
      finally {
        setIsLoading(false); // Finaliza o carregamento
      }
    }
    fetchData();
  }, [session,idPaciente]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Carregando...</div>;
  }


  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4">
        <h1 className="text-xl font-bold mb-4">Notificações</h1>
        <div className="space-y-3">
          {notifications.map(n => (
            <div key={n.id} className={`p-3 rounded-lg border ${n.type === 'CONFIRMADA' ? 'bg-blue-50 border-blue-200' : 'bg-red-50 border-red-200'}`}>
              <h3 className="font-bold">{n.type === 'CONFIRMADA' ? 'Consulta Confirmada' : 'Consulta Cancelada'}</h3>
              <p>{n.doctor}</p>
              <p className="text-sm">{n.date} - {n.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
