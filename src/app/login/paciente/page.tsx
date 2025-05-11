import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PatientLogin() {
  const [formData, setFormData] = useState({ email: "", senha: "" });
  const [mensagem, setMensagem] = useState("");
  const Router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.senha) {
      setMensagem("Preencha todos os campos!");
      return;
    }
    try {
      const response = await fetch("/api/login/paciente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setMensagem(data.message || "Login realizado com sucesso!");
        Router.push("/notificacoes");
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
      <div className="bg-white rounded-lg shadow-md w-80">
        <div className="bg-blue-500 text-white font-bold px-4 py-2 flex justify-between rounded-t-md">
          <span>MyDoctorPal</span>
          <span className="text-sm cursor-pointer">PT | EN</span>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <h2 className="text-lg font-semibold mb-4 text-center">Login de Paciente</h2>
          <input type="email" name="email" placeholder="Email" className="w-full border p-2 mb-3 rounded" value={formData.email} onChange={handleChange} />
          <input type="password" name="senha" placeholder="Senha" className="w-full border p-2 mb-4 rounded" value={formData.senha} onChange={handleChange} />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-full font-semibold mb-2">Entrar</button>
        </form>
        {mensagem && <p className="text-sm text-center text-red-500">{mensagem}</p>}
        <p className="text-sm text-center">Não tem conta? <a href="/cadastro/paciente" className="text-blue-500 font-semibold">Registre-se</a></p>
      </div>
    </div>
  );
}
  