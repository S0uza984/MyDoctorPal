"use client";
export default function Notificacoes() {
  const notifications = [
    {
      id: 1,
      type: "confirmed",
      doctor: "Dr. Carlos Silva",
      specialty: "Cardiologia",
      date: "20/04/2025",
      time: "14:30",
    },
    {
      id: 2,
      type: "canceled",
      doctor: "Dra. Ana Souza",
      specialty: "Clínica Geral",
      date: "15/04/2025",
      time: "10:00",
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Notificações</h2>
      <div className="space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-3 rounded-lg border ${
              notification.type === "confirmed"
                ? "bg-blue-50 border-blue-200"
                : "bg-red-50 border-red-200"
            }`}
          >
            <h3 className="font-bold">
              {notification.type === "confirmed" ? "Consulta Confirmada" : "Consulta Cancelada"}
            </h3>
            <p>{notification.doctor} - {notification.specialty}</p>
            <p className="text-sm">{notification.date} - {notification.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}