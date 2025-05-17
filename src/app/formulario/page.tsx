"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingFormulario from "../../components/loadings/LoadingFormulario";

export default function Formulario() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    altura: "",
    peso: "",
    sexo: "",
    alergias: "",
    medicamento: "",
    condicaoMedica: "",
  });
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const idPaciente = localStorage.getItem("idPaciente");

    if (!idPaciente) {
      setMensagem("Erro: ID do paciente não encontrado.");
      return;
    }

    const formDataToSend = {
      idPaciente,
      altura: formData.altura,
      peso: formData.peso,
      sexo: formData.sexo,
      alergias: formData.alergias || "Não",
      medicamento: formData.medicamento || "Não",
      condicaoMedica: formData.condicaoMedica || "Não",
    };

    try {
      setLoading(true);
      const response = await fetch("/api/formulario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataToSend),
      });

      const data = await response.json();

      if (response.ok) {
        setMensagem("Formulário enviado com sucesso!");
        setTimeout(() => {
          setLoading(false);
          router.push("/login/paciente");
        }, 2000);
      } else {
        setMensagem(data.error || "Erro ao enviar formulário.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      setMensagem("Erro ao conectar com o servidor.");
      setLoading(false);
    }
  };
  if (loading){
    return <LoadingFormulario/>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md">
        <div className="bg-blue-500 text-white font-bold px-4 py-2 flex justify-between rounded-t-md">
          <span>MyDoctorPal</span>
          <span>Formulário Médico</span>
        </div>
        <form className="p-6 space-y-4 text-sm" onSubmit={handleSubmit}>
          <h3 className="font-semibold text-gray-800 text-base">Informações Médicas Essenciais</h3>

          <div className="flex gap-4">
            <input
              placeholder="Altura (cm)"
              className="w-full border p-2 rounded"
              name="altura"
              value={formData.altura}
              onChange={handleChange}
            />
            <input
              placeholder="Peso (kg)"
              className="w-full border p-2 rounded"
              name="peso"
              value={formData.peso}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="font-medium block mb-1">Sexo:</label>
            <label className="mr-4">
              <input
                type="radio"
                name="sexo"
                value="Masculino"
                checked={formData.sexo === "Masculino"}
                onChange={handleChange}
              />{" "}
              Masculino
            </label>
            <label>
              <input
                type="radio"
                name="sexo"
                value="Feminino"
                checked={formData.sexo === "Feminino"}
                onChange={handleChange}
              />{" "}
              Feminino
            </label>
          </div>

          <div>
            <label className="block font-medium mb-1">Alergias (caso não tenha, escreva &quot;Não&quot;):</label>
            <textarea
              name="alergias"
              className="w-full border p-2 rounded"
              value={formData.alergias}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Medicamentos (caso não use, escreva &quot;Não&quot;):</label>
            <textarea
              name="medicamento"
              className="w-full border p-2 rounded"
              value={formData.medicamento}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Condições médicas (caso não tenha, escreva &quot;Não&quot;):</label>
            <textarea
              name="condicaoMedica"
              className="w-full border p-2 rounded"
              value={formData.condicaoMedica}
              onChange={handleChange}
            />
          </div>

          <button
            className="w-full bg-blue-500 text-white py-2 rounded-full font-semibold mt-2"
            type="submit"
          >
            Salvar
          </button>
        </form>
        {mensagem && <p className="text-green-500 text-sm text-center">{mensagem}</p>}
      </div>
    </div>
  );
}
