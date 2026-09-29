import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Configuração de metadados da aplicação
export const metadata = {
  title: "Gestão de Clientes",
  description: "Sistema de controle e gerenciamento de clientes",
};

// Garantia de renderização responsiva correta para smartphones
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen w-full flex flex-col bg-gray-50 text-gray-900 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}