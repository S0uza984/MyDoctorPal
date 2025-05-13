'use client';
export default function NotificacoesPage() {
  const notifications = [
    { id: 1, type: 'confirmed', doctor: 'Dr. Carlos Silva', date: '20/04/2025', time: '14:30' },
    { id: 2, type: 'canceled', doctor: 'Dra. Ana Souza', date: '15/04/2025', time: '10:00' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4">
        <h1 className="text-xl font-bold mb-4">Notificações</h1>
        <div className="space-y-3">
          {notifications.map(n => (
            <div key={n.id} className={`p-3 rounded-lg border ${n.type === 'confirmed' ? 'bg-blue-50 border-blue-200' : 'bg-red-50 border-red-200'}`}>
              <h3 className="font-bold">{n.type === 'confirmed' ? 'Consulta Confirmada' : 'Consulta Cancelada'}</h3>
              <p>{n.doctor}</p>
              <p className="text-sm">{n.date} - {n.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
