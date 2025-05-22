import { PrismaClient } from "../../../../generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PATCH(request, { params }) {
  const id = Number(params.id);
  if (!id) return NextResponse.json({ error: "ID inválido" }, { status: 400 });

  try {
    await prisma.consultas.update({
      where: { ID_Consulta: id },
      data: { Status_: "NEGADA" }, // Atualiza o status para NEGADA
    });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Erro ao negar" }, { status: 500 });
  }
}
