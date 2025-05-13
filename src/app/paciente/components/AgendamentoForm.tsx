'use client';

export default function AgendamentoForm() {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Especialidade:</label>
        <select className="w-full p-2 border rounded-md">
          <option value="">Selecione uma especialidade</option>
          <option value="cardiologia">Cardiologia</option>
          <option value="clinica-geral">Clínica Geral</option>
          <option value="dermatologia">Dermatologia</option>
          <option value="ortopedia">Ortopedia</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Médico:</label>
        <select className="w-full p-2 border rounded-md">
          <option value="">Selecione um médico</option>
          <option value="carlos-silva">Dr. Carlos Silva</option>
          <option value="ana-souza">Dra. Ana Souza</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Data e Horário:</label>

        <div className="grid grid-cols-5 gap-2 mb-2 text-center font-medium">
          <div>Seg</div><div>Ter</div><div>Qua</div><div>Qui</div><div>Sex</div>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2">
          {['09:00','09:30','10:00','10:30','11:00'].map(time => (
            <button key={time} className="p-2 border rounded hover:bg-blue-100">
              {time}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-5 gap-2">
          {['14:00','14:30','15:00','15:30','16:00'].map(time => (
            <button key={time} className="p-2 border rounded hover:bg-blue-100">
              {time}
            </button>
          ))}
        </div>
      </div>

      <button className="bg-blue-500 text-white py-2 px-4 rounded-md w-full">
        Confirmar
      </button>
    </div>
  );
}
