"use client";
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function PerfilPage() {
  const { data: session } = useSession(); // Obter a sessão do usuário
    const [error, setError] = useState(""); // Estado para erros
    const [usuario, setUsuario] = useState(null); // Inicializado como null
    const [medico, setMedico] = useState(null); // Inicializado como null
    const [formulario, setFormulario] = useState(null); // Inicializado como null
    const [isLoading, setIsLoading] = useState(true); // Estado de carregamento
    const idMedico = session?.user?.id; // ID do paciente logado
  
    console.log("Sessão no frontend:", session);
    console.log("ID do Médico:", idMedico);
  
    useEffect(() => {
      if (!session) {
        console.log("Sessão ainda não carregada");
        return;
      }
  
      if (!idMedico) {
        console.log("ID do médico não encontrado");
        setError("ID do médico não encontrado.");
        setIsLoading(false); // Finaliza o carregamento
        return;
      }
  
      const fetchData = async () => {
        console.log("ID do Médico enviado no header:", idMedico);
        try {
          const response = await fetch('/api/usuarios-infos/medicos', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${idMedico}`, // Inclui o ID no header
            },
          });
  
          const data = await response.json();
          console.log("Dados recebidos:", data);
          if (data.medico) {
            console.log("Dados do médico:", data.medico);
            setMedico(data.medico);
          }
          if (data.usuario) {
            console.log("Dados do usuário:", data.usuario);
            setUsuario(data.usuario);
          }
        } catch (error) {
          console.error("Erro ao buscar dados do médico:", error);
        }
        finally {
          setIsLoading(false); // Finaliza o carregamento
        } 
      }
      fetchData();
    }, [session, idMedico]);

    if (isLoading) {
      return <div>Carregando...</div>;
    } 

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Meu Perfil</h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nome:</label>
          <input type="text" value= {usuario.Nome} className="w-full p-2 border rounded-md" readOnly />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Especialidade:</label>
          <input type="text" value= {medico.Especialidade} className="w-full p-2 border rounded-md" readOnly />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">CRM:</label>
          <input type="text" value={medico.CRM} className="w-full p-2 border rounded-md" readOnly />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email:</label>
          <input type="email" value={usuario.Email} className="w-full p-2 border rounded-md" readOnly />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Telefone:</label>
          <input type="text" value={usuario.Telefone} className="w-full p-2 border rounded-md" readOnly />
        </div>
        <div>
          <h3 className="font-medium mb-2">Horários Disponíveis:</h3>
          <div className="grid grid-cols-5 gap-2 p-3 bg-gray-50 rounded-md border">
            <p>8:00 até 18:00</p>
          </div>
        </div>
      </div>
    </div>
  );
}
