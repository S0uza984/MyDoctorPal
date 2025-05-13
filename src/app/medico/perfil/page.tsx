export default function PerfilPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Meu Perfil</h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nome:</label>
          <input type="text" value="Dr. Carlos Silva" className="w-full p-2 border rounded-md" readOnly />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Especialidade:</label>
          <input type="text" value="Cardiologia" className="w-full p-2 border rounded-md" readOnly />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">CRM:</label>
          <input type="text" value="123456-SP" className="w-full p-2 border rounded-md" readOnly />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email:</label>
          <input type="email" value="dr.carlos@email.com" className="w-full p-2 border rounded-md" readOnly />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Telefone:</label>
          <input type="text" value="(11) 98765-4321" className="w-full p-2 border rounded-md" readOnly />
        </div>
        <div>
          <h3 className="font-medium mb-2">Horários Disponíveis:</h3>
          <div className="grid grid-cols-5 gap-2 p-3 bg-gray-50 rounded-md border">
            {['Seg', 'Ter', 'Qua', 'Qui', 'Sex'].map((d, i) => (
              <div key={i} className="font-medium">{d}</div>
            ))}
            {Array(5).fill('09:00').map((t, i) => (
              <label key={i} className="flex items-center">
                <input type="checkbox" className="mr-1" checked readOnly /> {t}
              </label>
            ))}
          </div>
        </div>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md">Editar Informações</button>
      </div>
    </div>
  );
}
