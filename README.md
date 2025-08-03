# Portfolio - Odair Gomes Soares

Portfólio pessoal moderno e responsivo desenvolvido com Next.js, React e Three.js. Apresenta projetos, experiência profissional e informações de contato de forma elegante e interativa.

## 🚀 Características

- **Design Moderno**: Interface limpa e minimalista com tema escuro
- **Responsivo**: Otimizado para desktop, tablet e mobile
- **3D Interativo**: Elementos 3D usando Three.js e React Three Fiber
- **Navegação Suave**: Scroll suave entre seções com indicadores visuais
- **Slider de Projetos**: Apresentação dinâmica dos projetos com autoplay
- **Animações**: Transições fluidas usando Framer Motion
- **Performance**: Otimizado para carregamento rápido e SEO

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Next.js 14** - Framework React com App Router
- **React 18** - Biblioteca para interface de usuário
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS** - Framework CSS utilitário
- **Framer Motion** - Biblioteca de animações
- **Lucide React** - Ícones modernos

### 3D e Gráficos
- **Three.js** - Biblioteca 3D para WebGL
- **React Three Fiber** - Renderizador React para Three.js
- **@react-three/drei** - Utilitários para React Three Fiber

### Navegação e UX
- **React Scroll** - Navegação suave entre seções
- **Custom Hooks** - Lógica reutilizável para responsividade

## 📁 Estrutura do Projeto

```
Site Portifólio/
├── app/                    # App Router do Next.js
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página inicial
│   └── not-found.tsx      # Página 404
├── components/            # Componentes React
│   ├── ui/               # Componentes de UI reutilizáveis
│   ├── project-slider.tsx # Slider de projetos
│   ├── contact-form.tsx   # Formulário de contato
│   └── theme-provider.tsx # Provedor de tema
├── hooks/                # Custom hooks
├── lib/                  # Utilitários e configurações
├── public/               # Arquivos estáticos
│   ├── videos/           # Vídeos dos projetos
│   └── images/           # Imagens
└── styles/               # Arquivos de estilo adicionais
```

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js 18+ 
- npm, yarn ou pnpm

### Passos para Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/portfolio.git
cd portfolio
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Execute o projeto em desenvolvimento**
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

4. **Acesse o projeto**
Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

### Scripts Disponíveis

```bash
npm run dev          # Executa em modo desenvolvimento
npm run build        # Gera build de produção
npm run start        # Executa build de produção
npm run lint         # Executa linter
```

## 🎨 Seções do Portfólio

### 1. **HOME**
- Título principal com animação
- Elemento 3D interativo (Torus Knot)
- Indicador de scroll
- Navegação por setas

### 2. **SOBRE**
- Informações pessoais e profissionais
- Experiência de trabalho
- Formação acadêmica
- Imagem de perfil

### 3. **PROJETOS**
- Slider responsivo com autoplay
- Vídeos dos projetos
- Informações detalhadas
- Links para projetos ao vivo

### 4. **CONTATO**
- Formulário de contato
- Informações de contato
- Links para redes sociais
- Footer com copyright

## 📱 Responsividade

O projeto é totalmente responsivo com breakpoints otimizados:

- **Mobile**: < 768px
- **Tablet**: 768px - 1440px  
- **Desktop**: > 1440px

### Características Responsivas:
- Navegação lateral em desktop, menu hambúrguer em mobile
- Slider adaptativo (1 projeto em mobile, 3 em desktop)
- Tipografia escalável
- Layout em grid flexível

## 🎯 Funcionalidades Principais

### Navegação
- Scroll suave entre seções
- Indicadores visuais de seção ativa
- Navegação por teclado e mouse
- Menu mobile com overlay

### Slider de Projetos
- Autoplay com pausa no hover
- Navegação por setas e indicadores
- Suporte a touch/swipe
- Fallback para imagens se vídeo falhar

### Elementos 3D
- Modelo Torus Knot animado
- Controles de câmera automáticos
- Iluminação dinâmica
- Performance otimizada

## 🔧 Configuração

### Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Odair Gomes Soares**
- Email: odagomess708@gmail.com
- GitHub: [@OdairGSoares](https://github.com/OdairGSoares)
- Behance: [@odairgomessoares](https://www.behance.net/odairgomessoares)

⭐ Se gostou desse projeto, considere dar uma estrela no repositório!
