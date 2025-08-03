export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#111111] text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-400 mb-8">Página não encontrada</p>
        <a 
          href="/" 
          className="px-6 py-3 bg-[#0066cc] text-white font-medium hover:bg-[#0055aa] transition-colors"
        >
          Voltar ao início
        </a>
      </div>
    </div>
  )
} 