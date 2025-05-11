import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DoctorRegister() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    telefone: "",
    cpf: "",
    crm: "",
    especialidade: "",
  });
  const [mensagem, setMensagem] = useState("");
  const Router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validação simples
    if (Object.values(formData).some((v) => !v)) {
      setMensagem("Preencha todos os campos!");
      return;
    }
    try {
      const response = await fetch("/api/cadastro/doutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setMensagem(data.message || "Médico cadastrado com sucesso!");
        Router.push("/login/doutor");
      } else {
        setMensagem(data.error);
      }
    } catch (error) {
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md w-96">
        <div className="bg-blue-500 text-white font-bold px-4 py-2 flex justify-between rounded-t-md">
          <span>MyDoctorPal</span>
          <span>Cadastro de Médico</span>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-3 text-gray-800">
          <input type="text" name="nome" placeholder="Nome Completo" className="w-full border p-2 rounded" value={formData.nome} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" className="w-full border p-2 rounded" value={formData.email} onChange={handleChange} />
          <input type="password" name="senha" placeholder="Senha" className="w-full border p-2 rounded" value={formData.senha} onChange={handleChange} />
          <input type="text" name="telefone" placeholder="Telefone" className="w-full border p-2 rounded" value={formData.telefone} onChange={handleChange} />
          <input type="text" name="cpf" placeholder="CPF" className="w-full border p-2 rounded" value={formData.cpf} onChange={handleChange} />
          <input type="text" name="crm" placeholder="CRM" className="w-full border p-2 rounded" value={formData.crm} onChange={handleChange} />
          <input type="text" name="especialidade" placeholder="Especialidade" className="w-full border p-2 rounded" value={formData.especialidade} onChange={handleChange} />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-full font-semibold">Criar Conta</button>
        </form>
        {mensagem && <p className="text-sm text-center text-red-500">{mensagem}</p>}
        <p className="text-sm text-center">
          Já tem uma conta? <a href="/login/doutor" className="text-blue-500 font-semibold">Entrar</a>
        </p>
      </div>
    </div>
  );
}
  