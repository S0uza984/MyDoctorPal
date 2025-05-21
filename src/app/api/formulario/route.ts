import {PrismaClient} from '../../../generated/prisma';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { altura, peso, sexo, alergias, medicamento, condicaoMedica, idPaciente } = body;
    
    
        const novoFormulario = await prisma.formularios.create({
            data: {
              ID_Paciente: parseInt(idPaciente), // Vincula o formulário ao paciente
              Altura: parseFloat(altura),
              Peso: parseFloat(peso),
              Sexo: sexo,
              Alergia: alergias,
              Medicamento: medicamento,
              Condicao_Medica: condicaoMedica
            },
          });
    
        return NextResponse.json({ message: "Formulário enviado com sucesso", formulario: novoFormulario });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao enviar formulário" }, { status: 500 });
    }
}
export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Token não fornecido' }, { status: 401 });
    }

    const idPaciente = parseInt(authHeader.split(' ')[1]);
    if (isNaN(idPaciente)) {
      return NextResponse.json({ error: 'ID do paciente inválido' }, { status: 400 });
    }

    const formulario = await prisma.formularios.findFirst({
      where: { ID_Paciente: idPaciente },
    });

    if (!formulario) {
      return NextResponse.json({ error: 'Formulário não encontrado' }, { status: 404 });
    }

    return NextResponse.json(formulario);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao buscar formulário' }, { status: 500 });
  }
}
export async function PUT(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Token não fornecido' }, { status: 401 });
    }

    const idPaciente = parseInt(authHeader.split(' ')[1]); // Extrai o ID do header
    if (isNaN(idPaciente)) {
      return NextResponse.json({ error: 'ID do paciente inválido' }, { status: 400 });
    }

    const body = await request.json();

    // Verifica se o formulário existe antes de tentar atualizá-lo
    const formularioExistente = await prisma.formularios.findFirst({
      where: { ID_Paciente: idPaciente },
    });

    if (!formularioExistente) {
      return NextResponse.json({ error: 'Formulário não encontrado' }, { status: 404 });
    }

    // Atualiza o formulário encontrado
    const formularioAtualizado = await prisma.formularios.update({
      where: { ID_Formulario: formularioExistente.ID_Formulario }, // Usa a chave primária para atualizar
      data: body,
    });

    return NextResponse.json(formularioAtualizado);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao atualizar formulário' }, { status: 500 });
  }
}