'use client';

export default function HistoricoPage() {
  const historico = [
    { doctor: 'Dr. Carlos Silva', specialty: 'Cardiologia', date: '10/03/2025', time: '14:30' },
    { doctor: 'Dra. Ana Souza', specialty: 'Clínica Geral', date: '25/02/2025', time: '10:00' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4">
        <h1 className="text-xl font-bold mb-4">Histórico de Consultas</h1>
        <div className="space-y-3">
          {historico.map((h, i) => (
            <div key={i} className="border rounded-lg p-3 bg-gray-50">
              <h4 className="font-bold">{h.doctor}</h4>
              <p className="text-gray-600">{h.specialty}</p>
              <p className="text-sm">{h.date} - {h.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
