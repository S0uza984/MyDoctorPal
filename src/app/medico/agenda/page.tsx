'use client';
import { useState, useEffect } from 'react';
import PatientDetailsModal from '../components/PatientDetailModal';

export default function AgendaPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];
  const weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'];

  useEffect(() => {
    async function fetchConsultas() {
      const res = await fetch('/api/consultas/medico');
      const data = await res.json();
      if (data.consultas) {
        // Mapeia para o formato esperado pelo componente
        setAppointments(
          data.consultas.map((c: any) => ({
            id: c.ID_Consulta,
            patient: c.pacientes.usuarios.Nome,
            age: c.pacientes.formularios?.[0]?.Idade || '',
            reason: c.Descricao,
            date: c.Data_Horario.split('T')[0],
            time: c.Data_Horario.split('T')[1]?.slice(0,5),
            day: new Date(c.Data_Horario).toLocaleDateString('pt-BR', { weekday: 'short' }),
            full: c
          }))
        );
      }
    }
    fetchConsultas();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Minha Agenda Semanal</h1>

      <div className="flex mb-4">
        <div className="w-20">
          <div className="h-10" />
          {timeSlots.map((time, i) => (
            <div key={i} className="h-16 flex items-center justify-center text-gray-500">{time}</div>
          ))}
        </div>

        {weekDays.map((day, i) => (
          <div key={i} className="flex-1">
            <div className="h-10 flex items-center justify-center font-bold border-b">{day}</div>
            {timeSlots.map((time, j) => {
              const apt = appointments.find(a => a.day === day && a.time === time);
              return (
                <div key={j} className="h-16 border border-gray-100 relative">
                  {apt && (
                    <div
                      className="absolute inset-1 bg-blue-100 rounded p-2 cursor-pointer"
                      onClick={() => {
                        setSelectedPatient(apt.full);
                        setShowModal(true);
                      }}
                    >
                      <p className="font-medium">{apt.patient}</p>
                      <p className="text-xs">{apt.time}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {showModal && selectedPatient && (
        <PatientDetailsModal
          patient={selectedPatient}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
