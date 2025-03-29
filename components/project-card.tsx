"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  image: string
  index: number
}

export default function ProjectCard({ title, description, tags, image, index }: ProjectCardProps) {
  return (
    <motion.div
      className="bg-gray-900/50 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-gray-800 hover:border-purple-500/50 transition-all duration-300"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className="relative h-64">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span key={i} className="text-xs px-2 py-1 bg-purple-500/30 backdrop-blur-sm rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-300">{description}</p>
        <div className="mt-6 flex justify-end">
          <button className="text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors">
            Ver detalhes →
          </button>
        </div>
      </div>
    </motion.div>
  )
}

