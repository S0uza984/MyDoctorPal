import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { findUserByCredentialsPaciente } from "./app/login/paciente/user";

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
      },
      authorize: async (credentials: Record<string, string> | undefined): Promise<any> =>{
        if (!credentials?.email || !credentials?.password) return null;

        // Verifica o usuário com base nas credenciais
        const user = await findUserByCredentialsPaciente(
          credentials.email as string,
          credentials.password as string
        );

        if (!user) return null;

        // Retorna o objeto do usuário com a role 'paciente'
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: "paciente",
        };
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
      return token;
    },
  },
  trustHost: true,
});
