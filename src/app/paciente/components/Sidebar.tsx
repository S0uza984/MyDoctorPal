'use client';
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {useSession} from 'next-auth/react';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Consultas', path: '/paciente/dashboard' },
    { label: 'Histórico', path: '/paciente/historico' },
    { label: 'Notificações', path: '/paciente/notificacoes' },
    { label: 'Perfil', path: '/paciente/perfil' },
  ];

  const { data: session } = useSession();
  const nomePaciente = session.user.name.split(' ')[0].charAt(0).toUpperCase() + session.user.name.split(' ')[0].slice(1).toLowerCase();
  console.log("Nome do Paciente:", nomePaciente);
  return (
    <div className="w-48 bg-white shadow-md h-full">
      <div className="bg-blue-500 text-white p-4">
        <h1 className="text-xl font-bold">MyDoctorPal</h1>
        <p className="text-sm">Olá, {nomePaciente}</p>
      </div>
      <nav className="p-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`block p-2 rounded-md ${
                  pathname === item.path ? 'bg-blue-100 text-blue-700' : ''
                }`}
              >
                {item.label}
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