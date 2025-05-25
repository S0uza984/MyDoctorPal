import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AgendamentoSucesso() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/paciente/dashboard"); // ou "/paciente/consultas" se essa for a rota correta
    }, 2500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-96">
      <Image src="/logo.png" alt="Logo" width={80} height={80} />
      <h2 className="text-2xl font-bold mt-4 text-green-600">Agendamento realizado com sucesso!</h2>
      <p className="mt-2 text-gray-600">Você será redirecionado para suas consultas.</p>
    </div>
  );
}