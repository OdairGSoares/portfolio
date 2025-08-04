"use client"

import { useState } from "react"

interface ContactFormProps {
  onSubmit?: (data: { name: string; email: string; message: string }) => void
}

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Mensagem é obrigatória"
    } else if (formData.message.length < 10) {
      newErrors.message = "Mensagem deve ter pelo menos 10 caracteres"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    
    try {
      // Simular envio do formulário
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (onSubmit) {
        onSubmit(formData)
      }
      
      // Limpar formulário
      setFormData({ name: "", email: "", message: "" })
      setErrors({})
      
      // Mostrar mensagem de sucesso
      alert("Mensagem enviada com sucesso!")
    } catch (error) {
      alert("Erro ao enviar mensagem. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Limpar erro do campo quando o usuário começa a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const fields = [
    { id: "name", label: "Nome", type: "text", placeholder: "Seu nome" },
    { id: "email", label: "Email", type: "email", placeholder: "Seu email" }
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {fields.map((field) => (
        <div key={field.id}>
          <label 
            htmlFor={field.id} 
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            {field.label}
          </label>
          <input
            type={field.type}
            id={field.id}
            name={field.id}
            value={formData[field.id as keyof typeof formData]}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className={`w-full bg-[#1a1a1a] border text-white px-4 py-3 focus:outline-none focus:border-[#0066cc] transition-colors ${
              errors[field.id] ? 'border-red-500' : 'border-[#333333]'
            }`}
            placeholder={field.placeholder}
            aria-describedby={errors[field.id] ? `${field.id}-error` : undefined}
            aria-invalid={!!errors[field.id]}
            required
          />
          {errors[field.id] && (
            <p 
              id={`${field.id}-error`} 
              className="mt-1 text-sm text-red-400"
              role="alert"
            >
              {errors[field.id]}
            </p>
          )}
        </div>
      ))}

      <div>
        <label 
          htmlFor="message" 
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Mensagem
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={(e) => handleInputChange("message", e.target.value)}
          className={`w-full bg-[#1a1a1a] border text-white px-4 py-3 focus:outline-none focus:border-[#0066cc] transition-colors ${
            errors.message ? 'border-red-500' : 'border-[#333333]'
          }`}
          placeholder="Sua mensagem"
          aria-describedby={errors.message ? "message-error" : undefined}
          aria-invalid={!!errors.message}
          required
        />
        {errors.message && (
          <p 
            id="message-error" 
            className="mt-1 text-sm text-red-400"
            role="alert"
          >
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`px-6 py-3 font-medium transition-colors ${
          isSubmitting 
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
            : 'bg-[#0066cc] text-white hover:bg-[#0055aa]'
        }`}
        aria-describedby={isSubmitting ? "submitting-status" : undefined}
      >
        {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
      </button>
      
      {isSubmitting && (
        <p id="submitting-status" className="text-sm text-gray-400">
          Enviando sua mensagem...
        </p>
      )}
    </form>
  )
}

