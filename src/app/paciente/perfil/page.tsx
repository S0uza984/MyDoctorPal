"use client";
export default function Perfil() {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Meu Perfil</h2>
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
        </div>
      </div>
    );
  }