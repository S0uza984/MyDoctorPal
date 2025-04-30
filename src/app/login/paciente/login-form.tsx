'use client';

import { useState } from "react";
import { signIn } from "next-auth/react"; // Importa o método de autenticação do NextAuth
import { useRouter } from "next/navigation"; // Use o useRouter de next/navigation

export default function LoginFormP() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();  // Agora usando useRouter de next/navigation

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(""); // Limpa mensagens de erro anteriores

    // Realiza a tentativa de login com NextAuth
    const result = await signIn("credentials", {
      redirect: false, // Não redireciona automaticamente após login
      email,
      password,
    });

    // Verifica se o login foi bem-sucedido
    if (result?.error) {
       setErrorMessage('Credenciais inválidas'); // Exibe mensagem de erro, se houver
      console.error("Erro no login:", result.error);
    } else {
      console.log("Login bem-sucedido!");
      // Redireciona para o formulário após o login bem-sucedido
      router.push("/formulario"); // Redireciona com router de next/navigation
    }

    setLoading(false); // Remover o estado de carregamento após a tentativa
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-6">
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          className="w-full border p-2 mb-4 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errorMessage && <p className="text-red-500 mb-3">{errorMessage}</p>} {/* Exibe a mensagem de erro */}
        <button
          type="submit"
          className={`w-full py-2 rounded-full font-semibold mb-2 cursor-pointer ${loading ? 'bg-gray-400' : 'bg-blue-500 text-white'}`}
          disabled={loading} // Desabilita o botão enquanto está carregando
        >
          {loading ? "Carregando..." : "Entrar"}
        </button>
      </div>
    </form>
  );
}
