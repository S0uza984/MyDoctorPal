'use client';
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function AnotacoesPage() {
  const { data: session } = useSession();
  const [patientsWithNotes, setPatientsWithNotes] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('/api/anotacao');
        const data = await response.json();
        if (data.pacientes) {
          setPatientsWithNotes(data.pacientes);
        }
      } catch (error) {
        setError("Erro ao carregar anotações.");
        console.error("Erro ao carregar anotações:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (session) {
      fetchNotes();
    }
  }, [session]);

  const filteredPatients = patientsWithNotes.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Carregando anotações...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Histórico de Anotações</h2>
      <div className="flex">
        <div className="w-1/3 pr-4 border-r">
          <input
            type="text"
            placeholder="Buscar paciente..."
            className="w-full p-2 border rounded-md mb-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="space-y-2">
            {filteredPatients.map((patient) => (
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
                <p className="text-sm text-gray-600">
                  {patient.nextConsultation
                    ? `Próxima consulta: ${new Date(patient.nextConsultation).toLocaleDateString()}`
                    : patient.lastConsultation
                      ? `Última consulta: ${new Date(patient.lastConsultation).toLocaleDateString()}`
                      : "Nenhuma consulta encontrada"}
                </p>
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
                      <p className="font-medium">
                        Consulta: {new Date(note.date).toLocaleDateString()}
                      </p>
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