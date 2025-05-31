import { useEffect, useState } from 'react';

export default function NotificacaoPage() {
  const [notificacoes, setNotificacoes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotificacoes() {
      const res = await fetch('/api/notificacao/medico');
      const data = await res.json();
      setNotificacoes(data.notificacoes || []);
      setLoading(false);
    }
    fetchNotificacoes();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Notificações</h2>
      {loading ? (
        <p>Carregando...</p>
      ) : notificacoes.length === 0 ? (
        <p>Nenhuma notificação encontrada.</p>
      ) : (
        <div className="space-y-3">
          {notificacoes.map((n) => (
            <div
              key={n.id}
              className={`p-3 rounded-lg border ${n.tipo === 'Nova Consulta Agendada' ? 'bg-blue-50 border-blue-200' : 'bg-red-50 border-red-200'}`}
            >
              <h3 className="font-bold">{n.tipo}</h3>
              <p>{n.paciente} - {new Date(n.data).toLocaleDateString()} às {new Date(n.data).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}