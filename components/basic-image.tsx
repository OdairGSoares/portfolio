"use client"

import { useState } from "react"

interface BasicImageProps {
  src: string
  alt: string
  className?: string
}

export default function BasicImage({ src, alt, className = "" }: BasicImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    console.log("BasicImage: Imagem carregada", src)
    setIsLoading(false)
  }

  const handleError = () => {
    console.error("BasicImage: Erro ao carregar", src)
    setHasError(true)
  }

  if (hasError) {
    return (
      <div className={`bg-red-900 flex items-center justify-center ${className}`}>
        <span className="text-red-400 text-sm">Erro ao carregar imagem</span>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onLoad={handleLoad}
        onError={handleError}
      />
      
      {isLoading && (
        <div className="absolute inset-0 bg-green-900 flex items-center justify-center">
          <span className="text-green-400 text-sm">Carregando...</span>
        </div>
      )}
    </div>
  )
} 