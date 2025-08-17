# Landing Page - Estrutura Modular

## 📁 Estrutura dos Componentes

A landing page foi completamente refatorada seguindo o padrão modular do projeto de referência:

```
src/components/sections/
├── index.js                 # Exportações centralizadas
├── hero-section.jsx         # Seção principal com slider
├── about-section.jsx        # Seção sobre a empresa + estatísticas
├── services-section.jsx     # Serviços e processo de trabalho
├── projects-section.jsx     # Portfolio de projetos
├── testimonials-section.jsx # Depoimentos de clientes
└── contact-section.jsx      # Formulário de contato
```

## 🚀 Melhorias Implementadas

### ✅ Modularização
- **Antes**: Um único arquivo de 833 linhas
- **Agora**: 6 componentes separados + arquivo principal limpo (130 linhas)

### ✅ Organização
- Cada seção é independente e reutilizável
- Importações centralizadas via `index.js`
- Separação clara de responsabilidades

### ✅ Manutenibilidade
- Código mais fácil de manter e debugar
- Componentes isolados facilitam testes
- Estrutura escalável para futuras funcionalidades

### ✅ Performance
- Possibilidade de lazy loading por seção
- Otimização individual de cada componente
- Bundle splitting mais eficiente

## 🎨 Seções da Landing Page

### 1. **Hero Section**
- Slider automático com 3 slides
- CTAs para agendamento e portfolio
- Animações suaves de transição

### 2. **About Section**
- Estatísticas da empresa
- Cards animados com hover effects
- Layout responsivo em grid

### 3. **Services Section**
- Grid de serviços com ícones
- Processo de trabalho em 4 etapas
- Features detalhadas por serviço

### 4. **Projects Section**
- Portfolio dinâmico carregado do localStorage
- Cards com hover effects
- Categorização de projetos

### 5. **Testimonials Section**
- Carousel automático de depoimentos
- Avaliações com estrelas
- Indicadores de navegação

### 6. **Contact Section**
- Formulário de contato funcional
- Informações de contato
- Validação de campos

## 📱 Responsividade

Todos os componentes são totalmente responsivos:
- **Mobile First**: Design otimizado para mobile
- **Breakpoints**: sm, md, lg, xl
- **Grid System**: Layout flexível com Tailwind CSS

## 🎯 Como Usar

```jsx
import {
  HeroSection,
  AboutSection,
  ServicesSection,
  ProjectsSection,
  TestimonialsSection,
  ContactSection
} from '@/components/sections';

// Use individualmente conforme necessário
<HeroSection onScheduleClick={handleSchedule} />
<AboutSection />
// ... outras seções
```

## 🔧 Tecnologias

- **React 18**: Componentes funcionais com hooks
- **Framer Motion**: Animações fluidas
- **Tailwind CSS**: Estilização utilitária
- **Lucide React**: Ícones modernos
- **React Helmet**: SEO otimizado

## 🚀 Executar o Projeto

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`