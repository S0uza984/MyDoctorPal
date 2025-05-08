'use client';
import React from "react";

interface PatientDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: {
    name: string;
    age: number;
    email: string;
    phone: string;
    medicalHistory: string[];
  } | null;
}

export default function PatientDetailModal({ isOpen, onClose, patient }: PatientDetailModalProps) {
  if (!isOpen || !patient) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-xl font-bold mb-4">Detalhes do Paciente</h2>
        <div className="space-y-2">
          <p>
            <strong>Nome:</strong> {patient.name}
          </p>
          <p>
            <strong>Idade:</strong> {patient.age} anos
          </p>
          <p>
            <strong>Email:</strong> {patient.email}
          </p>
          <p>
            <strong>Telefone:</strong> {patient.phone}
          </p>
          <div>
            <strong>Histórico Médico:</strong>
            <ul className="list-disc list-inside">
              {patient.medicalHistory.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}