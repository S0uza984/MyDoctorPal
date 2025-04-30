"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingCadastro from "../../../components/loadings/LoadingCadastro";
import Link from "next/link";

export default function CadastroPaciente() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    telefone: "",
    cpf: "",
    nascimento: "",
  });

  const [mensagem, setMensagem] = useState("");
  const Router = useRouter();
  const [Loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita o reload da página
    if (formData.cpf.length !== 11) {
      setMensagem("O CPF deve ter exatamente 11 caracteres.");
      return;
    }
    try {
      const response = await fetch("/api/cadastro/paciente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Envia os dados do cadastro como JSON
      });

      const data = await response.json(); // Converte a resposta para objeto JavaScript

      if (response.ok) {
        setLoading(true);
        setMensagem(data.message || "Paciente cadastrado com sucesso!");
        setTimeout( () => {
          Router.push("/login/paciente")},
          2000)
        }
        
       else {
        setMensagem(data.error);
      }
    }
     catch (error) {
      console.error("Erro:", error);
      setMensagem("Erro ao conectar com o servidor.");
    }
  };
  if (Loading){
    return <LoadingCadastro />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // Obtém o nome e o valor do campo alterado
    setFormData((prevFormData) => ({
      ...prevFormData, // Mantém os valores anteriores
      [name]: value, // Atualiza apenas o campo alterado
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md w-96">
        <div className="bg-blue-500 text-white font-bold px-4 py-2 flex justify-between rounded-t-md">
          <span>MyDoctorPal</span>
          <span>Cadastro de Paciente</span>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-3 text-gray-800">
          <input
            type="text"
            name="nome"
            placeholder="Nome Completo"
            className="w-full border p-2 rounded"
            value= {formData.nome}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            className="w-full border p-2 rounded"
            value={formData.senha}
            onChange={handleChange}
          />
          <input
            type="text"
            name="telefone"
            placeholder="Telefone"
            className="w-full border p-2 rounded"
            value={formData.telefone}
            onChange={handleChange}
          />
          <input
            type="text"
            name="cpf"
            placeholder="CPF"
            className="w-full border p-2 rounded"
            value={formData.cpf}
            onChange={handleChange}
          />
          <input
            type="date"
            name="nascimento"
            className="w-full border p-2 rounded"
            value={formData.nascimento}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-full font-semibold"
          >
            Criar Conta
          </button>
          <p className="text-sm text-center text-gray-800">
          Já tem uma conta?{" "}
          <Link href="/login/paciente" className="text-blue-500 font-semibold">
            Entrar
          </Link>
        </p>
        </form>
        {mensagem && (
          <p className="text-sm text-center text-red-500">{mensagem}</p>
        )}
      </div>
    </div>
  );
}