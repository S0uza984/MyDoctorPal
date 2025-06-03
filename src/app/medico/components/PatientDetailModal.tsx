'use client';
import { useState } from 'react';

type Props = {
  patient: any;
  onClose: () => void;
}

// Função para calcular idade a partir da data de nascimento (YYYY-MM-DD)
function calcularIdade(dataNascimento: string) {
  if (!dataNascimento) return '';
  const hoje = new Date();
  const partes = dataNascimento.split('-');
  const ano = parseInt(partes[0], 10);
  const mes = parseInt(partes[1], 10) - 1;
  const dia = parseInt(partes[2], 10);
  const nascimento = new Date(ano, mes, dia);

  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const m = hoje.getMonth() - nascimento.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }
  return idade;
}

export default function PatientDetailsModal({ patient, onClose }: Props) {
  const [notes, setNotes] = useState(patient.anotacao?.[0]?.Conteudo || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const usuario = patient.pacientes?.usuarios;
  const formulario = patient.pacientes?.formularios?.[0];
  const dataNascimento = patient.dataNascimento || patient.pacientes?.Data_Nascimento || '';

  // Corrige o fuso horário manualmente (soma 3 horas)
  const dateObj = new Date(patient.Data_Horario);
  dateObj.setHours(dateObj.getHours() + 3);

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
          <p className="text-gray-600">
            Idade: {dataNascimento ? calcularIdade(dataNascimento) : ''}
          </p>
          <p className="text-gray-600">
            Consulta: {dateObj.toLocaleDateString('pt-BR')} às{" "}
            {dateObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
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
            {patient.historico && patient.historico.length > 0 ? (
              patient.historico.map((h: any, idx: number) => (
                <div key={idx} className="bg-gray-50 p-2 rounded border">
                  <p className="font-medium">
                    {new Date(h.Data_Horario).toLocaleDateString('pt-BR')}
                  </p>
                  <p className="text-sm">{h.Descricao}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">Nenhum histórico encontrado.</p>
            )}
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