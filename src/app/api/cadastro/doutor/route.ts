import { NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/prisma";

 const prisma = new PrismaClient();

export async function POST(request: Request){
    const body = await request.json();
    const { nome, email, senha, telefone, crm,cpf, especialidade } = body;
    try {
        if (!nome || !email || !senha || !telefone || !crm || !cpf || !especialidade){
            return NextResponse.json({ error: "Todos os campos são obrigatórios"}, {status: 400});    
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
        })
        return NextResponse.json({ message: "Médico cadastrado com sucesso", medico: novoMedico});
    }
    catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao cadastrar médico. Verifique os dados"}, {status: 500});
    }

}