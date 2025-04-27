'use client';
import Link from "next/link";
import LoginFormP from "./login-form";
//import { auth } from "../../../auth";
//import { redirect } from "next/navigation";
import { useSession } from "next-auth/react"; // Hook para obter a sessão do NextAuth
import { useRouter } from "next/navigation"; // Use o useRouter de next/navigation

export default function PatientLogin() {
  const { data: session, status } = useSession();  // Use a sessão do NextAuth
  const router = useRouter();  // Para manipulação de navegação
  
  // Se a sessão estiver carregando, exibe um loading
  if (status === "loading") {
    return <p>Carregando...</p>;
  }
  
    // Se o usuário já estiver logado, redireciona para o formulário
  if (session?.user?.role === "paciente") {
    router.push("/formulario");  // Redireciona para o formulário
    return null;  // Retorna null para evitar renderização enquanto redireciona
  }

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
          <p className="text-sm text-center">Não tem conta? <Link href="/cadastro/paciente" className="text-blue-500 font-semibold">Registre-se</Link></p>
        </div>
      </div>
   </div>
  );
}
