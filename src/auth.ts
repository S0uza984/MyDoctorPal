import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { findUserByCredentialsPaciente } from "./app/login/paciente/user";
import { findUserByCredentialsMedico } from "./app/login/doutor/user";

// Definindo a interface para as credenciais
interface LoginCredentials {
  email: string;
  password: string;
}

// Definindo a interface para o usuário retornado
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Senha", type: "password" },
        page: { label: "Page", type: "text" }, // Adiciona o campo 'page'
      },
      authorize: async (credentials: Record<string, string> | undefined): Promise<any> =>{
        if (!credentials?.email || !credentials?.password) return null;

        if (credentials?.page === "/login/paciente") {
        // Verifica se o usuário é um paciente
          const paciente = await findUserByCredentialsPaciente(
          credentials.email as string,
          credentials.password as string
        );

          if (paciente) {
            return {
              id: paciente.id,
              name: paciente.name,
              email: paciente.email,
              role: "paciente",
            };
          }
        } 

        if (credentials?.page === "/login/doutor") {
        // Verifica se o usuário é um médico
          const medico = await findUserByCredentialsMedico(
          credentials.email as string,
          credentials.password as string
        );

          if (medico) {
            return {
              id: medico.id,
              name: medico.name,
              email: medico.email,
              role: "medico",
            };
          }
        }

        // Retorna null se nenhum usuário for encontrado
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Se o token contiver a role, atribuimos ao usuário na sessão
      if (token?.role && session.user) {
        session.user.role = token.role as string;
      }
      if (token?.name && session.user) {
        session.user.name = token.name as string;
      }
      if (token?.id && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      // Se o usuário tiver role, atribuimos ao token
      if (user?.role) {
        token.role = user.role;
      }
      if (user?.name) {
        token.name = user.name;
      }
      if (user?.id) {
        token.id = user.id;
      }
      return token;
    },
  },
  trustHost: true,
});
