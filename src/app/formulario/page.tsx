"use client"

import { useState } from 'react';

export default function Formulario() {
  const [cirurgia, setCirurgia] = useState(false);
  const [controlado, setControlado] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md">
        <div className="bg-blue-500 text-white font-bold px-4 py-2 flex justify-between rounded-t-md">
          <span>MyDoctorPal</span>
          <span>Formulário Médico</span>
        </div>
        <div className="p-6 space-y-4 text-sm">
          <h3 className="font-semibold text-gray-800 text-base">Informações Médicas Essenciais</h3>
          <div className="flex gap-4">
            <input placeholder="Altura (cm)" className="w-full border p-2 rounded" />
            <input placeholder="Peso (kg)" className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="font-medium block mb-1">Sexo:</label>
            <label className="mr-4"><input type="radio" name="sexo" /> Masculino</label>
            <label><input type="radio" name="sexo" /> Feminino</label>
          </div>
          <div>
            <label className="block font-medium mb-1">Já realizou alguma cirurgia?</label>
            <label className="mr-4"><input type="radio" name="cirurgia" onClick={() => setCirurgia(false)} /> Não</label>
            <label><input type="radio" name="cirurgia" onClick={() => setCirurgia(true)} /> Sim</label>
            {cirurgia && (
              <textarea placeholder="Descreva as cirurgias realizadas..." className="w-full border p-2 rounded mt-2"></textarea>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">Faz uso de remédio controlado?</label>
            <label className="mr-4"><input type="radio" name="controlado" onClick={() => setControlado(false)} /> Não</label>
            <label><input type="radio" name="controlado" onClick={() => setControlado(true)} /> Sim</label>
            {controlado && (
              <textarea placeholder="Quais remédios controlados utiliza?" className="w-full border p-2 rounded mt-2"></textarea>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">Faz uso de remédio contínuo?</label>
            <label className="mr-4"><input type="radio" name="continuo" /> Não</label>
            <label><input type="radio" name="continuo" /> Sim</label>
          </div>
          <button className="w-full bg-blue-500 text-white py-2 rounded-full font-semibold mt-2">Salvar</button>
        </div>
      </div>
    </div>
  );
}
