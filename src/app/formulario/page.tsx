"use client"

import { useEffect, useState } from 'react';

export default function Formulario() {
  // Simulação: ID do paciente logado
  const pacienteId = 1;
  const [form, setForm] = useState({
    altura: '',
    peso: '',
    sexo: '',
    cirurgia: false,
    cirurgiaResposta: '',
    controlado: false,
    controladoResposta: '',
    continuo: false,
    continuoResposta: '',
  });
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchFormulario() {
      setLoading(true);
      try {
        const res = await fetch(`/api/formulario/paciente?pacienteId=${pacienteId}`);
        const data = await res.json();
        if (res.ok && data.formulario) {
          setForm({
            altura: data.formulario.Altura || '',
            peso: data.formulario.Peso || '',
            sexo: data.formulario.Sexo || '',
            cirurgia: !!data.formulario.Cirurgia,
            cirurgiaResposta: data.formulario.Cirurgia_Resposta || '',
            controlado: !!data.formulario.Med_Controlado,
            controladoResposta: data.formulario.Med_Controlado_Resposta || '',
            continuo: !!data.formulario.Med_Continuo,
            continuoResposta: data.formulario.Med_Continuo_Resposta || '',
          });
        }
      } catch {}
      setLoading(false);
    }
    fetchFormulario();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleRadio = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');
    setLoading(true);
    try {
      const res = await fetch('/api/formulario/paciente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pacienteId, ...form }),
      });
      const data = await res.json();
      if (res.ok) {
        setMensagem('Formulário salvo com sucesso!');
      } else {
        setMensagem(data.error || 'Erro ao salvar formulário');
      }
    } catch {
      setMensagem('Erro ao conectar com o servidor.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md">
        <div className="bg-blue-500 text-white font-bold px-4 py-2 flex justify-between rounded-t-md">
          <span>MyDoctorPal</span>
          <span>Formulário Médico</span>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-sm">
          <h3 className="font-semibold text-gray-800 text-base">Informações Médicas Essenciais</h3>
          <div className="flex gap-4">
            <input name="altura" placeholder="Altura (cm)" className="w-full border p-2 rounded" value={form.altura} onChange={handleChange} />
            <input name="peso" placeholder="Peso (kg)" className="w-full border p-2 rounded" value={form.peso} onChange={handleChange} />
          </div>
          <div>
            <label className="font-medium block mb-1">Sexo:</label>
            <label className="mr-4"><input type="radio" name="sexo" checked={form.sexo === 'Masculino'} onChange={() => handleRadio('sexo', 'Masculino')} /> Masculino</label>
            <label><input type="radio" name="sexo" checked={form.sexo === 'Feminino'} onChange={() => handleRadio('sexo', 'Feminino')} /> Feminino</label>
          </div>
          <div>
            <label className="block font-medium mb-1">Já realizou alguma cirurgia?</label>
            <label className="mr-4"><input type="radio" name="cirurgia" checked={!form.cirurgia} onChange={() => handleRadio('cirurgia', false)} /> Não</label>
            <label><input type="radio" name="cirurgia" checked={form.cirurgia} onChange={() => handleRadio('cirurgia', true)} /> Sim</label>
            {form.cirurgia && (
              <textarea name="cirurgiaResposta" placeholder="Descreva as cirurgias realizadas..." className="w-full border p-2 rounded mt-2" value={form.cirurgiaResposta} onChange={handleChange}></textarea>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">Faz uso de remédio controlado?</label>
            <label className="mr-4"><input type="radio" name="controlado" checked={!form.controlado} onChange={() => handleRadio('controlado', false)} /> Não</label>
            <label><input type="radio" name="controlado" checked={form.controlado} onChange={() => handleRadio('controlado', true)} /> Sim</label>
            {form.controlado && (
              <textarea name="controladoResposta" placeholder="Quais remédios controlados utiliza?" className="w-full border p-2 rounded mt-2" value={form.controladoResposta} onChange={handleChange}></textarea>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">Faz uso de remédio contínuo?</label>
            <label className="mr-4"><input type="radio" name="continuo" checked={!form.continuo} onChange={() => handleRadio('continuo', false)} /> Não</label>
            <label><input type="radio" name="continuo" checked={form.continuo} onChange={() => handleRadio('continuo', true)} /> Sim</label>
            {form.continuo && (
              <textarea name="continuoResposta" placeholder="Quais remédios contínuos utiliza?" className="w-full border p-2 rounded mt-2" value={form.continuoResposta} onChange={handleChange}></textarea>
            )}
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-full font-semibold mt-2" disabled={loading}>{loading ? 'Salvando...' : 'Salvar'}</button>
          {mensagem && <div className="text-center text-sm text-blue-600 mt-2">{mensagem}</div>}
        </form>
      </div>
    </div>
  );
}
