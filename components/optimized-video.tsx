"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"

interface OptimizedVideoProps {
  src: string
  alt: string
  className?: string
  poster?: string
  onError?: () => void
}

export default function OptimizedVideo({ 
  src, 
  alt, 
  className = "", 
  poster,
  onError 
}: OptimizedVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Intersection Observer para lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: "50px",
        threshold: 0.1
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleVideoLoad = () => {
    setIsLoaded(true)
  }

  const handleVideoError = () => {
    setHasError(true)
    onError?.()
  }

  // Fallback para imagem se o vídeo falhar
  if (hasError) {
    return (
      <div className={`relative ${className}`}>
        <Image
          src={poster || "/project-thumbnails/video-placeholder.svg"}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
      </div>
    )
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {isInView && (
        <video
          ref={videoRef}
          src={src}
          autoPlay
          loop
          muted
          playsInline
          poster={poster}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
          preload="metadata"
        />
      )}
      
      {/* Placeholder enquanto carrega */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-900 animate-pulse" />
      )}
    </div>
  )
} 