import { PrismaClient } from "../../../../generated/prisma";
import { NextResponse } from "next/server";
import { auth } from "../../../../auth";

const prisma = new PrismaClient();


export async function GET(request: Request) {
    const session = await auth();
    const idUsuario = session?.user?.id; 
   
    const paciente = await prisma.pacientes.findFirst({
         where: { ID: parseInt(idUsuario) },
        });
 
        if (!paciente.ID_Paciente) {
            return NextResponse.json({ error: "Paciente não encontrado." }, { status: 404 });
        }
    //console.log("Paciente encontrado:", paciente);

    const now = new Date();
    now.setHours(now.getHours() - 3); // Ajusta para UTC-3
    //console.log("Data e hora atual:", now);

    const consultas = await prisma.consultas.findMany({
    where: {
        ID_Paciente: paciente.ID_Paciente,
        Data_Horario: { gte: now }, // só futuras  
        },
    orderBy: { Data_Horario: 'asc' },
    take: 7,
    include: {
        medicos: true, // inclua dados do médico se quiser mostrar nome/especialidade
    },
    });
    const consultasComMedico = await Promise.all(
    consultas.map(async (consulta) => {
    const medico = await prisma.usuarios.findUnique({
      where: { ID: consulta.medicos.ID },
      select: { Nome: true},
    });
    return { ...consulta, medico };
    }));
    console.log("Consultas encontradas:", consultas, consultasComMedico);
    return NextResponse.json({ consultas: consultasComMedico });
}