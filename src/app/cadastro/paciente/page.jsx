export default function PatientRegister() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md w-96">
        <div className="bg-blue-500 text-white font-bold px-4 py-2 flex justify-between rounded-t-md">
          <span>MyDoctorPal</span>
          <span>Cadastro de Paciente</span>
        </div>
        <div className="p-6 space-y-3 text-gray-800">
          <input type="text" placeholder="Nome Completo" className="w-full border p-2 rounded" />
          <input type="email" placeholder="Email" className="w-full border p-2 rounded" />
          <input type="password" placeholder="Senha" className="w-full border p-2 rounded" />
          <input type="text" placeholder="Telefone" className="w-full border p-2 rounded" />
          <input type="date" className="w-full border p-2 rounded" />
          <label className="flex items-center space-x-2 text-sm"><input type="checkbox" /> <span>Preencher formulário médico obrigatório</span></label>
          <button className="w-full bg-blue-500 text-white py-2 rounded-full font-semibold">Criar Conta</button>
          <p className="text-sm text-center">Já tem uma conta? <a href="/login/paciente" className="text-blue-500 font-semibold text-black">Entrar</a></p>
        </div>
      </div>
    </div>
  );
}
