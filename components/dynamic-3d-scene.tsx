"use client"

import { Suspense, lazy, useState, useEffect } from "react"

// Carregamento dinâmico do Three.js
const ThreeScene = lazy(() => import("./simple-3d-scene"))

export default function Dynamic3DScene() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/80 to-transparent z-10" />
    )
  }

  return (
    <Suspense fallback={
      <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/80 to-transparent z-10" />
    }>
      <ThreeScene />
    </Suspense>
  )
} 