"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { PerspectiveCamera, Environment, Float, OrbitControls } from "@react-three/drei"
import { Instagram, DribbbleIcon as Behance, Dribbble, ChevronLeft, ChevronRight, Menu, X } from "lucide-react"
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll"

// 3D Model component
function Model() {
  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.6}>
      <mesh>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <meshStandardMaterial
          color="#0066cc"
          metalness={0.8}
          roughness={0.2}
          emissive="#003366"
          emissiveIntensity={0.5}
        />
      </mesh>
    </Float>
  )
}

// Scene component
function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <Model />
      <Environment preset="city" />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </>
  )
}

export default function Home() {
  const [activeSection, setActiveSection] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const sections = ["HOME", "ABOUT", "PROJECTS", "CONTACT"]
  const containerRef = useRef<HTMLDivElement>(null)

  // Handle section navigation
  const goToSection = (index: number) => {
    if (index >= 0 && index < sections.length) {
      setActiveSection(index)
      scroll.scrollTo(document.getElementById(sections[index].toLowerCase())?.offsetTop || 0, {
        duration: 800,
        smooth: true,
      })
    }
  }

  // Handle scroll events to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map((section) => document.getElementById(section.toLowerCase()))
      const currentPosition = window.scrollY + window.innerHeight / 3

      sectionElements.forEach((element, index) => {
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (currentPosition >= offsetTop && currentPosition < offsetTop + offsetHeight) {
            setActiveSection(index)
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections])

  // Projects data
  const projects = [
    {
      id: 1,
      title: "Nike Dunk Low 3D",
      description: "Apresentação interativa em 3D do tênis Nike Dunk Low utilizando React, Three.js e TailwindCSS",
      image: "/shoe-3d-presentation.jpg",
      alt: "Nike DunkLow 3D Model",
      year: "2025",
      url: "https://dunk-low-3d-website.vercel.app/"
    },
    {
      id: 2,
      title: "Attriuzen Portfólio",
      description: "Landing page e portfólio musical desenvolvido com React e TailwindCSS para o músico artista Attriuzen",
      image: "/attriuzen-portfólio.jpg",
      alt: "Attriuzen Portfolio",
      year: "2024",
      url: "https://attriuzen-portfolio-odairgsoares-projects.vercel.app/"
    },
    {
      id: 3,
      title: "Sistema de Gestão Web",
      description: "Aplicação fullstack com PHP 8, MySQL e React para gestão empresarial",
      image: "/placeholder.svg?height=990&width=1440",
      alt: "Web System",
      year: "2022",
      url: "https://sistema-gestao.vercel.app"
    },
    {
      id: 4,
      title: "Portal Corporativo WordPress",
      description: "Desenvolvimento de tema personalizado e plugins para WordPress",
      image: "/placeholder.svg?height=990&width=1440",
      alt: "WordPress Portal",
      year: "2021",
      url: "https://portal-corporativo.com.br"
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
      period: "2023 - Presente",
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
      url: "https://www.linkedin.com/in/odair-gomes-9baab01ab",
      icon: <Instagram size={20} />
    },
    {
      url: "https://github.com/OdairGSoares",
      icon: <Behance size={20} />
    }
  ]

  // Navigation arrows component
  const NavigationArrows = () => (
    <div className="hidden 2xl:flex absolute bottom-24 right-10 z-20 items-center space-x-4">
      <button
        onClick={() => goToSection(activeSection === 0 ? sections.length - 1 : activeSection - 1)}
        className="w-10 h-10 border border-gray-700 flex items-center justify-center hover:border-[#0066cc] hover:text-[#0066cc] transition-colors"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={() => goToSection(activeSection === sections.length - 1 ? 0 : activeSection + 1)}
        className="w-10 h-10 border border-gray-700 flex items-center justify-center hover:border-[#0066cc] hover:text-[#0066cc] transition-colors"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  )

  // Section title component
  const SectionTitle = ({ title }: { title: string }) => (
    <div className="flex items-center mb-12">
      <div className="w-12 h-[1px] bg-[#0066cc] mr-4" />
      <span className="text-sm text-gray-400 uppercase tracking-widest">{title}</span>
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
          className="text-gray-400 hover:text-white transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="2xl:hidden fixed inset-0 bg-black/95 z-40 flex items-center justify-center">
          <nav className="flex flex-col items-center space-y-8">
            {sections.map((section, index) => (
              <ScrollLink
                key={section}
                to={section.toLowerCase()}
                spy={true}
                smooth={true}
                duration={800}
                onClick={() => {
                  setActiveSection(index)
                  setIsMobileMenuOpen(false)
                }}
                className={`text-2xl font-medium ${
                  activeSection === index ? "text-[#0066cc]" : "text-gray-400"
                } hover:text-white transition-colors`}
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
                onClick={() => setActiveSection(index)}
                className={`w-full flex flex-col items-center justify-center group cursor-pointer ${
                  activeSection === index ? "text-[#0066cc]" : "text-gray-500"
                }`}
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
          {["instagram", "behance", "dribbble"].map((social, index) => (
            <a
              key={social}
              href={index === 0 ? "https://instagram.com" : index === 1 ? "https://behance.net" : "https://dribbble.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors"
            >
              {index === 0 ? <Instagram size={18} /> : index === 1 ? <Behance size={18} /> : <Dribbble size={18} />}
            </a>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="2xl:ml-[80px] mt-16 2xl:mt-0">
        {/* HOME section */}
        <section id="home" className="h-screen relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Canvas>
              <Scene />
            </Canvas>
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/80 to-transparent z-10" />

          <div className="relative z-20 h-full flex flex-col justify-center px-4 sm:px-8 md:px-16 max-w-2xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4">
                <span className="text-white">ODA</span>
                <span className="text-[#0066cc]">IR</span>
                <span className="text-[#0066cc]">.</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-400 mb-8">Desenvolvedor Web Fullstack</p>
              <div className="flex items-center space-x-4">
                <div className="w-8 sm:w-12 h-[1px] bg-[#0066cc]" />
                <span className="text-xs sm:text-sm text-gray-400">Portfólio 2024</span>
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
              <span className="text-xs text-gray-400 mb-2">ROLAR PARA BAIXO</span>
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
        <section id="about" className="min-h-screen relative overflow-hidden">
          <div className="absolute inset-0 bg-[#111111] z-0" />

          <div className="relative z-10 h-full flex flex-col justify-center px-4 sm:px-8 md:px-16 py-24">
            <div className="max-w-4xl">
              <SectionTitle title="Sobre" />

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-16">
                <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
                  <div>
                    <h2 className="text-4xl font-bold mb-8">
                      Desenvolvedor Web Fullstack com foco em soluções digitais inovadoras
                    </h2>

                    <p className="text-gray-400 mb-6">
                      Olá! Sou Odair Gomes Soares, um desenvolvedor fullstack de 23 anos com paixão por criar experiências web 
                      excepcionais. Combino habilidades técnicas em desenvolvimento com conhecimentos em UI/UX e web design para 
                      entregar soluções completas e inovadoras.
                    </p>

                    <p className="text-gray-400 mb-6">
                      Minha jornada começou como designer gráfico, evoluindo para desenvolvimento web fullstack. Hoje, 
                      especializo-me em criar aplicações web modernas utilizando tecnologias como React, Node.js, SQL e Python, 
                      sempre focando em código limpo e experiências de usuário intuitivas.
                    </p>

                    <div className="mt-8">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-[1px] bg-[#0066cc]" />
                        <span className="text-sm text-gray-400">odagomess708@gmail.com</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-bold mb-4">Experiência</h3>
                      <div className="space-y-4">
                        {experiences.map((exp, index) => (
                          <div key={index}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-white">{exp.title}</span>
                              <span className="text-gray-500">{exp.period}</span>
                            </div>
                            <p className="text-gray-400 text-sm">{exp.company}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-4">Educação</h3>
                      <div className="space-y-4">
                        {education.map((edu, index) => (
                          <div key={index}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-white">{edu.title}</span>
                              <span className="text-gray-500">{edu.period}</span>
                            </div>
                            <p className="text-gray-400 text-sm">{edu.institution}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image Column */}
                <div className="relative h-full w-full min-h-[400px] xl:min-h-0">
                  <div className="absolute inset-0 bg-[#0066cc]/10 z-0" />
                  <img
                    src="/imagem-sobre.webp"
                    alt="Odair Gomes Soares"
                    className="w-full h-full object-cover relative z-10"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent z-20" />
                </div>
              </div>
            </div>
          </div>

          <NavigationArrows />
        </section>

        {/* PROJECTS section */}
        <section id="projects" className="min-h-screen relative overflow-hidden">
          <div className="absolute inset-0 bg-[#111111] z-0" />

          <div className="relative z-10 h-full flex flex-col justify-center px-4 sm:px-8 md:px-16 py-24">
            <div className="max-w-6xl">
              <SectionTitle title="Projetos" />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {projects.map((project) => (
                  <a
                    key={project.id}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden block"
                  >
                    <div className="aspect-[1440/990] bg-gray-900 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.alt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                      <div className="flex items-center">
                        <div className="w-8 h-[1px] bg-[#0066cc] mr-3" />
                        <span className="text-xs text-gray-400">{project.year}</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <NavigationArrows />
        </section>

        {/* CONTACT section */}
        <section id="contact" className="min-h-screen relative overflow-hidden">
          <div className="absolute inset-0 bg-[#111111] z-0" />

          <div className="relative z-10 h-full flex flex-col justify-center px-4 sm:px-8 md:px-16 py-24">
            <div className="max-w-4xl">
              <SectionTitle title="Contato" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div>
                  <h2 className="text-4xl font-bold mb-8">Vamos trabalhar juntos no seu próximo projeto</h2>

                  <p className="text-gray-400 mb-12">
                    Estou sempre aberto a novos projetos e oportunidades de colaboração. Se você tem um projeto em mente
                    ou apenas quer bater um papo, não hesite em entrar em contato.
                  </p>

                  <div className="space-y-6">
                    {[
                      { title: "Email", content: <a href="mailto:odagomess708@gmail.com" className="text-[#0066cc] hover:underline">odagomess708@gmail.com</a> },
                      { title: "Telefone", content: <p className="text-gray-400">(11) 95814-6800</p> },
                      { title: "Localização", content: <p className="text-gray-400">São Paulo – Zona Sul</p> }
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
                            className="text-gray-400 hover:text-[#0066cc] transition-colors"
                          >
                            {link.icon}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <form className="space-y-6">
                    {[
                      { id: "name", label: "Nome", type: "text", placeholder: "Seu nome" },
                      { id: "email", label: "Email", type: "email", placeholder: "Seu email" }
                    ].map((field) => (
                      <div key={field.id}>
                        <label htmlFor={field.id} className="block text-sm font-medium text-gray-400 mb-2">
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          id={field.id}
                          className="w-full bg-[#1a1a1a] border border-[#333333] text-white px-4 py-3 focus:outline-none focus:border-[#0066cc] transition-colors"
                          placeholder={field.placeholder}
                        />
                      </div>
                    ))}

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                        Mensagem
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        className="w-full bg-[#1a1a1a] border border-[#333333] text-white px-4 py-3 focus:outline-none focus:border-[#0066cc] transition-colors"
                        placeholder="Sua mensagem"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#0066cc] text-white font-medium hover:bg-[#0055aa] transition-colors"
                    >
                      Enviar Mensagem
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <NavigationArrows />

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 border-t border-[#222222] py-4 px-16 z-20">
            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-500">
                © {new Date().getFullYear()} Odair Gomes Soares. Todos os direitos reservados.
              </div>
              <div className="text-xs text-gray-500">Desenvolvido com ♥ por Odair</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

