import { NextResponse } from 'next/server';
import { PrismaClient } from '../../../../generated/prisma';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();
    const { pacienteId, altura, peso, sexo, cirurgia, cirurgiaResposta, controlado, controladoResposta, continuo, continuoResposta } = body;
    if (!pacienteId || !altura || !peso || !sexo) {
      return NextResponse.json({ error: 'Campos obrigatórios não preenchidos' }, { status: 400 });
    }
    const formulario = await prisma.formularios.create({
      data: {
        ID_Paciente: pacienteId,
        Altura: Number(altura),
        Peso: Number(peso),
        Sexo: sexo,
        Cirurgia: cirurgia,
        Cirurgia_Resposta: cirurgiaResposta,
        Med_Controlado: controlado,
        Med_Controlado_Resposta: controladoResposta,
        Med_Continuo: continuo,
        Med_Continuo_Resposta: continuoResposta,
      }
    });
    return NextResponse.json({ message: 'Formulário salvo com sucesso', formulario });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao salvar formulário' }, { status: 500 });
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const pacienteId = Number(searchParams.get('pacienteId'));
  if (!pacienteId) {
    return NextResponse.json({ error: 'ID do paciente é obrigatório' }, { status: 400 });
  }
  try {
    const formulario = await prisma.formularios.findFirst({
      where: { ID_Paciente: pacienteId },
      orderBy: { ID_Formulario: 'desc' }
    });
    return NextResponse.json({ formulario });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao buscar formulário' }, { status: 500 });
  }
} 