import { PrismaClient } from "../../../../generated/prisma";
import { NextResponse } from "next/server";
import { auth } from "../../../../auth";

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

  // Busca consultas recentes (últimos 30 dias) e status
  const now = new Date();
  const lastMonth = new Date();
  lastMonth.setDate(now.getDate() - 30);

  const consultas = await prisma.consultas.findMany({
    where: {
      ID_Medico: medico.ID_Medico,
      Data_Horario: { gte: lastMonth },
    },
    orderBy: { Data_Horario: "desc" },
    include: {
      pacientes: { include: { usuarios: true } },
    },
  });

  // Gera notificações a partir das consultas
  const notificacoes = consultas.map((c) => {
    let tipo = '';
    if (c.Status_ === 'CONFIRMADA') tipo = 'Nova Consulta Agendada';
    if (c.Status_ === 'NEGADA') tipo = 'Consulta Cancelada';
    return {
      id: c.ID_Consulta,
      tipo,
      paciente: c.pacientes.usuarios.Nome,
      data: c.Data_Horario,
    };
  }).filter(n => n.tipo);

  return NextResponse.json({ notificacoes });
} 