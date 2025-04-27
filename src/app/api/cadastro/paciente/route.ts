import { NextResponse } from 'next/server';
import { PrismaClient } from '../../../../generated/prisma';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
      // Lê o corpo da requisição e converte de JSON para objeto JavaScript
      const body = await request.json();
  
      // Desestrutura os campos do objeto body
      const { nome, email, senha, telefone, cpf, nascimento } = body;
  
      // Valida os dados recebidos
      if (!nome || !email || !senha || !telefone || !cpf || !nascimento) {
        return NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 });
      }
  
      // Interage com o banco de dados usando Prisma
      const novoPaciente = await prisma.pacientes.create({
        data: {
          Nascimento: new Date(nascimento), // Converte string para Date
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
  
      // Retorna uma resposta de sucesso
      return NextResponse.json({ message: "Paciente cadastrado com sucesso", paciente: novoPaciente });
    } catch (error) {
      console.error(error);
      // Retorna uma resposta de erro
      return NextResponse.json({ error: "Erro ao cadastrar paciente" }, { status: 500 });
    }
  }