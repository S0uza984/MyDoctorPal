export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        Olá, mundo! 👋
      </h1>
      <p className="text-lg text-gray-700 text-center">
        Esse é o meu primeiro projeto com <span className="font-semibold text-black">Next.js</span> e <span className="font-semibold text-black">Tailwind CSS</span> 🎉
      </p>

      <a
        href="https://tailwindcss.com/docs"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow-md transition"
      >
        Ver documentação do Tailwind
      </a>
    </main>
  );
}
