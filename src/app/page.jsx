import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md w-80 p-6 text-center">
        <div className="bg-blue-500 text-white text-lg font-bold px-4 py-2 rounded-t-md flex justify-between">
          <span>MyDoctorPal</span>
          <span className="text-sm cursor-pointer">PT | EN</span>
        </div>
        <h2 className="text-xl font-semibold mt-4 text-black">Bem-vindo</h2>
        <p className="text-gray-600 mb-6">Escolha seu tipo de acesso:</p>

        <Link
          href="/auth/patient"
          className="block w-full bg-blue-500 text-white py-2 rounded-full font-semibold mb-3"
        >
          Sou Paciente
        </Link>

        <Link
          href="/auth/doctor"
          className="block w-full border border-blue-500 text-blue-500 py-2 rounded-full font-semibold"
        >
          Sou Médico
        </Link>
      </div>
    </div>
  );
}
