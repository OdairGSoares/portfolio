"use client"

import { Canvas } from "@react-three/fiber"
import { PerspectiveCamera, Environment, Float, OrbitControls } from "@react-three/drei"
import { Suspense } from "react"

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
      <Suspense fallback={null}>
        <Environment preset="city" />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </>
  )
}

export default function ThreeScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </div>
  )
} 