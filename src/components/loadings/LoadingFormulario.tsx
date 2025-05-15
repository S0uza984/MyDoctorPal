import Image from "next/image"; // Certifique-se de importar o componente Image

export default function LoadingFormulario() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <Image
        src="/logo.png" // Caminho para o ícone (ou substitua por outro .png)
        alt="Loading Icon"
        width={64} // Largura da imagem
        height={64} // Altura da imagem
        className="animate-spin" // Classe para girar o ícone
      />
      <p className="text-blue-500 font-semibold mt-4">
        Formulário salvo com sucesso! Redirecionando...
      </p>
    </div>
  );
}