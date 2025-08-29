import { useState, useEffect } from 'react';

// Configuração padrão das seções
const defaultSections = {
  hero: {
    id: 'hero',
    name: 'Hero Section',
    enabled: true,
    config: {
      title: 'Desenvolvimento Web & Mobile',
      subtitle: 'Transformamos Ideias em Realidade',
      description: 'Especialistas em desenvolvimento web, mobile e sistemas personalizados. Transformamos suas ideias em soluções digitais inovadoras.',
      primaryButton: {
        text: 'Agendar Conversa',
        color: '#00bcd4',
        hoverColor: '#0097a7'
      },
      secondaryButton: {
        text: 'Ver Portfolio',
        color: '#6366f1',
        hoverColor: '#4f46e5'
      },
      backgroundGradient: {
        from: '#0f172a',
        via: '#581c87',
        to: '#0f172a'
      },
      animation: {
        enabled: true,
        type: 'fadeInUp',
        duration: 0.8,
        delay: 0.2
      }
    }
  },
  about: {
    id: 'about',
    name: 'About Section',
    enabled: true,
    config: {
      title: 'Sobre Nós',
      subtitle: 'Quem Somos',
      description: 'Somos uma equipe apaixonada por tecnologia, dedicada a criar soluções digitais inovadoras que transformam negócios e conectam pessoas.',
      features: [
        { icon: '🚀', title: 'Inovação', description: 'Sempre na vanguarda da tecnologia' },
        { icon: '💡', title: 'Criatividade', description: 'Soluções únicas para cada desafio' },
        { icon: '🎯', title: 'Foco', description: 'Resultados que superam expectativas' }
      ],
      backgroundColor: '#ffffff',
      textColor: '#1f2937'
    }
  },
  services: {
    id: 'services',
    name: 'Services Section',
    enabled: true,
    config: {
      title: 'Nossos Serviços',
      subtitle: 'O que Oferecemos',
      services: [
        {
          icon: '💻',
          title: 'Desenvolvimento Web',
          description: 'Sites e aplicações web modernas e responsivas',
          color: '#3b82f6'
        },
        {
          icon: '📱',
          title: 'Desenvolvimento Mobile',
          description: 'Apps nativos e híbridos para iOS e Android',
          color: '#10b981'
        },
        {
          icon: '⚙️',
          title: 'Sistemas Personalizados',
          description: 'Soluções sob medida para seu negócio',
          color: '#f59e0b'
        }
      ],
      backgroundColor: '#f8fafc',
      textColor: '#1f2937'
    }
  },
  projects: {
    id: 'projects',
    name: 'Projects Section',
    enabled: true,
    config: {
      title: 'Nossos Projetos',
      subtitle: 'Portfolio',
      showAll: false,
      maxItems: 6,
      backgroundColor: '#ffffff',
      textColor: '#1f2937'
    }
  },
  testimonials: {
    id: 'testimonials',
    name: 'Testimonials Section',
    enabled: true,
    config: {
      title: 'Depoimentos',
      subtitle: 'O que nossos clientes dizem',
      testimonials: [
        {
          name: 'João Silva',
          company: 'Tech Solutions',
          text: 'Excelente trabalho! Superaram todas as expectativas.',
          rating: 5,
          avatar: ''
        },
        {
          name: 'Maria Santos',
          company: 'Digital Corp',
          text: 'Profissionais competentes e prazo cumprido.',
          rating: 5,
          avatar: ''
        }
      ],
      backgroundColor: '#f8fafc',
      textColor: '#1f2937'
    }
  },
  contact: {
    id: 'contact',
    name: 'Contact Section',
    enabled: true,
    config: {
      title: 'Entre em Contato',
      subtitle: 'Vamos conversar sobre seu projeto',
      description: 'Estamos prontos para transformar suas ideias em realidade. Entre em contato conosco!',
      contactInfo: {
        email: 'contato@devstudio.com',
        phone: '+55 (11) 99999-9999',
        address: 'São Paulo, SP - Brasil'
      },
      backgroundColor: '#1f2937',
      textColor: '#ffffff'
    }
  }
};

export const useLandingPageConfig = () => {
  const [sections, setSections] = useState(defaultSections);

  // Carregar configurações do localStorage
  useEffect(() => {
    const savedSections = localStorage.getItem('landingPageSections');
    if (savedSections) {
      try {
        const parsed = JSON.parse(savedSections);
        setSections(parsed);
      } catch (error) {
        console.error('Erro ao carregar configurações da landing page:', error);
      }
    }
  }, []);

  // Escutar mudanças no localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const savedSections = localStorage.getItem('landingPageSections');
      if (savedSections) {
        try {
          const parsed = JSON.parse(savedSections);
          setSections(parsed);
        } catch (error) {
          console.error('Erro ao carregar configurações da landing page:', error);
        }
      }
    };

    // Escutar mudanças no localStorage
    window.addEventListener('storage', handleStorageChange);

    // Polling para mudanças na mesma aba
    const interval = setInterval(() => {
      const savedSections = localStorage.getItem('landingPageSections');
      if (savedSections) {
        try {
          const parsed = JSON.parse(savedSections);
          if (JSON.stringify(parsed) !== JSON.stringify(sections)) {
            setSections(parsed);
          }
        } catch (error) {
          console.error('Erro ao carregar configurações da landing page:', error);
        }
      }
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [sections]);

  // Função para obter configuração de uma seção específica
  const getSectionConfig = (sectionId) => {
    return sections[sectionId] || defaultSections[sectionId];
  };

  // Função para verificar se uma seção está habilitada
  const isSectionEnabled = (sectionId) => {
    const section = sections[sectionId] || defaultSections[sectionId];
    return section.enabled;
  };

  return {
    sections,
    getSectionConfig,
    isSectionEnabled,
    defaultSections
  };
};

export default useLandingPageConfig;