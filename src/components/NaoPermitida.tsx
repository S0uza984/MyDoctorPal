'use client';

export default function NaoPermitida() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Acesso Não Permitido</h1>
        <p className="text-gray-700 mb-6">
          Você não tem permissão para acessar esta página. Por favor, verifique suas credenciais ou entre em contato com o administrador.
        </p>
        <a
          href="/"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Voltar para a Página Inicial
        </a>
      </div>
    </div>
  );
}