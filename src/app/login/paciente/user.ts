import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient();

// Tipando o retorno da função findUserByCredentialsPaciente
interface UserDatabaseResponse {
  id: number;
  email: string;
  name: string;
  isPaciente: boolean;
}

export async function findUserByCredentialsPaciente(email: string, password: string): Promise<UserDatabaseResponse | null> {
  // Procura o usuário com base no email e senha
  const user = await prisma.usuarios.findFirst({
    where: {
      Email: email,
      // A comparação de senha deve ser feita usando bcrypt (se as senhas forem armazenadas como hash)
      Senha: password, // Aqui você deve substituir por bcrypt.compare se a senha for hash
      pacientes: {
        some: {}, // Verifica se há um relacionamento com a tabela `pacientes`
      },
    },
    include: {
      pacientes: true, // Inclui informações do paciente, se necessário
    },
  });

  if (!user) {
    return null; // Retorna null se o usuário não for encontrado
  }

  // Caso o usuário seja encontrado, retorna os dados necessários
  return {
    id: user.ID,            // ID como número
    email: user.Email,      // Email
    name: user.Nome,        // Nome
    isPaciente: user.pacientes.length > 0, // Verifica se o usuário é um paciente
  };
}
