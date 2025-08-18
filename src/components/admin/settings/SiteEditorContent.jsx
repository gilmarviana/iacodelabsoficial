import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Save, 
  Monitor, 
  Smartphone, 
  Tablet, 
  Eye, 
  Edit3,
  Plus,
  Trash2,
  Type,
  Image,
  Video,
  Mail,
  Grid,
  Navigation,
  MessageSquare,
  Star,
  Layout,
  Settings,
  Palette,
  Brain,
  Database,
  BarChart3,
  Shield,
  Zap,
  Code,
  Users,
  Clock
} from 'lucide-react';

const SiteEditorContent = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [editMode, setEditMode] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [previewMode, setPreviewMode] = useState('desktop');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [siteData, setSiteData] = useState(null);

  // Função para carregar dados salvos
  const loadSavedData = () => {
    try {
      const savedData = localStorage.getItem('siteEditorData');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        return parsedData;
      }
    } catch (error) {
      console.error('Erro ao carregar dados salvos:', error);
    }
    return null;
  };

  // Dados iniciais do site
  const getInitialSiteData = () => {
    const savedData = loadSavedData();
    if (savedData) {
      return savedData.siteData;
    }
    
    return {
      hero: {
        title: 'Inteligência Artificial Para o Seu Negócio',
        subtitle: 'Transformamos ideias em soluções digitais inovadoras. Especializados em desenvolvimento web, mobile e sistemas inteligentes com IA para impulsionar seu negócio.',
        primaryButtonText: 'Começar Projeto',
        secondaryButtonText: 'Ver Projetos',
        backgroundGradient: 'from-blue-50 via-background to-purple-50',
        statistics: [
          { number: '50+', label: 'Projetos Entregues' },
          { number: '100%', label: 'Cliente Satisfeito' },
          { number: '5+', label: 'Anos de Experiência' }
        ]
      },
      services: {
        title: 'Soluções Tecnológicas Completas',
        subtitle: 'Oferecemos um portfólio completo de serviços para transformar seu negócio com as mais avançadas tecnologias do mercado.',
        items: [
          {
            id: 1,
            icon: 'Brain',
            title: 'Desenvolvimento Web',
            description: 'Criamos sites modernos e responsivos utilizando as mais recentes tecnologias do mercado.',
            visible: true
          },
          {
            id: 2,
            icon: 'Smartphone',
            title: 'Aplicações Mobile',
            description: 'Desenvolvemos aplicativos nativos e híbridos para Android e iOS com alta performance.',
            visible: true
          },
          {
            id: 3,
            icon: 'Database',
            title: 'Inteligência Artificial',
            description: 'Implementamos soluções de IA personalizadas para automatizar e otimizar processos.',
            visible: true
          },
          {
            id: 4,
            icon: 'BarChart3',
            title: 'Análise de Dados',
            description: 'Transformamos dados em insights valiosos para decisões estratégicas do seu negócio.',
            visible: true
          },
          {
            id: 5,
            icon: 'Shield',
            title: 'Segurança Digital',
            description: 'Protegemos seus sistemas com as melhores práticas de segurança cibernética.',
            visible: true
          },
          {
            id: 6,
            icon: 'Zap',
            title: 'Automação de Processos',
            description: 'Automatizamos tarefas repetitivas para aumentar eficiência e reduzir custos.',
            visible: true
          }
        ]
      }
    };
  };

  // useEffect para inicialização
  useEffect(() => {
    const initializeData = () => {
      try {
        const data = getInitialSiteData();
        setSiteData(data);
        
        // Configurar lastSaved se há dados salvos
        const savedData = loadSavedData();
        if (savedData && savedData.lastSaved) {
          setLastSaved(new Date(savedData.lastSaved));
        }
      } catch (error) {
        console.error('Erro na inicialização:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);

  // Componentes disponíveis para adicionar
  const componentLibrary = [
    { id: 'hero', name: 'Hero Section', icon: Monitor, category: 'layout' },
    { id: 'text', name: 'Texto', icon: Type, category: 'content' },
    { id: 'image', name: 'Imagem', icon: Image, category: 'media' },
    { id: 'video', name: 'Vídeo', icon: Video, category: 'media' },
    { id: 'button', name: 'Botão', icon: Plus, category: 'interactive' },
    { id: 'form', name: 'Formulário', icon: Mail, category: 'interactive' },
    { id: 'grid', name: 'Grid Layout', icon: Grid, category: 'layout' },
    { id: 'navigation', name: 'Navegação', icon: Navigation, category: 'layout' },
    { id: 'testimonial', name: 'Depoimento', icon: MessageSquare, category: 'content' },
    { id: 'pricing', name: 'Preços', icon: Star, category: 'business' }
  ];

  // Função para salvar dados
  const saveAllChanges = () => {
    try {
      const dataToSave = {
        siteData: siteData,
        lastSaved: new Date().toISOString(),
        version: '1.0'
      };
      
      localStorage.setItem('siteEditorData', JSON.stringify(dataToSave));
      setHasUnsavedChanges(false);
      setLastSaved(new Date());
      
      // Disparar evento customizado para notificar outras partes da aplicação
      window.dispatchEvent(new CustomEvent('siteDataUpdated', { 
        detail: siteData 
      }));
      
      console.log('Dados salvos com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
    }
  };

  // Função para atualizar dados do site
  const updateSiteData = (section, data) => {
    setSiteData(prev => ({
      ...prev,
      [section]: data
    }));
    setHasUnsavedChanges(true);
  };

  // Função para atualizar serviço específico
  const updateService = (serviceId, updatedService) => {
    setSiteData(prev => ({
      ...prev,
      services: {
        ...prev.services,
        items: prev.services.items.map(item => 
          item.id === serviceId ? { ...item, ...updatedService } : item
        )
      }
    }));
    setHasUnsavedChanges(true);
  };

  // Função para adicionar novo serviço
  const addService = () => {
    const newService = {
      id: Date.now(),
      icon: 'Zap',
      title: 'Novo Serviço',
      description: 'Descrição do novo serviço',
      visible: true
    };
    
    setSiteData(prev => ({
      ...prev,
      services: {
        ...prev.services,
        items: [...prev.services.items, newService]
      }
    }));
    setHasUnsavedChanges(true);
  };

  // Função para remover serviço
  const removeService = (serviceId) => {
    setSiteData(prev => ({
      ...prev,
      services: {
        ...prev.services,
        items: prev.services.items.filter(item => item.id !== serviceId)
      }
    }));
    setHasUnsavedChanges(true);
  };

  // Seções disponíveis
  const sections = [
    { id: 'hero', name: 'Hero Section', icon: Layout },
    { id: 'services', name: 'Serviços', icon: Settings },
    { id: 'process', name: 'Processo', icon: Users },
    { id: 'about', name: 'Sobre', icon: MessageSquare },
    { id: 'contact', name: 'Contato', icon: Mail },
    { id: 'style', name: 'Estilo', icon: Palette }
  ];

  const renderPreviewModeButtons = () => (
    <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-lg">
      {[
        { mode: 'desktop', icon: Monitor },
        { mode: 'tablet', icon: Tablet },
        { mode: 'mobile', icon: Smartphone }
      ].map(({ mode, icon: Icon }) => (
        <Button
          key={mode}
          variant={previewMode === mode ? "default" : "ghost"}
          size="sm"
          onClick={() => setPreviewMode(mode)}
        >
          <Icon className="h-4 w-4" />
        </Button>
      ))}
    </div>
  );

  const renderHeroEditor = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Título Principal</label>
        <Input
          value={siteData.hero.title}
          onChange={(e) => updateSiteData('hero', { ...siteData.hero, title: e.target.value })}
          placeholder="Digite o título principal"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Subtítulo</label>
        <Textarea
          value={siteData.hero.subtitle}
          onChange={(e) => updateSiteData('hero', { ...siteData.hero, subtitle: e.target.value })}
          placeholder="Digite o subtítulo"
          rows={3}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Botão Principal</label>
          <Input
            value={siteData.hero.primaryButtonText}
            onChange={(e) => updateSiteData('hero', { ...siteData.hero, primaryButtonText: e.target.value })}
            placeholder="Texto do botão principal"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Botão Secundário</label>
          <Input
            value={siteData.hero.secondaryButtonText}
            onChange={(e) => updateSiteData('hero', { ...siteData.hero, secondaryButtonText: e.target.value })}
            placeholder="Texto do botão secundário"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Estatísticas</label>
        <div className="space-y-2">
          {siteData.hero.statistics.map((stat, index) => (
            <div key={index} className="grid grid-cols-2 gap-2">
              <Input
                value={stat.number}
                onChange={(e) => {
                  const newStats = [...siteData.hero.statistics];
                  newStats[index] = { ...newStats[index], number: e.target.value };
                  updateSiteData('hero', { ...siteData.hero, statistics: newStats });
                }}
                placeholder="Número"
              />
              <Input
                value={stat.label}
                onChange={(e) => {
                  const newStats = [...siteData.hero.statistics];
                  newStats[index] = { ...newStats[index], label: e.target.value };
                  updateSiteData('hero', { ...siteData.hero, statistics: newStats });
                }}
                placeholder="Label"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderServicesEditor = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Título da Seção</label>
        <Input
          value={siteData.services.title}
          onChange={(e) => updateSiteData('services', { 
            ...siteData.services, 
            title: e.target.value 
          })}
          placeholder="Título da seção de serviços"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Subtítulo</label>
        <Textarea
          value={siteData.services.subtitle}
          onChange={(e) => updateSiteData('services', { 
            ...siteData.services, 
            subtitle: e.target.value 
          })}
          placeholder="Subtítulo da seção"
          rows={2}
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Serviços</h3>
          <Button onClick={addService} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Serviço
          </Button>
        </div>
        
        <div className="space-y-4">
          {siteData.services.items.map((service) => (
            <Card key={service.id} className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Input
                      value={service.title}
                      onChange={(e) => updateService(service.id, { title: e.target.value })}
                      placeholder="Título do serviço"
                      className="font-medium"
                    />
                    <Badge variant={service.visible ? "default" : "secondary"}>
                      {service.visible ? "Visível" : "Oculto"}
                    </Badge>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeService(service.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <Textarea
                  value={service.description}
                  onChange={(e) => updateService(service.id, { description: e.target.value })}
                  placeholder="Descrição do serviço"
                  rows={2}
                />
                
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Ícone:</label>
                  <Input
                    value={service.icon}
                    onChange={(e) => updateService(service.id, { icon: e.target.value })}
                    placeholder="Nome do ícone"
                    className="w-32"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateService(service.id, { visible: !service.visible })}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    {service.visible ? "Ocultar" : "Mostrar"}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSectionContent = () => {
    try {
      switch (activeSection) {
        case 'hero':
          return renderHeroEditor();
        case 'services':
          return renderServicesEditor();
        default:
          return (
            <div className="text-center py-8">
              <p className="text-gray-500">Editor para a seção "{activeSection}" em desenvolvimento.</p>
            </div>
          );
      }
    } catch (error) {
      return (
        <div className="text-center py-8">
          <p className="text-red-500">Erro ao carregar editor: {error.message}</p>
        </div>
      );
    }
  };

  // Estados de loading e erro
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Carregando editor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Erro: {error}</p>
          <Button onClick={() => window.location.reload()}>
            Recarregar Página
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex">
      {/* Sidebar - Seções */}
      <div className="w-64 border-r bg-gray-50 p-4">
        <div className="space-y-2">
          <h3 className="font-medium text-gray-900 mb-4">Seções do Site</h3>
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Button
                key={section.id}
                variant={activeSection === section.id ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveSection(section.id)}
              >
                <Icon className="h-4 w-4 mr-2" />
                {section.name}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Editor Principal */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b p-4 flex justify-between items-center bg-white">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold">Editor de Site</h2>
            <Badge variant={hasUnsavedChanges ? "destructive" : "default"}>
              {hasUnsavedChanges ? "Alterações não salvas" : "Salvo"}
            </Badge>
            {lastSaved && (
              <span className="text-sm text-gray-500">
                Último salvamento: {lastSaved.toLocaleTimeString()}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {renderPreviewModeButtons()}
            <Button
              onClick={saveAllChanges}
              disabled={!hasUnsavedChanges}
              className="bg-green-600 hover:bg-green-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Salvar Tudo
            </Button>
          </div>
        </div>

        {/* Conteúdo do Editor */}
        <div className="flex-1 p-6 overflow-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Edit3 className="h-5 w-5" />
                Editando: {sections.find(s => s.id === activeSection)?.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderSectionContent()}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SiteEditorContent;
