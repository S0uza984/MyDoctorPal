"use client";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const firstName =
    session?.user?.name
      ?.split(" ")[0]
      ?.toLowerCase()
      ?.charAt(0)
      .toUpperCase() + session?.user?.name?.split(" ")[0]?.slice(1) || "Usuário";

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-48 bg-white shadow-md">
        <div className="bg-blue-500 text-white p-4">
          <h1 className="text-xl font-bold">MyDoctorPal</h1>
          <p className="text-sm">Olá, {firstName}</p>
        </div>
        <nav className="p-2">
          <ul className="space-y-1">
            <li>
              <a href="/paciente/" className="block p-2 rounded-md hover:bg-blue-100">
                Consultas
              </a>
            </li>
            <li>
              <a href="/paciente/historico" className="block p-2 rounded-md hover:bg-blue-100">
                Histórico
              </a>
            </li>
            <li>
              <a href="/paciente/notificacoes" className="block p-2 rounded-md hover:bg-blue-100">
                Notificações
              </a>
            </li>
            <li>
              <a href="/paciente/perfil" className="block p-2 rounded-md hover:bg-blue-100">
                Perfil
              </a>
            </li>
            <li>
              <a href="/paciente/agendamento" className="block p-2 rounded-md hover:bg-blue-100">
                Agendar Consulta
              </a>
            </li>
            <li>
              {/* Botão de logout */}
              <button
                onClick={() => signOut({ callbackUrl: "/" })} // Redireciona para a página inicial após logout
                className="block p-2 rounded-md text-red-600 hover:bg-red-100"
              >
                Sair
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}