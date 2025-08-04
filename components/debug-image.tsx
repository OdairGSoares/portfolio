"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface DebugImageProps {
  src: string
  alt: string
  className?: string
}

export default function DebugImage({ src, alt, className = "" }: DebugImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [imageStatus, setImageStatus] = useState("Carregando...")

  useEffect(() => {
    console.log("DebugImage: Tentando carregar", src)
  }, [src])

  const handleLoad = () => {
    console.log("DebugImage: Imagem carregada com sucesso", src)
    setIsLoading(false)
    setImageStatus("Carregada")
  }

  const handleError = (error: any) => {
    console.error("DebugImage: Erro ao carregar imagem", src, error)
    setHasError(true)
    setImageStatus("Erro ao carregar")
  }

  if (hasError) {
    return (
      <div className={`bg-red-900 flex items-center justify-center ${className}`}>
        <div className="text-center">
          <span className="text-red-400 text-sm block">Erro: {imageStatus}</span>
          <span className="text-red-300 text-xs block mt-1">{src}</span>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        priority={true}
        onLoad={handleLoad}
        onError={handleError}
      />
      
      {isLoading && (
        <div className="absolute inset-0 bg-blue-900 flex items-center justify-center">
          <div className="text-center">
            <span className="text-blue-400 text-sm block">{imageStatus}</span>
            <span className="text-blue-300 text-xs block mt-1">{src}</span>
          </div>
        </div>
      )}
    </div>
  )
} 