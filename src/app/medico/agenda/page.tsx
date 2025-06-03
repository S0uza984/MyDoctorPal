'use client';
import { useState, useEffect } from 'react';
import PatientDetailsModal from '../components/PatientDetailModal';

export default function AgendaPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const timeSlots = ['08:00','09:00', '10:00', '11:00','12:00','13:00', '14:00', '15:00', '16:00', '17:00','18:00'];
  const weekDays = ['seg', 'ter', 'qua', 'qui', 'sex'];

  useEffect(() => {
  async function fetchConsultas() {
    const res = await fetch('/api/consultas/medico');
    const data = await res.json();
    if (data.consultas) {
      const hoje = new Date();
      let inicioSemana, fimSemana;

      if (hoje.getDay() === 0) {
        // Se hoje é domingo, pega a próxima segunda
        inicioSemana = new Date(hoje);
        inicioSemana.setDate(hoje.getDate() + 1);
      } else {
        // Senão, pega a segunda da semana atual
        const diffSegunda = 1 - hoje.getDay();
        inicioSemana = new Date(hoje);
        inicioSemana.setDate(hoje.getDate() + diffSegunda);
      }
      inicioSemana.setHours(0, 0, 0, 0);

      fimSemana = new Date(inicioSemana);
      fimSemana.setDate(inicioSemana.getDate() + 4);
      fimSemana.setHours(23, 59, 59, 999);

      setAppointments(
        data.consultas
          .filter((c: any) => {
            const dataConsulta = new Date(c.Data_Horario);
            return dataConsulta >= inicioSemana && dataConsulta <= fimSemana;
          })
          .map((c: any) => {
            const dateObj = new Date(c.Data_Horario);
            const day = dateObj
              .toLocaleDateString('pt-BR', { weekday: 'short' })
              .replace('.', '')
              .toLowerCase();
            return {
              id: c.ID_Consulta,
              patient: c.pacientes.usuarios.Nome,
              reason: c.Descricao,
              date: c.Data_Horario.split('T')[0],
              time: c.Data_Horario.split('T')[1]?.slice(0,5),
              day,
              full: c
            };
          })
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
            <div className="h-10 flex items-center justify-center font-bold border-b">
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </div>
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