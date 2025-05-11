'use client';  // Este arquivo é um componente cliente

import { signIn } from "next-auth/react";

export default async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const result = await signIn("credentials", {
    redirect: false,  // Impede o redirecionamento automático
    email,
    password,
  });

  if (result?.error === "CredentialsSignin") {
    //console.error("Erro no login:", result.error);
    return { success: false, error: 'Credenciais inválidas' };
  }

  return { success: true };
}
