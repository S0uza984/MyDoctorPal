'use client';

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function PerfilPage() {
  const { data: session } = useSession(); // Obter a sessão do usuário
  const [error, setError] = useState(""); // Estado para erros
  const [usuario, setUsuario] = useState(null); // Inicializado como null
  const [formulario, setFormulario] = useState(null); // Inicializado como null
  const [isLoading, setIsLoading] = useState(true); // Estado de carregamento
  const [idade, setIdade] = useState(100); // Estado para idade
  const idPaciente = session?.user?.id; // ID do paciente logado

  console.log("Sessão no frontend:", session);
  console.log("ID do Paciente:", idPaciente);

  useEffect(() => {
    if (!session) {
      console.log("Sessão ainda não carregada");
      return;
    }

    if (!idPaciente) {
      console.log("ID do paciente não encontrado");
      setError("ID do paciente não encontrado.");
      setIsLoading(false); // Finaliza o carregamento
      return;
    }

    const fetchData = async () => {
      console.log("ID do Paciente enviado no header:", idPaciente);
      try {
        const response = await fetch('/api/usuarios-infos/pacientes', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${idPaciente}`, // Inclui o ID no header
          },
        });

        const data = await response.json();
        if (data.paciente) {
          console.log("Dados do paciente:", data.paciente);
        
          if (data.paciente.Nascimento) {
            console.log("Data de nascimento recebida:", data.paciente.Nascimento);
        
            const dataApenas = data.paciente.Nascimento.split("T")[0];
            const [ano, mes, dia] = dataApenas.split("-");
            console.log("Ano:", ano, "Mês:", mes, "Dia:", dia);
        
            const nascimento = new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia));
            if (!isNaN(nascimento.getTime())) {
              const hoje = new Date();
              let idade = 0;
              idade = hoje.getFullYear() - nascimento.getFullYear();
        
              const mesAtual = hoje.getMonth();
              const diaAtual = hoje.getDate();
        
              if (
                mesAtual < nascimento.getMonth() ||
                (mesAtual === nascimento.getMonth() && diaAtual < nascimento.getDate())
              ) {
                idade--;
              }
        
              console.log("Idade calculada corretamente:", idade);
              setIdade((prevIdade) => idade);
            } else {
              console.error("Erro ao criar a data de nascimento:", data.paciente.Nascimento);
            }
          } else {
            console.error("O campo 'Nascimento' está ausente ou inválido.");
          }
        } else {
          console.error("O campo 'paciente' está ausente no retorno do backend.");
        }
        console.log("Dados retornados do backend:", data);

        if (!response.ok) {
          throw new Error(data.error || "Erro ao buscar informações do paciente.");
        }

        if (data.usuario) {
          console.log("Dados do backend (usuario):", data.usuario);
          setUsuario(data.usuario);
        } else {
          console.error("O campo 'usuario' está ausente no retorno do backend.");
        }

        if (data.formulario) {
          console.log("Dados do formulário médico:", data.formulario);
          setFormulario(data.formulario);
        } else {
          console.error("O campo 'formulario' está ausente no retorno do backend.");
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setError(error.message || "Erro ao buscar dados.");
      } finally {
        setIsLoading(false); // Finaliza o carregamento
      }
    };

    fetchData();
  }, [session, idPaciente]);

  useEffect(() => {
    console.log("Estado de usuario atualizado:", usuario);
  }, [usuario]);

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4">
        <h1 className="text-xl font-bold mb-4">Meu Perfil</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nome:</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md bg-gray-50"
              value={usuario?.Nome ?? ""}
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email:</label>
            <input
              type="email"
              className="w-full p-2 border rounded-md bg-gray-50"
              value={usuario?.Email ?? ""}
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">CPF:</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md bg-gray-50"
              value={usuario?.CPF ?? ""}
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Telefone:</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md bg-gray-50"
              value={usuario?.Telefone ?? ""}
              readOnly
            />
          </div>

          <div>
            <h3 className="font-medium mb-2">Formulário Médico:</h3>
            <div className="bg-gray-50 p-3 rounded-md border">
              <p><strong>Idade:</strong> {`${idade} anos`}</p>
              <p><strong>Sexo:</strong> {formulario?.Sexo ?? ""}</p>
              <p><strong>Peso:</strong> {`${formulario?.Peso ?? ""} kg`}</p>
              <p><strong>Altura:</strong> {`${((formulario?.Altura ?? 0) / 100).toFixed(2).replace('.', ',')} metros`}</p>              <p><strong>Medicamentos em uso:</strong> {formulario?.Medicamento ?? ""}</p>
              <p><strong>Condições médicas:</strong> {formulario?.Condicao_Medica ?? ""}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}