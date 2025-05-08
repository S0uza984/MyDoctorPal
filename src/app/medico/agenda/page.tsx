'use client';
import { useState } from "react";

export default function AgendaPage() {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patient: "Pedro Dias",
      age: 35,
      reason: "",
      date: "2025-04-29",
      time: "09:00",
      day: "Sex",
    },
    {
      id: 2,
      patient: "Ana Costa",
      age: 28,
      reason: "Dor de cabeça frequente",
      date: "2025-04-29",
      time: "11:00",
      day: "Qua",
    },
    {
      id: 3,
      patient: "João Silva",
      age: 42,
      reason: "Dores no peito e falta de ar",
      date: "2025-04-29",
      time: "14:30",
      day: "Ter",
    },
  ]);

  const timeSlots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];
  const weekDays = ["Seg", "Ter", "Qua", "Qui", "Sex"];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Minha Agenda Semanal</h2>
      <div className="flex mb-4">
        <div className="w-20">
          <div className="h-10"></div> {/* Empty cell for alignment */}
          {timeSlots.map((time, index) => (
            <div key={index} className="h-16 flex items-center justify-center text-gray-500">
              {time}
            </div>
          ))}
        </div>
        {weekDays.map((day, dayIndex) => (
          <div key={dayIndex} className="flex-1">
            <div className="h-10 flex items-center justify-center font-bold border-b">
              {day}
            </div>
            {timeSlots.map((time, timeIndex) => {
              const appointment = appointments.find(
                (apt) => apt.day === day && apt.time === time
              );
              return (
                <div key={timeIndex} className="h-16 border border-gray-100 relative">
                  {appointment && (
                    <div className="absolute inset-1 bg-blue-100 rounded p-2">
                      <p className="font-medium">{appointment.patient}</p>
                      <p className="text-xs">{appointment.time}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}