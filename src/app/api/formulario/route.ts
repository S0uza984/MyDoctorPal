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