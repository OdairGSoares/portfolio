"use client"

import { motion } from "framer-motion"

interface SkillBadgeProps {
  name: string
  level: number
  index: number
}

export default function SkillBadge({ name, level, index }: SkillBadgeProps) {
  return (
    <motion.div
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="text-lg font-medium mb-2">{name}</div>
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <motion.div
          className="h-2.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 + index * 0.05 }}
        />
      </div>
    </motion.div>
  )
}

