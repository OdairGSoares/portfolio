import { useEffect, useCallback, useRef } from "react"
import { useState } from "react"

interface UseOptimizedScrollOptions {
  onScroll?: (scrollY: number) => void
  throttleMs?: number
  passive?: boolean
}

export function useOptimizedScroll({
  onScroll,
  throttleMs = 16, // ~60fps
  passive = true
}: UseOptimizedScrollOptions = {}) {
  const lastScrollY = useRef(0)
  const ticking = useRef(false)
  const scrollHandler = useRef<((event: Event) => void) | null>(null)

  const updateScrollPosition = useCallback(() => {
    if (onScroll) {
      onScroll(window.scrollY)
    }
    lastScrollY.current = window.scrollY
    ticking.current = false
  }, [onScroll])

  const handleScroll = useCallback((event: Event) => {
    if (!ticking.current) {
      requestAnimationFrame(updateScrollPosition)
      ticking.current = true
    }
  }, [updateScrollPosition])

  useEffect(() => {
    scrollHandler.current = handleScroll

    window.addEventListener('scroll', handleScroll, { 
      passive,
      capture: false 
    })

    return () => {
      if (scrollHandler.current) {
        window.removeEventListener('scroll', scrollHandler.current, { 
          passive,
          capture: false 
        })
      }
    }
  }, [handleScroll, passive])

  return {
    scrollY: lastScrollY.current
  }
}

// Hook específico para detecção de seção ativa
export function useActiveSection(sections: string[]) {
  const [activeSection, setActiveSection] = useState(0)

  const handleScroll = useCallback((scrollY: number) => {
    const sectionElements = sections.map((section) => 
      document.getElementById(section.toLowerCase())
    )
    const currentPosition = scrollY + window.innerHeight / 3

    sectionElements.forEach((element, index) => {
      if (element) {
        const { offsetTop, offsetHeight } = element
        if (currentPosition >= offsetTop && currentPosition < offsetTop + offsetHeight) {
          setActiveSection(index)
        }
      }
    })
  }, [sections])

  useOptimizedScroll({ onScroll: handleScroll })

  return activeSection
} 