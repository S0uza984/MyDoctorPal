'use client';

export default function PerfilPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4">
        <h1 className="text-xl font-bold mb-4">Meu Perfil</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nome:</label>
            <input type="text" className="w-full p-2 border rounded-md" value="João Silva" readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email:</label>
            <input type="email" className="w-full p-2 border rounded-md" value="joao.silva@email.com" readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">CPF:</label>
            <input type="text" className="w-full p-2 border rounded-md" value="123.456.789-00" readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Telefone:</label>
            <input type="text" className="w-full p-2 border rounded-md" value="(11) 98765-4321" readOnly />
          </div>

          <div>
            <h3 className="font-medium mb-2">Formulário Médico:</h3>
            <div className="bg-gray-50 p-3 rounded-md border">
              <p><strong>Idade:</strong> 42 anos</p>
              <p><strong>Alergias:</strong> Penicilina</p>
              <p><strong>Medicamentos em uso:</strong> Losartana</p>
              <p><strong>Condições médicas:</strong> Hipertensão</p>
            </div>
          </div>

          <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
            Editar Informações
          </button>
        </div>
      </div>
    </div>
  );
}
