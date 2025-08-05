"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Palette as Behance, Github, ChevronLeft, ChevronRight, Menu, X } from "lucide-react"
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll"
import ProjectSlider from "../components/project-slider"
import { useActiveSection } from "../hooks/use-optimized-scroll"
import Dynamic3DScene from "../components/dynamic-3d-scene"

import ContactForm from "../components/contact-form"



export default function Home() {
  const sections = ["HOME", "ABOUT", "PROJECTS", "CONTACT"]
  const activeSection = useActiveSection(sections)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Handle section navigation
  const goToSection = (index: number) => {
    if (index >= 0 && index < sections.length) {
      scroll.scrollTo(document.getElementById(sections[index].toLowerCase())?.offsetTop || 0, {
        duration: 800,
        smooth: true,
      })
    }
  }



  // Projects data
  const projects = [
    {
      id: 1,
      title: "MixMaster Portfolio",
      description: "Portfolio profissional para serviços de mixing e mastering de música com design responsivo e internacionalização",
      video: "/videos/Mixmaster.mp4",
      alt: "MixMaster Portfolio",
      year: "2022",
      url: "https://mixmaster-portfolio.vercel.app/"
    },
    {
      id: 2,
      title: "Care Idosos",
      description: "Sistema completo de cuidados para idosos com gerenciamento de consultas médicas, medicamentos, contatos de emergência e interface adaptada",
      video: "/videos/Care.mp4",
      alt: "Care Idosos System",
      year: "2025",
      url: "https://care-idosos.vercel.app/"
    },
    {
      id: 3,
      title: "Mega Loterias",
      description: "Plataforma web moderna para acompanhar resultados e gerar jogos das principais loterias brasileiras com interface glassmorphism e cores dinâmicas",
      video: "/videos/Mega.mp4",
      alt: "Mega Loterias Platform",
      year: "2023",
      url: "https://mega-loterias.vercel.app/"
    },
    {
      id: 4,
      title: "File Converter",
      description: "Conversor de arquivos online com suporte a múltiplos formatos de documentos, vídeos, imagens e áudio com interface moderna",
      video: "/videos/File.mp4",
      alt: "File Converter",
      year: "2023",
      url: "https://file-converter-blond.vercel.app/"
    },
    {
      id: 5,
      title: "Nike 3D Experience",
      description: "Experiência interativa 3D para explorar produtos Nike com visualização realista, controles interativos e variações de cor em tempo real",
      video: "/videos/Nike.mp4",
      alt: "Nike 3D Experience",
      year: "2024",
      url: "https://nike-air-display-website.vercel.app/"
    },
    {
      id: 6,
      title: "Vigor Viv 3D",
      description: "Site com visualização e interação 3D com produtos da linha Vigor Viv da Batavo, apresentando diversos sabores de forma imersiva",
      video: "/videos/Viv.mp4",
      alt: "Vigor Viv 3D",
      year: "2024",
      url: "https://yogurt-3d-website.vercel.app/"
    }
  ]

  // Experience data
  const experiences = [
    {
      title: "Motion Designer",
      period: "2023 - Presente",
      company: "A. Jung Soluções Corporativas"
    },
    {
      title: "Desenvolvedor Fullstack",
      period: "2020 - 2023",
      company: "UpWork / Fiverr"
    },
    {
      title: "Designer Gráfico",
      period: "2015 - 2020",
      company: "Grupo Auge Segurança"
    }
  ]

  // Education data
  const education = [
    {
      title: "Análise e Desenvolvimento de Sistemas",
      period: "2023 - 2025",
      institution: "Centro Universitário Senac"
    },
    {
      title: "Design de Animação",
      period: "2019 - 2021",
      institution: "Centro Universitário Senac"
    }
  ]

  // Social links data
  const socialLinks = [
    {
      url: "https://github.com/OdairGSoares",
      icon: <Github size={20} />
    },
    {
      url: "https://www.behance.net/odairgomessoares",
      icon: <Behance size={20} />
    }
  ]

  // Navigation arrows component
  const NavigationArrows = () => (
    <div className="hidden 2xl:flex absolute bottom-24 right-10 z-20 items-center space-x-4">
      <button
        onClick={() => goToSection(activeSection === 0 ? sections.length - 1 : activeSection - 1)}
        className="w-10 h-10 border border-gray-700 flex items-center justify-center hover:border-[#0066cc] hover:text-[#0066cc] transition-colors"
        aria-label="Seção anterior"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={() => goToSection(activeSection === sections.length - 1 ? 0 : activeSection + 1)}
        className="w-10 h-10 border border-gray-700 flex items-center justify-center hover:border-[#0066cc] hover:text-[#0066cc] transition-colors"
        aria-label="Próxima seção"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  )

  // Section title component
  const SectionTitle = ({ title }: { title: string }) => (
    <div className="flex items-center mb-12">
      <div className="w-12 h-[1px] bg-[#0066cc] mr-4" />
      <span className="text-sm text-gray-300 uppercase tracking-widest">{title}</span>
    </div>
  )

  return (
    <div ref={containerRef} className="bg-[#111111] text-white min-h-screen">
      {/* Mobile Header - Only visible below 1440px */}
      <div className="2xl:hidden fixed top-0 left-0 right-0 h-16 bg-[#0a0a0a] z-50 flex items-center justify-between px-4 border-b border-[#222222]">
        <Link href="/" className="block">
          <div className="w-10 h-10 bg-[#0066cc] flex items-center justify-center">
            <span className="font-bold text-lg">OS</span>
          </div>
        </Link>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-300 hover:text-white transition-colors"
          aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-menu"
          className="2xl:hidden fixed inset-0 bg-black/95 z-40 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
        >
          <nav className="flex flex-col items-center space-y-8">
            {sections.map((section, index) => (
              <ScrollLink
                key={section}
                to={section.toLowerCase()}
                spy={true}
                smooth={true}
                duration={800}
                onClick={() => {
                  setIsMobileMenuOpen(false)
                }}
                className={`text-2xl font-medium ${
                  activeSection === index ? "text-[#0066cc]" : "text-gray-300"
                } hover:text-white transition-colors`}
                aria-label={`Ir para seção ${section}`}
              >
                {section}
              </ScrollLink>
            ))}
          </nav>
        </div>
      )}

      {/* Left sidebar navigation - Only visible on 1440px and above */}
      <div className="hidden 2xl:flex fixed left-0 top-0 bottom-0 w-[80px] bg-[#0a0a0a] z-50 flex-col">
        <div className="p-4 border-b border-[#222222]">
          <Link href="/" className="block w-10 h-10">
            <div className="w-10 h-10 bg-[#0066cc] flex items-center justify-center">
              <span className="font-bold text-lg">OS</span>
            </div>
          </Link>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          <nav className="space-y-12">
            {sections.map((section, index) => (
              <ScrollLink
                key={section}
                to={section.toLowerCase()}
                spy={true}
                smooth={true}
                duration={800}
                onClick={() => {}}
                                 className={`w-full flex flex-col items-center justify-center group cursor-pointer ${
                   activeSection === index ? "text-[#0066cc]" : "text-gray-300"
                 }`}
                aria-label={`Ir para seção ${section}`}
                aria-current={activeSection === index ? "page" : undefined}
              >
                <div className="h-12 flex items-center justify-center relative">
                  <span className="text-xs font-medium tracking-widest transform -rotate-90 group-hover:text-white transition-colors absolute whitespace-nowrap">
                    {section}
                  </span>
                </div>
                <div className="h-12 flex items-center justify-center mt-2">
                  <div className={`w-1 h-6 ${activeSection === index ? "bg-[#0066cc]" : "bg-transparent"}`} />
                </div>
              </ScrollLink>
            ))}
          </nav>
        </div>

        <div className="p-4 flex flex-col items-center space-y-4 border-t border-[#222222]">
          {/* Social icons */}
          {["github", "behance"].map((social, index) => (
            <a
              key={social}
              href={index === 0 ? "https://github.com/OdairGSoares" : "https://www.behance.net/odairgomessoares"}
              target="_blank"
              rel="noopener noreferrer"
                             className="text-gray-300 hover:text-white transition-colors"
              aria-label={index === 0 ? "Visitar perfil no GitHub" : "Visitar perfil no Behance"}
            >
              {index === 0 ? <Github size={18} /> : <Behance size={18} />}
            </a>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="2xl:ml-[80px]">
        {/* HOME section */}
        <section id="home" className="h-screen relative overflow-hidden">
          <Dynamic3DScene />

          <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/80 to-transparent z-10" />

          <div className="relative z-20 h-full flex flex-col justify-center items-start px-4 sm:px-8 md:px-16 max-w-2xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4">
                <span className="text-white">ODA</span>
                <span className="text-[#0066cc]">IR</span>
                <span className="text-[#0066cc]">.</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 mb-8">Web Designer</p>
              <div className="flex items-center space-x-4">
                <div className="w-8 sm:w-12 h-[1px] bg-[#0066cc]" />
                                 <span className="text-xs sm:text-sm text-gray-300">Portfólio 2025</span>
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
              className="flex flex-col items-center"
            >
                             <span className="text-xs text-gray-300 mb-2">ROLAR PARA BAIXO</span>
              <div className="w-5 h-10 border border-gray-600 rounded-full flex justify-center">
                <motion.div
                  className="w-1 h-1 bg-[#0066cc] rounded-full mt-2"
                  animate={{ y: [0, 12, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                />
              </div>
            </motion.div>
          </div>

          <NavigationArrows />
        </section>

        {/* ABOUT section */}
        <section id="about" className="py-24 relative overflow-hidden mt-16 2xl:mt-0">
          <div className="absolute inset-0 bg-[#111111] z-0" />

          <div className="relative z-10 px-4 sm:px-8 md:px-16">
            <div className="max-w-4xl">
              <SectionTitle title="Sobre" />

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12">
                <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                  <div>
                    <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                      Soluções inovadoras
                    </h2>

                    <p className="text-gray-300 mb-4">
                      Olá! Sou Odair Gomes Soares, um desenvolvedor fullstack de 23 anos com paixão por criar experiências web 
                      excepcionais. Combino habilidades técnicas em desenvolvimento com conhecimentos em UI/UX e web design para 
                      entregar soluções completas e inovadoras.
                    </p>

                    <p className="text-gray-300 mb-4">
                      Minha jornada começou como designer gráfico, evoluindo para desenvolvimento web fullstack. Hoje, 
                      me especializo em criar aplicações web modernas utilizando tecnologias como React, Node.js, SQL e Python, 
                      sempre focando em código limpo e experiências de usuário intuitivas.
                    </p>

                    <div className="mt-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-[1px] bg-[#0066cc]" />
                        <span className="text-sm text-gray-300">odagomess708@gmail.com</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg lg:text-xl font-bold mb-3">Experiência</h3>
                      <div className="space-y-3">
                        {experiences.map((exp, index) => (
                          <div key={index}>
                                                         <div className="flex justify-between text-sm mb-1">
                               <span className="text-white">{exp.title}</span>
                                                               <span className="text-gray-200">{exp.period}</span>
                             </div>
                            <p className="text-gray-300 text-sm">{exp.company}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg lg:text-xl font-bold mb-3">Educação</h3>
                      <div className="space-y-3">
                        {education.map((edu, index) => (
                          <div key={index}>
                                                         <div className="flex justify-between text-sm mb-1">
                               <span className="text-white max-w-[150px]">{edu.title}</span>
                                                               <span className="text-gray-200">{edu.period}</span>
                             </div>
                            <p className="text-gray-300 text-sm">{edu.institution}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image Column */}
                <div className="relative h-full w-full min-h-[350px] xl:min-h-0">
                  <div className="absolute inset-0 bg-[#0066cc]/10 z-0" />
                  <img
                    src="/imagem-sobre.webp"
                    alt="Odair Gomes Soares"
                    className="w-full h-full object-cover relative z-10"
                    loading="lazy"
                    width={500}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent z-20" />
                </div>
              </div>
            </div>
          </div>

          <NavigationArrows />
        </section>

        {/* PROJECTS section */}
        <section id="projects" className="py-32 relative overflow-hidden mt-16 2xl:mt-0">
          <div className="absolute inset-0 bg-[#111111] z-0" />

          <div className="relative z-10">
            {/* Section Title - Centered */}
            <div className="px-4 sm:px-8 md:px-16 mb-16">
              <div className="max-w-4xl">
                <SectionTitle title="Projetos" />
              </div>
            </div>

            {/* Project Slider - Full Width */}
            <div className="w-full px-4 sm:px-8 md:px-16">
              <ProjectSlider projects={projects} />
            </div>
          </div>

          <NavigationArrows />
        </section>

        {/* CONTACT section */}
        <section id="contact" className="py-32 relative overflow-hidden mt-16 2xl:mt-0">
          <div className="absolute inset-0 bg-[#111111] z-0" />

          <div className="relative z-10 px-4 sm:px-8 md:px-16">
            <div className="max-w-4xl">
              <SectionTitle title="Contato" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div>
                  <h2 className="text-4xl font-bold mb-8">Vamos trabalhar juntos no seu próximo projeto</h2>

                  <p className="text-gray-300 mb-12">
                    Estou sempre aberto a novos projetos e oportunidades de colaboração. Se você tem um projeto em mente
                    ou apenas quer bater um papo, não hesite em entrar em contato.
                  </p>

                  <div className="space-y-6">
                    {[
                                             { title: "Email", content: <a href="mailto:odagomess708@gmail.com" className="text-[#0066cc] hover:underline font-semibold">odagomess708@gmail.com</a> },
                      { title: "Telefone", content: <p className="text-gray-300">(11) 95814-6800</p> },
                      { title: "Localização", content: <p className="text-gray-300">São Paulo – Zona Sul</p> }
                    ].map((item, index) => (
                      <div key={index}>
                        <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                        {item.content}
                      </div>
                    ))}

                    <div>
                      <h3 className="text-lg font-bold mb-2">Social</h3>
                      <div className="flex space-x-4">
                        {socialLinks.map((link, index) => (
                          <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-[#0066cc] transition-colors"
                            aria-label={index === 0 ? "Visitar perfil no GitHub" : "Visitar perfil no Behance"}
                          >
                            {link.icon}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <ContactForm 
                    onSubmit={(data) => {
                      console.log('Form submitted:', data)
                      // Aqui você pode implementar o envio real do formulário
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <NavigationArrows />

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 border-t border-[#222222] py-4 px-16 z-20">
            <div className="flex justify-between items-center">
                             <div className="text-xs text-gray-300">
                 © {new Date().getFullYear()} Odair Gomes Soares. Todos os direitos reservados.
               </div>
               <div className="text-xs text-gray-300">Desenvolvido com ♥ por Odair</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

