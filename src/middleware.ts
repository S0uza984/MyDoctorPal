import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  // Se o token não existir, redireciona para a página de login
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const role = token.role; // Obtém a role do token
  const pathname = req.nextUrl.pathname; // Obtém a rota acessada

 if(pathname.startsWith("/paciente") && role !== "paciente"){
    return NextResponse.redirect(new URL("/nao-permitida", req.url));
 }
 if(pathname.startsWith("/medico") && role !== "medico"){
    return NextResponse.redirect(new URL("/nao-permitida", req.url));
 }
  // Permite que a requisição continue
  return NextResponse.next();
}

// Configuração para aplicar o middleware apenas nas rotas protegidas
export const config = {
  matcher: ["/paciente/:path*", "/medico/:path*"], // Aplica o middleware apenas nas rotas relevantes
};