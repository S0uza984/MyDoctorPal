'use client';
import AgendamentoForm from '../components/AgendamentoForm';

export default function AgendaPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4">
        <h1 className="text-xl font-bold mb-4">Agendar Consulta</h1>
        <AgendamentoForm />
      </div>
    </div>
  );
}
