import { NextResponse } from 'next/server';
import { PrismaClient } from '../../../../generated/prisma';

const prisma = new PrismaClient();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const medicoId = Number(searchParams.get('medicoId'));
  if (!medicoId) {
    return NextResponse.json({ error: 'ID do médico é obrigatório' }, { status: 400 });
  }
  try {
    const consultas = await prisma.consultas.findMany({
      where: { ID_Medico: medicoId },
      orderBy: [{ Data_: 'asc' }, { Horario: 'asc' }],
      include: {
        pacientes: {
          include: {
            usuarios: true
          }
        }
      }
    });
    return NextResponse.json({ consultas });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao buscar agenda' }, { status: 500 });
  }
} 