"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import OptimizedVideo from "./optimized-video"

// Hook para detectar se é mobile
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }
    
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  return isMobile
}

interface Project {
  id: number
  title: string
  description: string
  video: string
  alt: string
  year: string
  url: string
}

interface ProjectSliderProps {
  projects: Project[]
}

export default function ProjectSlider({ projects }: ProjectSliderProps) {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0)
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const touchStartRef = useRef<number>(0)
  const touchEndRef = useRef<number>(0)
  const isMobile = useIsMobile()

  // Lógica responsiva: mobile = 1 projeto, desktop = 3 projetos
  const projectsPerView = isMobile ? 1 : 3
  const hasNavigation = projects.length > 1 // Sempre mostra navegação se tem mais de 1 projeto

  // Navigation functions - lógica responsiva
  const nextSlide = () => {
    setActiveProjectIndex(prev => {
      if (isMobile) {
        // Mobile: navegação de 1 em 1
        return prev >= projects.length - 1 ? 0 : prev + 1
      } else {
        // Desktop: lógica simplificada com 2 posições
        if (projects.length <= 3) return 0
        return prev === 0 ? 3 : 0
      }
    })
  }

  const prevSlide = () => {
    setActiveProjectIndex(prev => {
      if (isMobile) {
        // Mobile: navegação de 1 em 1
        return prev <= 0 ? projects.length - 1 : prev - 1
      } else {
        // Desktop: lógica simplificada com 2 posições
        if (projects.length <= 3) return 0
        return prev === 0 ? 3 : 0
      }
    })
  }

  const goToSlide = (slideIndex: number) => {
    if (isMobile) {
      // Mobile: navegação direta para cada projeto
      setActiveProjectIndex(slideIndex)
    } else {
      // Desktop: mapeia os 2 indicadores para as posições fixas
      if (slideIndex === 0) {
        setActiveProjectIndex(0) // Primeira bolinha - projetos 1,2,3
      } else if (slideIndex === 1) {
        setActiveProjectIndex(3) // Segunda bolinha - projetos 4,5,6
      }
    }
  }

  // Autoplay functionality
  const startAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current)
    // Autoplay funciona em mobile e desktop
    if (projects.length > 1) {
      autoplayRef.current = setInterval(() => {
        if (!isAutoplayPaused) {
          nextSlide()
        }
      }, 5000)
    }
  }

  const pauseAutoplay = () => {
    setIsAutoplayPaused(true)
  }

  const resumeAutoplay = () => {
    setIsAutoplayPaused(false)
  }

  const handleSliderInteraction = () => {
    pauseAutoplay()
    setTimeout(() => {
      resumeAutoplay()
    }, 10000)
  }

  // Touch/Swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndRef.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartRef.current || !touchEndRef.current) return
    
    const distance = touchStartRef.current - touchEndRef.current
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextSlide()
      handleSliderInteraction()
    } else if (isRightSwipe) {
      prevSlide()
      handleSliderInteraction()
    }
  }

  // Start autoplay when component mounts or when isMobile changes
  useEffect(() => {
    startAutoplay()
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
    }
  }, [isAutoplayPaused, isMobile, projectsPerView])

  return (
    <div 
      className="relative w-full" 
      onMouseEnter={pauseAutoplay} 
      onMouseLeave={resumeAutoplay}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      ref={sliderRef}
    >
      {/* Slider Container */}
      <div className="overflow-hidden w-full">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${activeProjectIndex * (100 / 6)}%)`,
            width: `${Math.max(projects.length, 6) * (100 / projectsPerView)}%`
          }}
        >
          {/* All Projects */}
          {Array.from({ length: Math.max(projects.length, 6) }, (_, index) => {
            const project = projects[index]
            if (!project) {
              return (
                <div
                  key={`empty-${index}`}
                  className="group relative overflow-hidden block"
                  style={{ width: `${100 / projectsPerView}%` }}
                >
                  <div className="aspect-[4/3] md:aspect-[1440/990] bg-gray-900 overflow-hidden mx-1 md:mx-2 lg:mx-3" />
                </div>
              )
            }
            
            return (
              <a
                key={`${project.id}-${index}`}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden block"
                style={{ width: `${100 / projectsPerView}%` }}
                onClick={handleSliderInteraction}
              >
                <div className="aspect-[4/3] md:aspect-[1440/990] bg-gray-900 overflow-hidden mx-1 md:mx-2 lg:mx-3">
                  <OptimizedVideo
                    src={project.video}
                    alt={project.alt}
                    className="w-full h-full transition-transform duration-500 group-hover:scale-105"
                    poster={`/project-thumbnails/${project.id}.webp`}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 md:p-6">
                  <h3 className="text-sm md:text-xl font-bold mb-1 md:mb-2">{project.title}</h3>
                  <p className="text-gray-300 text-xs md:text-sm mb-2 md:mb-4 line-clamp-2 md:line-clamp-none">{project.description}</p>
                  <div className="flex items-center">
                    <div className="w-4 md:w-8 h-[1px] bg-[#4da6ff] mr-2 md:mr-3" />
                    <span className="text-xs text-gray-300">{project.year}</span>
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </div>

      {/* Slider Navigation */}
      {hasNavigation && (
        <div className="flex justify-center items-center mt-8 md:mt-12 space-x-4 md:space-x-4">
          <button
            onClick={() => {
              prevSlide()
              handleSliderInteraction()
            }}
            className="w-8 h-8 md:w-12 md:h-12 border border-gray-700 flex items-center justify-center hover:border-[#4da6ff] hover:text-[#4da6ff] transition-colors"
            aria-label="Projeto anterior"
          >
            <ChevronLeft size={16} className="md:w-5 md:h-5" />
          </button>
          
          {/* Slide Indicators */}
          <div className="flex space-x-3 md:space-x-3">
            {Array.from({ length: isMobile ? projects.length : 2 }, (_, index) => (
              <button
                key={index}
                onClick={() => {
                  goToSlide(index)
                  handleSliderInteraction()
                }}
                className={`w-8 h-8 md:w-4 md:h-4 rounded-full transition-all duration-300 flex items-center justify-center ${
                  (isMobile 
                    ? activeProjectIndex === index 
                    : (index === 0 && activeProjectIndex === 0) || (index === 1 && activeProjectIndex === 3))
                    ? 'bg-[#4da6ff] shadow-lg shadow-[#4da6ff]/50' 
                    : 'bg-gray-400 hover:bg-gray-300'
                }`}
                aria-label={`Ir para projeto ${index + 1}`}
                aria-current={(isMobile 
                  ? activeProjectIndex === index 
                  : (index === 0 && activeProjectIndex === 0) || (index === 1 && activeProjectIndex === 3)) ? "true" : "false"}
              >
                {/* Indicador visual para mobile */}
                {isMobile && (
                  <div className={`w-2 h-2 md:w-1 md:h-1 rounded-full ${
                    (isMobile 
                      ? activeProjectIndex === index 
                      : (index === 0 && activeProjectIndex === 0) || (index === 1 && activeProjectIndex === 3))
                        ? 'bg-white' 
                        : 'bg-gray-600'
                  }`} />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              nextSlide()
              handleSliderInteraction()
            }}
            className="w-8 h-8 md:w-12 md:h-12 border border-gray-700 flex items-center justify-center hover:border-[#4da6ff] hover:text-[#4da6ff] transition-colors"
            aria-label="Próximo projeto"
          >
            <ChevronRight size={16} className="md:w-5 md:h-5" />
          </button>
        </div>
      )}

      {/* Autoplay Status Indicator */}
      <div className="absolute top-4 right-4">
        <div className={`w-3 h-3 rounded-full ${isAutoplayPaused ? 'bg-red-500' : 'bg-green-500'} animate-pulse`} />
      </div>
    </div>
  )
} 