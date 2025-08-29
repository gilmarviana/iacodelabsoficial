import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { 
  Plus, Trash2, Edit3, Save, Eye, EyeOff, Palette, Type, 
  Image as ImageIcon, Settings, Layout, Sparkles, ChevronDown,
  ChevronUp, Copy, RotateCcw
} from 'lucide-react';

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

const EditLandingPageContent = () => {
  const [sections, setSections] = useState(defaultSections);
  const [activeSection, setActiveSection] = useState('hero');
  const [expandedSections, setExpandedSections] = useState({});
  const [previewMode, setPreviewMode] = useState(false);
  const { toast } = useToast();

  // Carregar configurações salvas
  useEffect(() => {
    const savedSections = localStorage.getItem('landingPageSections');
    if (savedSections) {
      setSections(JSON.parse(savedSections));
    }
  }, []);

  // Salvar configurações
  const handleSave = () => {
    localStorage.setItem('landingPageSections', JSON.stringify(sections));
    toast({
      title: "Configurações salvas",
      description: "As alterações da landing page foram salvas com sucesso.",
    });
  };

  // Resetar para configurações padrão
  const handleReset = () => {
    setSections(defaultSections);
    localStorage.removeItem('landingPageSections');
    toast({
      title: "Configurações resetadas",
      description: "A landing page foi restaurada para as configurações padrão.",
    });
  };

  // Atualizar seção
  const updateSection = (sectionId, updates) => {
    setSections(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        ...updates
      }
    }));
  };

  // Atualizar configuração da seção
  const updateSectionConfig = (sectionId, configUpdates) => {
    setSections(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        config: {
          ...prev[sectionId].config,
          ...configUpdates
        }
      }
    }));
  };

  // Toggle seção expandida
  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // Adicionar novo item a uma lista (ex: serviços, depoimentos)
  const addListItem = (sectionId, listKey, newItem) => {
    const section = sections[sectionId];
    const currentList = section.config[listKey] || [];
    
    updateSectionConfig(sectionId, {
      [listKey]: [...currentList, newItem]
    });
  };

  // Remover item de uma lista
  const removeListItem = (sectionId, listKey, index) => {
    const section = sections[sectionId];
    const currentList = section.config[listKey] || [];
    
    updateSectionConfig(sectionId, {
      [listKey]: currentList.filter((_, i) => i !== index)
    });
  };

  // Atualizar item de uma lista
  const updateListItem = (sectionId, listKey, index, updates) => {
    const section = sections[sectionId];
    const currentList = section.config[listKey] || [];
    
    updateSectionConfig(sectionId, {
      [listKey]: currentList.map((item, i) => 
        i === index ? { ...item, ...updates } : item
      )
    });
  };

  // Renderizar campos de configuração baseado no tipo de seção
  const renderSectionConfig = (section) => {
    const { config } = section;

    switch (section.id) {
      case 'hero':
        return (
          <div className="space-y-6">
            {/* Textos principais */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Type className="w-4 h-4" />
                  Textos Principais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="hero-title">Título Principal</Label>
                  <Input
                    id="hero-title"
                    value={config.title}
                    onChange={(e) => updateSectionConfig('hero', { title: e.target.value })}
                    placeholder="Digite o título principal"
                  />
                </div>
                <div>
                  <Label htmlFor="hero-subtitle">Subtítulo</Label>
                  <Input
                    id="hero-subtitle"
                    value={config.subtitle}
                    onChange={(e) => updateSectionConfig('hero', { subtitle: e.target.value })}
                    placeholder="Digite o subtítulo"
                  />
                </div>
                <div>
                  <Label htmlFor="hero-description">Descrição</Label>
                  <Textarea
                    id="hero-description"
                    value={config.description}
                    onChange={(e) => updateSectionConfig('hero', { description: e.target.value })}
                    placeholder="Digite a descrição"
                    rows={3}
                  />
                </div>

      case 'about':
        return (
          <div className="space-y-6">
            {/* Textos da seção */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Type className="w-4 h-4" />
                  Textos da Seção
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="about-title">Título</Label>
                  <Input
                    id="about-title"
                    value={config.title}
                    onChange={(e) => updateSectionConfig('about', { title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="about-subtitle">Subtítulo</Label>
                  <Input
                    id="about-subtitle"
                    value={config.subtitle}
                    onChange={(e) => updateSectionConfig('about', { subtitle: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="about-description">Descrição</Label>
                  <Textarea
                    id="about-description"
                    value={config.description}
                    onChange={(e) => updateSectionConfig('about', { description: e.target.value })}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Features
                  </div>
                  <Button
                    size="sm"
                    onClick={() => addListItem('about', 'features', {
                      icon: '⭐',
                      title: 'Nova Feature',
                      description: 'Descrição da feature'
                    })}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Adicionar
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {config.features?.map((feature, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <Badge variant="outline">Feature {index + 1}</Badge>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => removeListItem('about', 'features', index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <Label>Ícone (Emoji)</Label>
                          <Input
                            value={feature.icon}
                            onChange={(e) => updateListItem('about', 'features', index, { icon: e.target.value })}
                            placeholder="⭐"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label>Título</Label>
                          <Input
                            value={feature.title}
                            onChange={(e) => updateListItem('about', 'features', index, { title: e.target.value })}
                          />
                        </div>
                        <div className="md:col-span-3">
                          <Label>Descrição</Label>
                          <Textarea
                            value={feature.description}
                            onChange={(e) => updateListItem('about', 'features', index, { description: e.target.value })}
                            rows={2}
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cores da seção */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Cores da Seção
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Cor de Fundo</Label>
                    <Input
                      type="color"
                      value={config.backgroundColor}
                      onChange={(e) => updateSectionConfig('about', { backgroundColor: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Cor do Texto</Label>
                    <Input
                      type="color"
                      value={config.textColor}
                      onChange={(e) => updateSectionConfig('about', { textColor: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'testimonials':
        return (
          <div className="space-y-6">
            {/* Textos da seção */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Type className="w-4 h-4" />
                  Textos da Seção
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="testimonials-title">Título</Label>
                  <Input
                    id="testimonials-title"
                    value={config.title}
                    onChange={(e) => updateSectionConfig('testimonials', { title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="testimonials-subtitle">Subtítulo</Label>
                  <Input
                    id="testimonials-subtitle"
                    value={config.subtitle}
                    onChange={(e) => updateSectionConfig('testimonials', { subtitle: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Lista de Depoimentos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 justify-between">
                  <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Depoimentos
                  </div>
                  <Button
                    size="sm"
                    onClick={() => addListItem('testimonials', 'testimonials', {
                      name: 'Nome do Cliente',
                      company: 'Empresa',
                      text: 'Depoimento do cliente...',
                      rating: 5,
                      avatar: ''
                    })}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Adicionar
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {config.testimonials?.map((testimonial, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <Badge variant="outline">Depoimento {index + 1}</Badge>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => removeListItem('testimonials', 'testimonials', index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <Label>Nome</Label>
                          <Input
                            value={testimonial.name}
                            onChange={(e) => updateListItem('testimonials', 'testimonials', index, { name: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>Empresa</Label>
                          <Input
                            value={testimonial.company}
                            onChange={(e) => updateListItem('testimonials', 'testimonials', index, { company: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>Avaliação (1-5)</Label>
                          <Input
                            type="number"
                            min="1"
                            max="5"
                            value={testimonial.rating}
                            onChange={(e) => updateListItem('testimonials', 'testimonials', index, { rating: parseInt(e.target.value) })}
                          />
                        </div>
                        <div>
                          <Label>Avatar (URL)</Label>
                          <Input
                            value={testimonial.avatar}
                            onChange={(e) => updateListItem('testimonials', 'testimonials', index, { avatar: e.target.value })}
                            placeholder="https://..."
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label>Depoimento</Label>
                          <Textarea
                            value={testimonial.text}
                            onChange={(e) => updateListItem('testimonials', 'testimonials', index, { text: e.target.value })}
                            rows={3}
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cores da seção */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Cores da Seção
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Cor de Fundo</Label>
                    <Input
                      type="color"
                      value={config.backgroundColor}
                      onChange={(e) => updateSectionConfig('testimonials', { backgroundColor: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Cor do Texto</Label>
                    <Input
                      type="color"
                      value={config.textColor}
                      onChange={(e) => updateSectionConfig('testimonials', { textColor: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-6">
            {/* Textos da seção */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Type className="w-4 h-4" />
                  Textos da Seção
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="contact-title">Título</Label>
                  <Input
                    id="contact-title"
                    value={config.title}
                    onChange={(e) => updateSectionConfig('contact', { title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="contact-subtitle">Subtítulo</Label>
                  <Input
                    id="contact-subtitle"
                    value={config.subtitle}
                    onChange={(e) => updateSectionConfig('contact', { subtitle: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="contact-description">Descrição</Label>
                  <Textarea
                    id="contact-description"
                    value={config.description}
                    onChange={(e) => updateSectionConfig('contact', { description: e.target.value })}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Informações de Contato */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Informações de Contato
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="contact-email">Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={config.contactInfo?.email || ''}
                    onChange={(e) => updateSectionConfig('contact', {
                      contactInfo: { ...config.contactInfo, email: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="contact-phone">Telefone</Label>
                  <Input
                    id="contact-phone"
                    value={config.contactInfo?.phone || ''}
                    onChange={(e) => updateSectionConfig('contact', {
                      contactInfo: { ...config.contactInfo, phone: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="contact-address">Endereço</Label>
                  <Input
                    id="contact-address"
                    value={config.contactInfo?.address || ''}
                    onChange={(e) => updateSectionConfig('contact', {
                      contactInfo: { ...config.contactInfo, address: e.target.value }
                    })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Cores da seção */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Cores da Seção
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Cor de Fundo</Label>
                    <Input
                      type="color"
                      value={config.backgroundColor}
                      onChange={(e) => updateSectionConfig('contact', { backgroundColor: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Cor do Texto</Label>
                    <Input
                      type="color"
                      value={config.textColor}
                      onChange={(e) => updateSectionConfig('contact', { textColor: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-6">
            {/* Textos da seção */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Type className="w-4 h-4" />
                  Textos da Seção
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="projects-title">Título</Label>
                  <Input
                    id="projects-title"
                    value={config.title}
                    onChange={(e) => updateSectionConfig('projects', { title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="projects-subtitle">Subtítulo</Label>
                  <Input
                    id="projects-subtitle"
                    value={config.subtitle}
                    onChange={(e) => updateSectionConfig('projects', { subtitle: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Configurações de Exibição */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Configurações de Exibição
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    id="projects-show-all"
                    type="checkbox"
                    checked={config.showAll}
                    onChange={(e) => updateSectionConfig('projects', { showAll: e.target.checked })}
                    className="rounded"
                  />
                  <Label htmlFor="projects-show-all">Mostrar todos os projetos</Label>
                </div>
                {!config.showAll && (
                  <div>
                    <Label htmlFor="projects-max-items">Máximo de itens</Label>
                    <Input
                      id="projects-max-items"
                      type="number"
                      min="1"
                      max="20"
                      value={config.maxItems}
                      onChange={(e) => updateSectionConfig('projects', { maxItems: parseInt(e.target.value) })}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Cores da seção */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Cores da Seção
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Cor de Fundo</Label>
                    <Input
                      type="color"
                      value={config.backgroundColor}
                      onChange={(e) => updateSectionConfig('projects', { backgroundColor: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Cor do Texto</Label>
                    <Input
                      type="color"
                      value={config.textColor}
                      onChange={(e) => updateSectionConfig('projects', { textColor: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
              </CardContent>
            </Card>

            {/* Botões */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Botões de Ação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Botão Primário</Label>
                    <div className="space-y-2">
                      <Input
                        value={config.primaryButton.text}
                        onChange={(e) => updateSectionConfig('hero', {
                          primaryButton: { ...config.primaryButton, text: e.target.value }
                        })}
                        placeholder="Texto do botão"
                      />
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={config.primaryButton.color}
                          onChange={(e) => updateSectionConfig('hero', {
                            primaryButton: { ...config.primaryButton, color: e.target.value }
                          })}
                          className="w-16"
                        />
                        <Input
                          type="color"
                          value={config.primaryButton.hoverColor}
                          onChange={(e) => updateSectionConfig('hero', {
                            primaryButton: { ...config.primaryButton, hoverColor: e.target.value }
                          })}
                          className="w-16"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label>Botão Secundário</Label>
                    <div className="space-y-2">
                      <Input
                        value={config.secondaryButton.text}
                        onChange={(e) => updateSectionConfig('hero', {
                          secondaryButton: { ...config.secondaryButton, text: e.target.value }
                        })}
                        placeholder="Texto do botão"
                      />
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={config.secondaryButton.color}
                          onChange={(e) => updateSectionConfig('hero', {
                            secondaryButton: { ...config.secondaryButton, color: e.target.value }
                          })}
                          className="w-16"
                        />
                        <Input
                          type="color"
                          value={config.secondaryButton.hoverColor}
                          onChange={(e) => updateSectionConfig('hero', {
                            secondaryButton: { ...config.secondaryButton, hoverColor: e.target.value }
                          })}
                          className="w-16"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Background e Cores */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Cores e Background
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Label>Gradiente de Fundo</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <Label className="text-xs">De</Label>
                      <Input
                        type="color"
                        value={config.backgroundGradient.from}
                        onChange={(e) => updateSectionConfig('hero', {
                          backgroundGradient: { ...config.backgroundGradient, from: e.target.value }
                        })}
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Via</Label>
                      <Input
                        type="color"
                        value={config.backgroundGradient.via}
                        onChange={(e) => updateSectionConfig('hero', {
                          backgroundGradient: { ...config.backgroundGradient, via: e.target.value }
                        })}
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Para</Label>
                      <Input
                        type="color"
                        value={config.backgroundGradient.to}
                        onChange={(e) => updateSectionConfig('hero', {
                          backgroundGradient: { ...config.backgroundGradient, to: e.target.value }
                        })}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'services':
        return (
          <div className="space-y-6">
            {/* Textos da seção */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Type className="w-4 h-4" />
                  Textos da Seção
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="services-title">Título</Label>
                  <Input
                    id="services-title"
                    value={config.title}
                    onChange={(e) => updateSectionConfig('services', { title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="services-subtitle">Subtítulo</Label>
                  <Input
                    id="services-subtitle"
                    value={config.subtitle}
                    onChange={(e) => updateSectionConfig('services', { subtitle: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Lista de Serviços */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 justify-between">
                  <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Serviços
                  </div>
                  <Button
                    size="sm"
                    onClick={() => addListItem('services', 'services', {
                      icon: '🔧',
                      title: 'Novo Serviço',
                      description: 'Descrição do serviço',
                      color: '#3b82f6'
                    })}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Adicionar
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {config.services?.map((service, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <Badge variant="outline">Serviço {index + 1}</Badge>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => removeListItem('services', 'services', index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <Label>Ícone (Emoji)</Label>
                          <Input
                            value={service.icon}
                            onChange={(e) => updateListItem('services', 'services', index, { icon: e.target.value })}
                            placeholder="🔧"
                          />
                        </div>
                        <div>
                          <Label>Cor</Label>
                          <Input
                            type="color"
                            value={service.color}
                            onChange={(e) => updateListItem('services', 'services', index, { color: e.target.value })}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label>Título</Label>
                          <Input
                            value={service.title}
                            onChange={(e) => updateListItem('services', 'services', index, { title: e.target.value })}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label>Descrição</Label>
                          <Textarea
                            value={service.description}
                            onChange={(e) => updateListItem('services', 'services', index, { description: e.target.value })}
                            rows={2}
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cores da seção */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Cores da Seção
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Cor de Fundo</Label>
                    <Input
                      type="color"
                      value={config.backgroundColor}
                      onChange={(e) => updateSectionConfig('services', { backgroundColor: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Cor do Texto</Label>
                    <Input
                      type="color"
                      value={config.textColor}
                      onChange={(e) => updateSectionConfig('services', { textColor: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">
                Configurações para a seção "{section.name}" em desenvolvimento.
              </p>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Editar Landing Page</h1>
          <p className="text-muted-foreground">
            Configure todas as seções da sua landing page
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Resetar
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Salvar
          </Button>
        </div>
      </div>

      {/* Tabs das seções */}
      <Tabs value={activeSection} onValueChange={setActiveSection}>
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          {Object.entries(sections).map(([key, section]) => (
            <TabsTrigger key={key} value={key} className="text-xs">
              {section.enabled ? (
                <Eye className="w-3 h-3 mr-1" />
              ) : (
                <EyeOff className="w-3 h-3 mr-1" />
              )}
              {section.name.split(' ')[0]}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(sections).map(([key, section]) => (
          <TabsContent key={key} value={key} className="space-y-6">
            {/* Controles da seção */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Layout className="w-5 h-5" />
                      {section.name}
                    </CardTitle>
                    <CardDescription>
                      Configure os elementos desta seção
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`${key}-enabled`}>Ativa</Label>
                    <input
                      id={`${key}-enabled`}
                      type="checkbox"
                      checked={section.enabled}
                      onChange={(e) => updateSection(key, { enabled: e.target.checked })}
                      className="rounded"
                    />
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Configurações específicas da seção */}
            {section.enabled && renderSectionConfig(section)}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default EditLandingPageContent;