'use client';
import Link from "next/link";
export default function NaoPermitidaFormulario() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Acesso Não Permitido</h1>
        <p className="text-gray-700 mb-6">
          Você já respondeu o formulário de cadastro. Se você acredita que isso é um erro, por favor, entre em contato com o suporte ou administrador do sistema.
        </p>
        <Link
          href="/"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Voltar para a Página Inicial
        </Link>
      </div>
    </div>
  );
}