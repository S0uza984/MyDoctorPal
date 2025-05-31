import { PrismaClient } from "../../../generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { idConsulta, conteudo } = body;
    if (!idConsulta) {
      return NextResponse.json({ error: "Consulta não informada" }, { status: 400 });
    }
    // Verifica se já existe anotação para a consulta
    const anotacaoExistente = await prisma.anotacao.findFirst({
      where: { ID_Consulta: idConsulta },
    });
    let anotacao;
    if (anotacaoExistente) {
      anotacao = await prisma.anotacao.update({
        where: { ID_Anotacao: anotacaoExistente.ID_Anotacao },
        data: { Conteudo: conteudo },
      });
    } else {
      anotacao = await prisma.anotacao.create({
        data: { ID_Consulta: idConsulta, Conteudo: conteudo },
      });
    }
    return NextResponse.json({ anotacao });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao salvar anotação" }, { status: 500 });
  }
} 