import { PrismaClient } from "../../../../generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  // Busca todos os usuários que são médicos, incluindo dados do médico
  const usuariosMedicos = await prisma.usuarios.findMany({
    where: {
      medicos: {
        // Só pega usuários que têm relação com médico
          some: {},
      },
    },
    include: {
      medicos: true,
    },
  });

  // Monta lista de médicos e especialidades únicas
  const medicos = usuariosMedicos.flatMap(usuario =>
    usuario.medicos.map(medico => ({
      id: medico.ID_Medico,
      nome: usuario.Nome,
      especialidade: medico.Especialidade,
    }))
  );

  const especialidades = [...new Set(medicos.map(m => m.especialidade))];

  return NextResponse.json({
    especialidades,
    medicos,
  });
}

export async function POST(request: Request) { 
  try {
    const body = await request.json();
    const horaFormatada = body.horarioSelecionado.length === 5
    ? body.horarioSelecionado + ":00"
    : body.horarioSelecionado;
    const paciente = await prisma.pacientes.findFirst({
        where: { ID: parseInt(body.idUsuario) },
    });

    if (!paciente.ID_Paciente) {
        return NextResponse.json({ error: "Paciente não encontrado." }, { status: 404 });
    }

    const dataHora = `${body.dataSelecionada}T${horaFormatada}`;
    const dataHoraLocal = new Date(dataHora);
    dataHoraLocal.setHours(dataHoraLocal.getHours() - 3); // Ajusta para UTC-3
    

    // Verifica se já existe agendamento para o mesmo médico, data e horário
    const agendamentoExistente = await prisma.consultas.findFirst({
      where: {
        ID_Medico: parseInt(body.medicoSelecionado),
        Data_Horario: dataHoraLocal,
      },
    });
    

    if (agendamentoExistente) {
        return NextResponse.json(
        { error: "Horário não disponível para este dia." },
        { status: 409 }
        );
    }

    // Verifica se todos o paciente tem outra consulta nesse mesmo dia e horario
    const agendamentoExistentePaciente = await prisma.consultas.findFirst({
      where: {
        ID_Paciente: paciente.ID_Paciente,
        Data_Horario: dataHoraLocal,
      },
    });

     if (agendamentoExistentePaciente) {
        return NextResponse.json(
        { error: "Você já possui outra consulta neste dia e horário." },
        { status: 409 }
        );
    }

    // Cria o agendamento
    const novoAgendamento = await prisma.consultas.create({
      data: {
        ID_Medico: parseInt(body.medicoSelecionado),
        ID_Paciente: paciente.ID_Paciente,
        Data_Horario: dataHoraLocal,
        Descricao: body.motivo,
        // Adicione outros campos necessários
      },
    });

    return NextResponse.json({ ok: true, agendamento: novoAgendamento });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao salvar agendamento" }, { status: 500 });
  }
}