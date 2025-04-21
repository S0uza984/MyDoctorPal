export default function Notificacoes() {
    return (
      <div className="min-h-screen flex">
        <aside className="w-48 bg-white border-r p-4 space-y-4">
          <h4 className="text-blue-500 font-semibold">Consultas</h4>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>Histórico</li>
            <li className="font-semibold text-blue-500">Notificações</li>
            <li>Perfil</li>
            <li>Sair</li>
          </ul>
        </aside>
        <main className="flex-1">
          <header className="bg-blue-500 text-white px-6 py-3 flex justify-between">
            <span>MyDoctorPal</span>
            <span>Olá, João</span>
          </header>
          <section className="p-6">
            <h2 className="text-xl font-semibold mb-4">Notificações</h2>
            <div className="bg-blue-100 border border-blue-300 rounded p-4 mb-4 text-sm">
              <div className="font-bold">Consulta Confirmada</div>
              <div>Dr. Carlos Silva - Cardiologia</div>
              <div>20/04/2025 - 14:30</div>
            </div>
            <div className="bg-red-100 border border-red-300 rounded p-4 text-sm">
              <div className="font-bold">Consulta Cancelada</div>
              <div>Dra. Ana Souza - Clínica Geral</div>
              <div>15/04/2025 - 10:00</div>
            </div>
          </section>
        </main>
      </div>
    );
  }
  