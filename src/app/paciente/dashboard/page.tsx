'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DashboardPage() {
  const router = useRouter();

  const [upcomingAppointments, setUpcomingAppointments] = useState([
    { id: 1, doctor: "Dr. Carlos Silva", specialty: "Cardiologia", date: "20/04/2025", time: "14:30" },
    { id: 2, doctor: "Dra. Ana Souza", specialty: "Clínica Geral", date: "27/04/2025", time: "10:00" }
  ]);

  const handleCancel = (id: number) => {
    setUpcomingAppointments(prev => prev.filter(a => a.id !== id));
  };

  return (
    <>
      <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Minhas Consultas</h1>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Próximas Consultas</h3>
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm"
            onClick={() => router.push('/paciente/agenda')}
          >
            + Agendar
          </button>
        </div>

        {upcomingAppointments.length > 0 ? (
          <div className="space-y-3">
            {upcomingAppointments.map(appointment => (
              <div key={appointment.id} className="border rounded-lg p-3 bg-white shadow-sm flex justify-between">
                <div>
                  <h4 className="font-bold">{appointment.doctor}</h4>
                  <p className="text-gray-600">{appointment.specialty}</p>
                  <p className="text-sm">{appointment.date} - {appointment.time}</p>
                </div>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-md text-sm h-8"
                  onClick={() => handleCancel(appointment.id)}
                >
                  Cancelar
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">Você não tem consultas agendadas.</p>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Próximas 24 horas</h3>
        {upcomingAppointments.some(apt => apt.date === "20/04/2025") ? (
          <div className="bg-blue-100 p-3 rounded-lg border border-blue-200">
            <p>Você tem uma consulta com Dr. Carlos Silva</p>
            <p className="font-semibold">Amanhã às 14:30</p>
          </div>
        ) : (
          <p className="text-gray-500 italic">Sem consultas nas próximas 24 horas.</p>
        )}
      </div>
      </div>
    </>
  );
}
