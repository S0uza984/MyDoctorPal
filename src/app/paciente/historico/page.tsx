"use client";
export default function Historico() {
    const pastAppointments = [
      {
        id: 1,
        doctor: "Dr. Carlos Silva",
        specialty: "Cardiologia",
        date: "10/03/2025",
        time: "14:30",
      },
      {
        id: 2,
        doctor: "Dra. Ana Souza",
        specialty: "Clínica Geral",
        date: "15/02/2025",
        time: "10:00",
      },
    ];
  
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Histórico de Consultas</h2>
        <div className="space-y-3">
          {pastAppointments.map((appointment) => (
            <div key={appointment.id} className="border rounded-lg p-3 bg-white shadow-sm">
              <h4 className="font-bold">{appointment.doctor}</h4>
              <p className="text-gray-600">{appointment.specialty}</p>
              <p className="text-sm">{appointment.date} - {appointment.time}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }