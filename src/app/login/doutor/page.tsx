export default function DoctorLogin() {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md w-80">
          <div className="bg-blue-500 text-white font-bold px-4 py-2 flex justify-between rounded-t-md">
            <span>MyDoctorPal</span>
            <span className="text-sm cursor-pointer">PT | EN</span>
          </div>
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4 text-center">Login de Médico</h2>
            <input type="email" placeholder="Email" className="w-full border p-2 mb-3 rounded" />
            <input type="password" placeholder="Senha" className="w-full border p-2 mb-4 rounded" />
            <button className="w-full bg-blue-500 text-white py-2 rounded-full font-semibold mb-2">Entrar</button>
            <p className="text-sm text-center">Não tem conta? <a href="/cadastro/doutor" className="text-blue-500 font-semibold">Registre-se</a></p>
          </div>
        </div>
      </div>
    );
  }