"use client";
export default function AgendarConsulta() {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Agendar Consulta</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Especialidade:</label>
            <select className="w-full p-2 border rounded-md">
              <option>Cardiologia</option>
              <option>Clínica Geral</option>
              <option>Dermatologia</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Data:</label>
            <input type="date" className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Horário:</label>
            <input type="time" className="w-full p-2 border rounded-md" />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Agendar
          </button>
        </form>
      </div>
    );
  }