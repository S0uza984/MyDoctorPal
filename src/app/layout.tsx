import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react"; // Importando o SessionProvider

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MyDoctorPal",
  description: "Medical Assistant",
};

/*export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}*/

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Definindo o layout raiz com as tags <html> e <body>
    <html lang="pt-BR">
      <body>
        {/* Envolvendo os filhos com o SessionProvider */}
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}

