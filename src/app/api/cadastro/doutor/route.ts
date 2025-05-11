import { NextResponse } from 'next/server';
import { PrismaClient } from '../../../../generated/prisma';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
      const body = await request.json();
      const { nome, email, senha, telefone, cpf, crm, especialidade } = body;

      if (!nome || !email || !senha || !telefone || !cpf || !crm || !especialidade) {
        return NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 });
      }

      const novoMedico = await prisma.medicos.create({
        data: {
          CRM: crm,
          Especialidade: especialidade,
          usuarios: {
            create: {
              Nome: nome,
              Email: email,
              Senha: senha,
              Telefone: telefone,
              CPF: cpf
            }
          }
        }
      });

      return NextResponse.json({ message: "Médico cadastrado com sucesso", medico: novoMedico });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Erro ao cadastrar médico" }, { status: 500 });
    }
} 