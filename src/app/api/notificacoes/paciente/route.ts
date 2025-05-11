import { NextResponse } from 'next/server';
import { PrismaClient } from '../../../../generated/prisma';

const prisma = new PrismaClient();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const pacienteId = Number(searchParams.get('pacienteId'));
  if (!pacienteId) {
    return NextResponse.json({ error: 'ID do paciente é obrigatório' }, { status: 400 });
  }
  try {
    const consultas = await prisma.consultas.findMany({
      where: { ID_Paciente: pacienteId },
      orderBy: [{ Data_: 'desc' }, { Horario: 'desc' }],
      include: {
        medicos: {
          include: {
            usuarios: true
          }
        }
      }
    });
    return NextResponse.json({ consultas });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao buscar notificações' }, { status: 500 });
  }
} 