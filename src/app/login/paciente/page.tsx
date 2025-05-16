'use client';
import Link from "next/link";
import LoginFormP from "./login-form";
import { useEffect } from "react";
import { useSession } from "next-auth/react"; // Hook para obter a sessão do NextAuth
import { useRouter } from "next/navigation"; // Hook para manipular o roteamento no cliente

export default function PatientLogin() {
  const { data: session, status } = useSession(); // Obtém a sessão do NextAuth
  const router = useRouter(); // Hook para manipular o roteamento no cliente

  // Redireciona o usuário autenticado para /paciente
  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "paciente") {
      router.push("/paciente/dashboard"); // Redireciona para a rota do paciente
    }
  }, [status, session, router]); // Dependências garantem que o efeito seja executado corretamente

  // Exibe um estado de carregamento enquanto a sessão está sendo carregada
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-semibold">Carregando...</p>
      </div>
    );
  }

  // Renderiza o formulário de login se o usuário não estiver autenticado
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md w-80">
        <div className="bg-blue-500 text-white font-bold px-4 py-2 flex justify-between rounded-t-md">
          <span>MyDoctorPal</span>
          <span className="text-sm cursor-pointer">PT | EN</span>
        </div>
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4 text-center">Login de Paciente</h2>
          <LoginFormP />
          <p className="text-sm text-center">
            Não tem conta?{" "}
            <Link href="/cadastro/paciente" className="text-blue-500 font-semibold">
              Registre-se
            </Link>
          </p>
          <Link href="/" className="text-blue-500 font-semibold text-sm text-center block mt-2">
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}