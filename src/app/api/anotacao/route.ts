import { PrismaClient } from "../../../generated/prisma";
import { NextResponse } from "next/server";
import { auth } from "../../../auth";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json({ error: "Usuário não autenticado." }, { status: 401 });
  }
  const idUsuario = session.user.id;

  // Busca o médico pelo ID do usuário autenticado
  const medico = await prisma.medicos.findFirst({
    where: { ID: parseInt(idUsuario) },
  });
  if (!medico || !medico.ID_Medico) {
    return NextResponse.json({ error: "Médico não encontrado." }, { status: 404 });
  }

  // Busca as consultas do médico com anotações e status CONFIRMADA
  const consultas = await prisma.consultas.findMany({
    where: {
      ID_Medico: medico.ID_Medico,
      Status_: "CONFIRMADA", // <-- Adicionado filtro aqui
    },
    orderBy: { Data_Horario: "desc" },
    include: {
      pacientes: {
        include: {
          usuarios: true,
        },
      },
      anotacao: true,
    },
  });

  // Agrupa as consultas por paciente
  const pacientesComAnotacoes = consultas.reduce((acc, consulta) => {
    const pacienteId = consulta.pacientes.ID_Paciente;
    if (!acc[pacienteId]) {
      acc[pacienteId] = {
        id: pacienteId,
        name: consulta.pacientes.usuarios.Nome,
        lastConsultation: consulta.Data_Horario,
        notes: [],
      };
    }
    if (consulta.anotacao && consulta.anotacao.length > 0) {
      acc[pacienteId].notes.push({
        date: consulta.Data_Horario,
        content: consulta.anotacao[0].Conteudo,
      });
    }
    return acc;
  }, {});

  return NextResponse.json({ pacientes: Object.values(pacientesComAnotacoes) });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json({ error: "Usuário não autenticado." }, { status: 401 });
  }

  const body = await request.json();
  const { idConsulta, conteudo } = body;

  if (!idConsulta || !conteudo) {
    return NextResponse.json({ error: "Dados incompletos." }, { status: 400 });
  }

  try {
    // Verifica se já existe uma anotação para esta consulta
    const anotacaoExistente = await prisma.anotacao.findFirst({
      where: { ID_Consulta: idConsulta },
    });

    let anotacao;
    if (anotacaoExistente) {
      // Atualiza a anotação existente
      anotacao = await prisma.anotacao.update({
        where: { ID_Anotacao: anotacaoExistente.ID_Anotacao },
        data: { Conteudo: conteudo },
      });
    } else {
      // Cria uma nova anotação
      anotacao = await prisma.anotacao.create({
        data: {
          ID_Consulta: idConsulta,
          Conteudo: conteudo,
        },
      });
    }

    return NextResponse.json({ anotacao });
  } catch (error) {
    console.error("Erro ao salvar anotação:", error);
    return NextResponse.json({ error: "Erro ao salvar anotação." }, { status: 500 });
  }
}