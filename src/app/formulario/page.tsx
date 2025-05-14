"use client"

import { useState } from 'react';

export default function Formulario() {
  const [alergia, setAlergia] = useState(false);
  const [medicamento, setMedicamento] = useState(false);
  const [condicao, setCondicao] = useState(false);

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
            <label className="block font-medium mb-1">Tem alguma alergia?</label>
            <label className="mr-4"><input type="radio" name="alergia" onClick={() => setAlergia(false)} /> Não</label>
            <label><input type="radio" name="alergia" onClick= {()=>setAlergia(true)} /> Sim</label>
            {alergia && (
              <textarea placeholder="Quais são as alergias ?" className="w-full border p-2 rounded mt-2"></textarea>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">Faz uso de algum medicamento?</label>
            <label className="mr-4"><input type="radio" name="medicamento" onClick={() => setMedicamento(false)} /> Não</label>
            <label><input type="radio" name="medicamento" onClick={()=>setMedicamento(true)} /> Sim</label>
            {medicamento && (
              <textarea placeholder="Quais medicamentos você faz uso?" className="w-full border p-2 rounded mt-2"></textarea>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">Possue alguma condição médica?</label>
            <label className="mr-4"><input type="radio" name="condicao" onClick={()=>setCondicao(false)} /> Não</label>
            <label><input type="radio" name="condicao" onClick={()=>setCondicao(true)}/> Sim</label>
            {condicao && (
              <textarea placeholder="Qual sua condição ?" className="w-full border p-2 rounded mt-2"></textarea>
            )}
          </div>
          <button className="w-full bg-blue-500 text-white py-2 rounded-full font-semibold mt-2">Salvar</button>
        </div>
      </div>
    </div>
  );
}
