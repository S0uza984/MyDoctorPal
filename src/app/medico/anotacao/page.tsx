'use client';
import { useState } from "react";

export default function AnotacoesPage() {
  const [patientsWithNotes, setPatientsWithNotes] = useState([
    {
      id: 1,
      name: "João Silva",
      lastConsultation: "20/04/2025",
      notes: [
        {
          date: "20/04/2025",
          content: "Paciente apresentou dores no peito e falta de ar. Solicitado ecocardiograma.",
        },
        {
          date: "15/03/2025",
          content: "Queixa de dores no peito. Receitado exames cardíacos.",
        },
      ],
    },
    {
      id: 2,
      name: "Ana Costa",
      lastConsultation: "11/04/2025",
      notes: [
        {
          date: "11/04/2025",
          content: "Paciente com cefaleia frequente. Requisitada tomografia craniana.",
        },
      ],
    },
    {
      id: 3,
      name: "Pedro Dias",
      lastConsultation: "09/04/2025",
      notes: [],
    },
  ]);

  const [selectedPatient, setSelectedPatient] = useState(null);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Histórico de Anotações</h2>
      <div className="flex">
        <div className="w-1/3 pr-4 border-r">
          <input
            type="text"
            placeholder="Buscar paciente..."
            className="w-full p-2 border rounded-md mb-4"
          />
          <div className="space-y-2">
            {patientsWithNotes.map((patient) => (
              <div
                key={patient.id}
                className={`p-3 border rounded-md cursor-pointer ${
                  selectedPatient && selectedPatient.id === patient.id
                    ? "bg-blue-50 border-blue-300"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => setSelectedPatient(patient)}
              >
                <p className="font-medium">{patient.name}</p>
                <p className="text-sm text-gray-600">Última consulta: {patient.lastConsultation}</p>
                <p className="text-xs text-gray-500">
                  {patient.notes.length} {patient.notes.length === 1 ? "anotação" : "anotações"}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-2/3 pl-4">
          {selectedPatient ? (
            <div>
              <h3 className="text-lg font-bold mb-3">{selectedPatient.name}</h3>
              {selectedPatient.notes.length > 0 ? (
                <div className="space-y-4">
                  {selectedPatient.notes.map((note, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-white">
                      <p className="font-medium">Consulta: {note.date}</p>
                      <p className="text-gray-700">{note.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">Não há anotações para este paciente.</p>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <p>Selecione um paciente para ver o histórico de anotações</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}