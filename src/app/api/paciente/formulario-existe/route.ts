import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { PrismaClient } from "../../../../generated/prisma";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  // Se não estiver autenticado, retorna não preenchido (ou pode retornar erro)
  if (!token || !token.sub) {
    return NextResponse.json({ jaPreenchido: false });
  }

  // Busca o paciente pelo ID do usuário autenticado
  const usuarioId = parseInt(token.sub, 10);
  const paciente = await prisma.pacientes.findFirst({
    where: { ID: usuarioId },
  });

  if (!paciente) {
    return NextResponse.json({ jaPreenchido: false });
  }

  // Verifica se já existe formulário preenchido para esse paciente
  const formulario = await prisma.formularios.findFirst({
    where: { ID_Paciente: paciente.ID_Paciente },
  });

  return NextResponse.json({ jaPreenchido: !!formulario });
}