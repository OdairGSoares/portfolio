import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
})

export const metadata: Metadata = {
  title: "Odair Gomes Soares | Desenvolvedor & Designer",
  description:
    "Portfólio de Odair Gomes Soares, desenvolvedor e designer especializado em experiências digitais imersivas e interfaces que encantam usuários.",
  generator: 'v0.dev',
  icons: {
    icon: '/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Odair Gomes Soares | Desenvolvedor & Designer",
    description: "Portfólio de Odair Gomes Soares, desenvolvedor e designer especializado em experiências digitais imersivas.",
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Odair Gomes Soares | Desenvolvedor & Designer",
    description: "Portfólio de Odair Gomes Soares, desenvolvedor e designer especializado em experiências digitais imersivas.",
  }
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#111111',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/imagem-sobre.webp" as="image" type="image/webp" />
        <link rel="preload" href="/videos/Mega.mp4" as="video" type="video/mp4" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  )
}