import { PrismaClient } from "../../../../generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
    
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Token não fornecido" }, { status: 401 });
    }

    const tokenParts = authHeader.split(" ");
    const idUsuario = parseInt(tokenParts[1]); // Extrai o ID do token
    console.log("ID do Usuário:", idUsuario);

    if (isNaN(idUsuario)) {
      return NextResponse.json({ error: "ID do usuário inválido" }, { status: 400 });
    }

    // Busca o paciente associado ao usuário
    const paciente = await prisma.pacientes.findUnique({
      where: { ID_Paciente: idUsuario },
    });

    if (!paciente) {
      return NextResponse.json({ error: "Paciente não encontrado" }, { status: 404 });
    }

    // Busca os dados do formulário médico associado ao paciente
    const formulario = await prisma.formularios.findFirst({
      where: { ID_Paciente: paciente.ID_Paciente },
    });
    const usuario = await prisma.usuarios.findUnique({
      where: { ID: paciente.ID },})
    return NextResponse.json({
      usuario,
      formulario,
      paciente,
    });
  } catch (error) {
    console.error("Erro no backend:", error);
    return NextResponse.json({ error: "Erro ao buscar informações do paciente" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
    try {
      const authHeader = request.headers.get("Authorization");
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json({ error: "Token não fornecido" }, { status: 401 });
      }
  
      const tokenParts = authHeader.split(" ");
      const idUsuario = parseInt(tokenParts[1]); // Extrai o ID do token
      console.log("ID do Usuário:", idUsuario);
  
      if (isNaN(idUsuario)) {
        return NextResponse.json({ error: "ID do usuário inválido" }, { status: 400 });
      }
  
      const body = await request.json();
      const { pacienteData, formularioData } = body;
  
      // Atualiza os dados do paciente
      if (pacienteData) {
        const paciente = await prisma.pacientes.findUnique({
          where: { ID_Paciente: idUsuario },
        });
  
        if (!paciente) {
          return NextResponse.json({ error: "Paciente não encontrado" }, { status: 404 });
        }
  
        await prisma.pacientes.update({
          where: { ID_Paciente: paciente.ID_Paciente },
          data: pacienteData,
        });
      }
  
      // Atualiza os dados do formulário médico
      if (formularioData) {
        const paciente = await prisma.pacientes.findUnique({
          where: { ID_Paciente: idUsuario },
        });
  
        if (!paciente) {
          return NextResponse.json({ error: "Paciente não encontrado" }, { status: 404 });
        }
  
        const formularioExistente = await prisma.formularios.findFirst({
          where: { ID_Paciente: paciente.ID_Paciente },
        });
  
        if (!formularioExistente) {
          return NextResponse.json({ error: "Formulário não encontrado" }, { status: 404 });
        }
  
        await prisma.formularios.update({
          where: { ID_Formulario: formularioExistente.ID_Formulario },
          data: formularioData,
        });
      }
  
      return NextResponse.json({ ok: true, message: "Informações atualizadas com sucesso" });
    } catch (error) {
      console.error("Erro no backend:", error);
      return NextResponse.json({ error: "Erro ao atualizar informações do paciente" }, { status: 500 });
    }
  }