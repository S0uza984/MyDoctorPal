'use client';
import { useState } from 'react';

interface Props {
  patient: any;
  onClose: () => void;
}

export default function PatientDetailsModal({ patient, onClose }: Props) {
  const [notes, setNotes] = useState(patient.anotacao?.[0]?.Conteudo || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const usuario = patient.pacientes?.usuarios;
  const formulario = patient.pacientes?.formularios?.[0];

  async function handleSave() {
    if (!notes.trim()) {
      setError("Por favor, adicione uma anotação antes de salvar.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const response = await fetch(`/api/anotacao`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idConsulta: patient.ID_Consulta,
          conteudo: notes,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar anotação');
      }

      onClose();
    } catch (error) {
      setError("Erro ao salvar anotação. Tente novamente.");
      console.error("Erro ao salvar anotação:", error);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Detalhes do Paciente</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-bold">{usuario?.Nome}</h3>
          <p className="text-gray-600">Idade: {formulario ? formulario.Idade || '' : ''}</p>
          <p className="text-gray-600">
            Consulta: {new Date(patient.Data_Horario).toLocaleDateString()} às {new Date(patient.Data_Horario).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>

        <div className="mb-6">
          <h4 className="font-medium mb-2">Informações Médicas</h4>
          <div className="bg-gray-50 p-3 rounded border mb-3">
            <p><strong>Alergias:</strong> {formulario?.Alergia || '-'}</p>
            <p><strong>Medicamentos em uso:</strong> {formulario?.Medicamento || '-'}</p>
            <p><strong>Condições médicas:</strong> {formulario?.Condicao_Medica || '-'}</p>
          </div>
          {patient.Descricao && (
            <div>
              <h4 className="font-medium mb-1">Motivo da Consulta</h4>
              <p className="bg-blue-50 p-3 rounded border">{patient.Descricao}</p>
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
            className="w-full p-3 border rounded min-h-32 mb-2"
            placeholder="Digite suas anotações sobre a consulta aqui..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <button
            className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
            onClick={onClose}
          >
            Fechar
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'Salvando...' : 'Salvar Anotações'}
          </button>
        </div>
      </div>
    </div>
  );
}
