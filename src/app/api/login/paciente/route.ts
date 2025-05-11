import { NextResponse } from 'next/server';
import { PrismaClient } from '../../../../generated/prisma';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, senha } = body;
    if (!email || !senha) {
      return NextResponse.json({ error: 'Email e senha são obrigatórios' }, { status: 400 });
    }
    const usuario = await prisma.usuarios.findUnique({ where: { Email: email } });
    if (!usuario || usuario.Senha !== senha) {
      return NextResponse.json({ error: 'Email ou senha inválidos' }, { status: 401 });
    }
    // Verifica se é paciente
    const paciente = await prisma.pacientes.findFirst({ where: { ID: usuario.ID } });
    if (!paciente) {
      return NextResponse.json({ error: 'Usuário não é paciente' }, { status: 403 });
    }
    return NextResponse.json({ message: 'Login realizado com sucesso', usuario: { id: usuario.ID, nome: usuario.Nome, email: usuario.Email } });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao realizar login' }, { status: 500 });
  }
} 