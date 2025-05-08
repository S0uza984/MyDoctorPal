export default function PerfilPage() {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Meu Perfil</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nome:</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value="Dr. Carlos Silva"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Especialidade:</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value="Cardiologia"
              readOnly
            />
          </div>
        </div>
      </div>
    );
  }