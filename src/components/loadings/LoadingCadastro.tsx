export default function LoadingCadastro() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <img
          src="/logo.png" // Caminho para o ícone (ou substitua por outro .png)
          alt="Loading Icon"
          className="w-16 h-16 animate-spin" // Classe para girar o ícone
        />
        <p className="text-blue-500 font-semibold mt-4">Cadastro realizado com sucesso! Redirecionando...</p>
      </div>
    );
  }