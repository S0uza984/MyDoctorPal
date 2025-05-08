export default function NotificacaoPage() {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Notificações</h2>
        <div className="space-y-3">
          <div className="p-3 rounded-lg border bg-blue-50 border-blue-200">
            <h3 className="font-bold">Nova Consulta Agendada</h3>
            <p>João Silva - 20/04/2025 às 14:30</p>
          </div>
          <div className="p-3 rounded-lg border bg-red-50 border-red-200">
            <h3 className="font-bold">Consulta Cancelada</h3>
            <p>Ana Costa - 15/04/2025 às 10:00</p>
          </div>
        </div>
      </div>
    );
  }