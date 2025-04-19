export default function Agenda() {
    return (
      <div className="min-h-screen flex">
        <aside className="w-48 bg-white border-r p-4 space-y-4">
          <h4 className="text-blue-500 font-semibold">Agenda</h4>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li className="hover:text-blue-500 cursor-pointer">Notificações</li>
            <li className="hover:text-blue-500 cursor-pointer">Perfil</li>
            <li className="hover:text-blue-500 cursor-pointer">Sair</li>
          </ul>
        </aside>
        <main className="flex-1">
          <header className="bg-blue-500 text-white px-6 py-3 flex justify-between">
            <span>MyDoctorPal</span>
            <span>Dr. Carlos Silva</span>
          </header>
          <section className="p-6">
            <h2 className="text-xl font-semibold mb-4">Minha Agenda Semanal</h2>
            <div className="grid grid-cols-6 text-sm font-semibold text-center border-b">
              <div></div>
              <div>Seg</div><div>Ter</div><div>Qua</div><div>Qui</div><div>Sex</div>
            </div>
            {['09:00', '10:00', '11:00', '14:00'].map((hora) => (
              <div key={hora} className="grid grid-cols-6 border-b text-sm h-16">
                <div className="text-center font-medium">{hora}</div>
                <div></div>
                <div>{hora === '11:00' ? <div className="bg-blue-100 text-blue-800 p-1 rounded text-xs">Ana Costa<br />11:30</div> : null}</div>
                <div></div>
                <div>{hora === '09:00' ? <div className="bg-blue-100 text-blue-800 p-1 rounded text-xs">Pedro Dias<br />09:30</div> : null}</div>
                <div></div>
              </div>
            ))}
            <div className="mt-6 p-4 bg-white border rounded text-sm">
              <div><strong>João Silva</strong></div>
              <div>Idade: 42</div>
              <a href="#" className="text-blue-500">Clique para ver detalhes completos</a>
            </div>
          </section>
        </main>
      </div>
    );
  }
  