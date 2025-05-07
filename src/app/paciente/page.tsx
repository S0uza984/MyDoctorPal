"use client";
export default function Dashboard() {
    const upcomingAppointments = [
      {
        id: 1,
        doctor: "Dr. Carlos Silva",
        specialty: "Cardiologia",
        date: "20/04/2025",
        time: "14:30",
      },
      {
        id: 2,
        doctor: "Dra. Ana Souza",
        specialty: "Clínica Geral",
        date: "27/04/2025",
        time: "10:00",
      },
    ];
  
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Bem-vindo ao MyDoctorPal</h2>
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Próximas Consultas</h3>
          {upcomingAppointments.length > 0 ? (
            <div className="space-y-3">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="border rounded-lg p-3 bg-white shadow-sm">
                  <h4 className="font-bold">{appointment.doctor}</h4>
                  <p className="text-gray-600">{appointment.specialty}</p>
                  <p className="text-sm">{appointment.date} - {appointment.time}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">Você não tem consultas agendadas.</p>
          )}
        </div>
      </div>
    );
  }