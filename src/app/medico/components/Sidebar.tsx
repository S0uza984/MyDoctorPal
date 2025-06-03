'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {useSession} from "next-auth/react"; // Importa o método de autenticação do NextAuth

export default function Sidebar() {
  const pathname = usePathname();
  
  const { data: session } = useSession(); // Obtém a sessão do usuário
  if (!session || !session.user || !session.user.name) {
    return <div>Carregando...</div>;
  }
  const nome = session.user.name; // Obtém o nome do usuário da sessão, ou usa "Usuário" como padrão

  const links = [
    { href: "/medico/agenda", label: "Agenda" },
    { href: "/medico/notificacao", label: "Notificações" },
    { href: "/medico/anotacao", label: "Anotações" },
    { href: "/medico/perfil", label: "Perfil" },
  ];

  return (
    <div className="w-48 bg-white shadow-md">
      <div className="bg-blue-500 text-white p-4">
        <h1 className="text-xl font-bold">MyDoctorPal</h1>
        <p className="text-sm"> Dr. {nome}</p>
      </div>

      <nav className="p-2">
        <ul className="space-y-1">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block p-2 rounded-md ${
                  pathname === link.href ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
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
  );
}