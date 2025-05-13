'use client';
import { useState } from 'react';

type Props = {
  patient: {
    id: number;
    patient: string;
    age: number;
    reason?: string;
    date: string;
    time: string;
  };
  onClose: () => void;
};

export default function PatientDetailsModal({ patient, onClose }: Props) {
  const [notes, setNotes] = useState('');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Detalhes do Paciente</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-bold">{patient.patient}</h3>
          <p className="text-gray-600">Idade: {patient.age} anos</p>
          <p className="text-gray-600">
            Consulta: {patient.date.replace('2025-04-', '')}/04 às {patient.time}
          </p>
        </div>

        <div className="mb-6">
          <h4 className="font-medium mb-2">Informações Médicas</h4>
          <div className="bg-gray-50 p-3 rounded border mb-3">
            <p><strong>Alergias:</strong> Penicilina</p>
            <p><strong>Medicamentos em uso:</strong> Losartana</p>
            <p><strong>Condições médicas:</strong> Hipertensão</p>
          </div>

          {patient.reason && (
            <div>
              <h4 className="font-medium mb-1">Motivo da Consulta</h4>
              <p className="bg-blue-50 p-3 rounded border">{patient.reason}</p>
            </div>
          )}
        </div>

        <div className="mb-6">
          <h4 className="font-medium mb-2">Histórico de Consultas</h4>
          <div className="space-y-2">
            <div className="bg-gray-50 p-2 rounded border">
              <p className="font-medium">15/03/2025</p>
              <p className="text-sm">Queixa de dores no peito. Exames cardíacos solicitados.</p>
            </div>
            <div className="bg-gray-50 p-2 rounded border">
              <p className="font-medium">28/02/2025</p>
              <p className="text-sm">Consulta de rotina. Pressão arterial estável.</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Anotações da Consulta</h4>
          <textarea
            className="w-full p-3 border rounded min-h-24"
            placeholder="Digite suas anotações sobre a consulta aqui..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
            onClick={onClose}
          >
            Fechar
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => {
              alert('Anotações salvas com sucesso!');
              onClose();
            }}
          >
            Salvar Anotações
          </button>
        </div>
      </div>
    </div>
  );
}
