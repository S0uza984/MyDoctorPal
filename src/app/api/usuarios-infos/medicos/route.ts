import { PrismaClient } from "../../../../generated/prisma";
import { NextResponse } from "next/server";
import { auth } from "../../../../auth"; 
import { parse } from "path";

const prisma = new PrismaClient();

export async function GET(request: Request) {
    
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Usuário não autenticado." }, { status: 401 });
    }

    const idUsuario = session?.user?.id; 


    const medico = await prisma.medicos.findFirst({
      where: { ID: parseInt(idUsuario) },
    });
    
    if (!medico.ID_Medico) {
      return NextResponse.json({ error: "Médico não encontrado." }, { status: 404 });
    }

    const usuario = await prisma.usuarios.findFirst({
      where: { ID: parseInt(idUsuario) },
    });
    return NextResponse.json({
      usuario,
      medico,

    });
  } catch (error) {
    console.error("Erro no backend:", error);
    return NextResponse.json({ error: "Erro ao buscar informações do paciente" }, { status: 500 });
  }
}