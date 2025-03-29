import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Odair Gomes Soares | Desenvolvedor & Designer",
  description:
    "Portfólio de Odair Gomes Soares, desenvolvedor e designer especializado em experiências digitais imersivas e interfaces que encantam usuários.",
  generator: 'v0.dev',
  icons: {
    icon: '/favicon.ico',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  )
}



import './globals.css'