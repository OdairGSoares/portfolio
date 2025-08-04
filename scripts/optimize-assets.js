#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

console.log('🔧 Otimizando assets...')

// Função para verificar se o comando existe
function commandExists(command) {
  try {
    execSync(`which ${command}`, { stdio: 'ignore' })
    return true
  } catch {
    return false
  }
}

// Função para otimizar imagens
function optimizeImages() {
  const publicDir = path.join(process.cwd(), 'public')
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp']
  
  function processDirectory(dir) {
    const files = fs.readdirSync(dir)
    
    files.forEach(file => {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)
      
      if (stat.isDirectory()) {
        processDirectory(filePath)
      } else if (imageExtensions.some(ext => file.toLowerCase().endsWith(ext))) {
        const ext = path.extname(file).toLowerCase()
        
        // Converter para WebP se possível
        if (ext !== '.webp' && commandExists('cwebp')) {
          const webpPath = filePath.replace(ext, '.webp')
          try {
            execSync(`cwebp -q 80 "${filePath}" -o "${webpPath}"`, { stdio: 'ignore' })
            console.log(`✅ Convertido: ${file} -> ${path.basename(webpPath)}`)
          } catch (error) {
            console.log(`⚠️  Erro ao converter ${file}: ${error.message}`)
          }
        }
        
        // Otimizar JPEG/PNG
        if (commandExists('jpegoptim') && (ext === '.jpg' || ext === '.jpeg')) {
          try {
            execSync(`jpegoptim --strip-all "${filePath}"`, { stdio: 'ignore' })
            console.log(`✅ Otimizado: ${file}`)
          } catch (error) {
            console.log(`⚠️  Erro ao otimizar ${file}: ${error.message}`)
          }
        }
        
        if (commandExists('optipng') && ext === '.png') {
          try {
            execSync(`optipng -o5 "${filePath}"`, { stdio: 'ignore' })
            console.log(`✅ Otimizado: ${file}`)
          } catch (error) {
            console.log(`⚠️  Erro ao otimizar ${file}: ${error.message}`)
          }
        }
      }
    })
  }
  
  if (fs.existsSync(publicDir)) {
    processDirectory(publicDir)
  }
}

// Função para otimizar vídeos
function optimizeVideos() {
  const videosDir = path.join(process.cwd(), 'public', 'videos')
  
  if (!fs.existsSync(videosDir)) {
    console.log('📁 Diretório de vídeos não encontrado')
    return
  }
  
  if (!commandExists('ffmpeg')) {
    console.log('⚠️  FFmpeg não encontrado. Instale para otimizar vídeos.')
    return
  }
  
  const videoExtensions = ['.mp4', '.webm', '.mov']
  const files = fs.readdirSync(videosDir)
  
  files.forEach(file => {
    const ext = path.extname(file).toLowerCase()
    if (videoExtensions.includes(ext)) {
      const filePath = path.join(videosDir, file)
      const outputPath = filePath.replace(ext, '_optimized.mp4')
      
      try {
        // Criar versão otimizada do vídeo
        execSync(`ffmpeg -i "${filePath}" -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k "${outputPath}"`, { stdio: 'ignore' })
        console.log(`✅ Vídeo otimizado: ${file}`)
        
        // Criar thumbnail
        const thumbnailPath = filePath.replace(ext, '_thumb.jpg')
        execSync(`ffmpeg -i "${filePath}" -ss 00:00:01 -vframes 1 "${thumbnailPath}"`, { stdio: 'ignore' })
        console.log(`✅ Thumbnail criado: ${path.basename(thumbnailPath)}`)
      } catch (error) {
        console.log(`⚠️  Erro ao otimizar ${file}: ${error.message}`)
      }
    }
  })
}

// Executar otimizações
try {
  optimizeImages()
  optimizeVideos()
  console.log('✅ Otimização concluída!')
} catch (error) {
  console.error('❌ Erro durante a otimização:', error.message)
  process.exit(1)
} 