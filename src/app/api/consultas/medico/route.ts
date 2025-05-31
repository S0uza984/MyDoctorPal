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

  // Busca as consultas do médico, incluindo paciente e anotações
  const consultas = await prisma.consultas.findMany({
    where: {
      ID_Medico: medico.ID_Medico,
      Status_: "CONFIRMADA",
    },
    orderBy: { Data_Horario: "asc" },
    include: {
      pacientes: {
        include: {
          usuarios: true,
          formularios: true,
        },
      },
      anotacao: true,
    },
  });

  return NextResponse.json({ consultas });
} 