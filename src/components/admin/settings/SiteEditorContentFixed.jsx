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
  Clock,
  CheckCircle,
  Upload,
  ExternalLink,
  Camera
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

  // Estados para editores específicos
  const [activeCase, setActiveCase] = useState(0);
  const [newCategory, setNewCategory] = useState({ name: '', icon: '', color: '' });
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Função para carregar dados salvos
  const loadSavedData = () => {
    try {
      const heroData = JSON.parse(localStorage.getItem('heroData') || '{}');
      const aboutData = JSON.parse(localStorage.getItem('aboutData') || '{}');
      const servicesData = JSON.parse(localStorage.getItem('servicesData') || '{}');
      const casesData = JSON.parse(localStorage.getItem('casesData') || '{}');
      const testimonialsData = JSON.parse(localStorage.getItem('testimonialsData') || '{}');
      const contactData = JSON.parse(localStorage.getItem('contactData') || '{}');

      const defaultData = {
        hero: {
          title: 'Transforme Suas Ideias em Realidade Digital',
          subtitle: 'Criamos soluções tecnológicas inovadoras para acelerar o crescimento do seu negócio',
          description: 'Somos especialistas em desenvolvimento web, aplicativos móveis e estratégias digitais que conectam sua marca ao futuro.',
          buttons: {
            primary: { text: 'Começar Projeto', link: '#contato' },
            secondary: { text: 'Ver Portfolio', link: '#portfolio' }
          },
          features: [
            'Desenvolvimento Web Moderno',
            'Aplicativos Mobile Nativos',
            'Consultoria em Transformação Digital'
          ]
        },
        about: {
          title: 'Sobre Nossa Empresa',
          description: 'Com anos de experiência no mercado digital, somos apaixonados por criar soluções que fazem a diferença.',
          metrics: [
            { label: 'Projetos Entregues', value: '150+' },
            { label: 'Clientes Satisfeitos', value: '100+' },
            { label: 'Anos de Experiência', value: '8+' }
          ]
        },
        services: {
          title: 'Nossos Serviços',
          items: [
            {
              title: 'Desenvolvimento Web',
              description: 'Sites e aplicações web modernas e responsivas',
              icon: 'Code'
            },
            {
              title: 'Apps Mobile',
              description: 'Aplicativos nativos para iOS e Android',
              icon: 'Smartphone'
            },
            {
              title: 'Consultoria Digital',
              description: 'Estratégias para transformação digital',
              icon: 'Brain'
            }
          ]
        },
        cases: {
          title: 'Casos de Sucesso',
          categories: [
            { name: 'E-commerce', icon: '🛒', color: '#10B981' },
            { name: 'SaaS', icon: '☁️', color: '#3B82F6' },
            { name: 'Mobile App', icon: '📱', color: '#8B5CF6' },
            { name: 'Website', icon: '🌐', color: '#F59E0B' }
          ],
          items: [
            {
              id: 1,
              title: 'Plataforma de E-commerce Moderna',
              description: 'Desenvolvimento de uma plataforma completa de vendas online com integração de pagamentos e gestão de estoque.',
              image: '',
              category: 'E-commerce',
              badges: ['React', 'Node.js', 'MongoDB'],
              link: 'https://exemplo.com',
              results: 'Aumento de 300% nas vendas online'
            },
            {
              id: 2,
              title: 'App de Delivery Personalizado',
              description: 'Aplicativo mobile para delivery com sistema de pedidos em tempo real e rastreamento GPS.',
              image: '',
              category: 'Mobile App',
              badges: ['React Native', 'Firebase', 'GPS'],
              link: 'https://exemplo.com',
              results: 'Mais de 10.000 downloads'
            }
          ]
        },
        testimonials: {
          title: 'O que nossos clientes dizem',
          items: [
            {
              id: 1,
              name: 'João Silva',
              role: 'CEO, TechCorp',
              text: 'Trabalho excepcional! A equipe entregou exatamente o que precisávamos.',
              avatar: '',
              rating: 5,
              company: 'TechCorp'
            },
            {
              id: 2,
              name: 'Maria Santos',
              role: 'Diretora, InnovateNow',
              text: 'Profissionais competentes e dedicados. Recomendo fortemente!',
              avatar: '',
              rating: 5,
              company: 'InnovateNow'
            }
          ]
        },
        contact: {
          title: 'Entre em Contato',
          subtitle: 'Vamos conversar sobre seu projeto',
          whyChoose: {
            title: 'Por que escolher nossa empresa?',
            items: [
              { icon: '⚡', title: 'Entrega Rápida', description: 'Projetos entregues no prazo acordado' },
              { icon: '🎯', title: 'Foco em Resultados', description: 'Soluções que geram valor real para seu negócio' },
              { icon: '🚀', title: 'Tecnologia Moderna', description: 'Utilizamos as melhores práticas e tecnologias' },
              { icon: '🤝', title: 'Suporte Contínuo', description: 'Acompanhamento após a entrega do projeto' }
            ]
          },
          form: {
            title: 'Solicite um Orçamento',
            fields: {
              name: { label: 'Nome Completo', placeholder: 'Digite seu nome', required: true },
              email: { label: 'E-mail', placeholder: 'seu@email.com', required: true },
              phone: { label: 'Telefone', placeholder: '(11) 99999-9999', required: false },
              company: { label: 'Empresa', placeholder: 'Nome da sua empresa', required: false },
              service: { 
                label: 'Serviço de Interesse', 
                type: 'select',
                options: ['Desenvolvimento Web', 'App Mobile', 'Consultoria', 'E-commerce', 'Outro'],
                required: true 
              },
              budget: { 
                label: 'Orçamento Estimado', 
                type: 'select',
                options: ['Até R$ 5.000', 'R$ 5.000 - R$ 15.000', 'R$ 15.000 - R$ 50.000', 'Acima de R$ 50.000'],
                required: false 
              },
              timeline: { 
                label: 'Prazo Desejado', 
                type: 'select',
                options: ['Até 1 mês', '1-3 meses', '3-6 meses', 'Mais de 6 meses'],
                required: false 
              },
              message: { label: 'Descrição do Projeto', placeholder: 'Conte-nos mais sobre seu projeto...', required: true, type: 'textarea' }
            },
            submitText: 'Enviar Solicitação',
            successMessage: 'Mensagem enviada com sucesso! Entraremos em contato em breve.'
          },
          services: [
            { icon: '💻', title: 'Desenvolvimento Web', description: 'Sites e sistemas web modernos' },
            { icon: '📱', title: 'Apps Mobile', description: 'Aplicativos para iOS e Android' },
            { icon: '🛒', title: 'E-commerce', description: 'Lojas virtuais completas' },
            { icon: '☁️', title: 'Cloud & DevOps', description: 'Infraestrutura e deploy' }
          ]
        }
      };

      const mergedData = {
        hero: { ...defaultData.hero, ...heroData },
        about: { ...defaultData.about, ...aboutData },
        services: { ...defaultData.services, ...servicesData },
        cases: { ...defaultData.cases, ...casesData },
        testimonials: { ...defaultData.testimonials, ...testimonialsData },
        contact: { ...defaultData.contact, ...contactData }
      };

      setSiteData(mergedData);
      setIsLoading(false);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setError('Erro ao carregar dados salvos');
      setIsLoading(false);
    }
  };

  // Função para atualizar dados
  const updateSiteData = (section, newData) => {
    setSiteData(prev => ({
      ...prev,
      [section]: newData
    }));
    setHasUnsavedChanges(true);
  };

  // Função para salvar no localStorage
  const handleSave = () => {
    try {
      Object.keys(siteData).forEach(section => {
        localStorage.setItem(`${section}Data`, JSON.stringify(siteData[section]));
      });
      setHasUnsavedChanges(false);
      setLastSaved(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Erro ao salvar:', error);
      setError('Erro ao salvar dados');
    }
  };

  useEffect(() => {
    loadSavedData();
  }, []);

  // Função para upload de imagem
  const handleImageUpload = (callback) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => callback(e.target.result);
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  // Componente para avaliação com estrelas
  const StarRating = ({ rating, onRatingChange, editable = false }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-300'
            } ${editable ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={editable ? () => onRatingChange(star) : undefined}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">({rating}/5)</span>
      </div>
    );
  };

  // Editor de casos de sucesso
  const renderCasesEditor = () => {
    const cases = siteData?.cases || {};
    const categories = cases.categories || [];
    const items = cases.items || [];

    const addCategory = () => {
      if (newCategory.name.trim()) {
        const updatedCategories = [...categories, { ...newCategory, id: Date.now() }];
        updateSiteData('cases', { ...cases, categories: updatedCategories });
        setNewCategory({ name: '', icon: '', color: '' });
        setShowAddCategory(false);
      }
    };

    const removeCategory = (index) => {
      const updatedCategories = categories.filter((_, i) => i !== index);
      updateSiteData('cases', { ...cases, categories: updatedCategories });
    };

    const addCase = () => {
      const newCase = {
        id: Date.now(),
        title: 'Novo Caso de Sucesso',
        description: 'Descrição do caso...',
        image: '',
        category: categories[0]?.name || '',
        badges: [],
        link: '',
        results: ''
      };
      const updatedItems = [...items, newCase];
      updateSiteData('cases', { ...cases, items: updatedItems });
      setActiveCase(items.length);
    };

    const removeCase = (index) => {
      const updatedItems = items.filter((_, i) => i !== index);
      updateSiteData('cases', { ...cases, items: updatedItems });
      setActiveCase(Math.max(0, Math.min(activeCase, updatedItems.length - 1)));
    };

    const updateCase = (field, value) => {
      const updatedItems = [...items];
      updatedItems[activeCase] = { ...updatedItems[activeCase], [field]: value };
      updateSiteData('cases', { ...cases, items: updatedItems });
    };

    const addBadge = () => {
      const newBadge = prompt('Digite o texto da badge:');
      if (newBadge && newBadge.trim()) {
        const currentBadges = items[activeCase]?.badges || [];
        updateCase('badges', [...currentBadges, newBadge.trim()]);
      }
    };

    const removeBadge = (badgeIndex) => {
      const currentBadges = items[activeCase]?.badges || [];
      const updatedBadges = currentBadges.filter((_, i) => i !== badgeIndex);
      updateCase('badges', updatedBadges);
    };

    return (
      <div className="space-y-6">
        {/* Título da seção */}
        <div>
          <label className="block text-sm font-medium mb-2">Título da Seção</label>
          <Input
            value={cases.title || ''}
            onChange={(e) => updateSiteData('cases', { ...cases, title: e.target.value })}
            placeholder="Título da seção de casos"
          />
        </div>

        {/* Gerenciamento de categorias */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Categorias</span>
              <Button onClick={() => setShowAddCategory(!showAddCategory)} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Nova Categoria
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {showAddCategory && (
              <div className="mb-4 p-4 border rounded-lg bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <Input
                    placeholder="Nome da categoria"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  />
                  <Input
                    placeholder="Emoji/Ícone"
                    value={newCategory.icon}
                    onChange={(e) => setNewCategory({ ...newCategory, icon: e.target.value })}
                  />
                  <Input
                    type="color"
                    placeholder="Cor"
                    value={newCategory.color}
                    onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={addCategory} size="sm">Adicionar</Button>
                  <Button variant="outline" onClick={() => setShowAddCategory(false)} size="sm">
                    Cancelar
                  </Button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {categories.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <span style={{ color: category.color }}>{category.icon}</span>
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCategory(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Lista de casos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Casos ({items.length})</span>
                <Button onClick={addCase} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      activeCase === index ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveCase(index)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium truncate">{item.title}</h4>
                        <p className="text-sm text-gray-500">{item.category}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeCase(index);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Editor do caso atual */}
          {items.length > 0 && (
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Editando: {items[activeCase]?.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Título</label>
                    <Input
                      value={items[activeCase]?.title || ''}
                      onChange={(e) => updateCase('title', e.target.value)}
                      placeholder="Título do caso"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Descrição</label>
                    <Textarea
                      value={items[activeCase]?.description || ''}
                      onChange={(e) => updateCase('description', e.target.value)}
                      placeholder="Descrição do caso"
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Categoria</label>
                      <select
                        value={items[activeCase]?.category || ''}
                        onChange={(e) => updateCase('category', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        {categories.map((cat, index) => (
                          <option key={index} value={cat.name}>{cat.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Link do Projeto</label>
                      <Input
                        value={items[activeCase]?.link || ''}
                        onChange={(e) => updateCase('link', e.target.value)}
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Resultados Obtidos</label>
                    <Input
                      value={items[activeCase]?.results || ''}
                      onChange={(e) => updateCase('results', e.target.value)}
                      placeholder="Ex: Aumento de 300% nas vendas"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Imagem</label>
                    <div className="flex items-center gap-4">
                      <Button
                        variant="outline"
                        onClick={() => handleImageUpload((imageData) => updateCase('image', imageData))}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Carregar Imagem
                      </Button>
                      {items[activeCase]?.image && (
                        <div className="flex items-center gap-2">
                          <img 
                            src={items[activeCase].image} 
                            alt="Preview" 
                            className="w-16 h-16 object-cover rounded border"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateCase('image', '')}
                            className="text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium">Badges/Tecnologias</label>
                      <Button onClick={addBadge} size="sm" variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        Adicionar Badge
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(items[activeCase]?.badges || []).map((badge, badgeIndex) => (
                        <Badge 
                          key={badgeIndex} 
                          variant="secondary" 
                          className="flex items-center gap-1"
                        >
                          {badge}
                          <button
                            onClick={() => removeBadge(badgeIndex)}
                            className="ml-1 text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Editor de depoimentos
  const renderTestimonialsEditor = () => {
    const testimonials = siteData?.testimonials || {};
    const items = testimonials.items || [];

    const addTestimonial = () => {
      const newTestimonial = {
        id: Date.now(),
        name: 'Nome do Cliente',
        role: 'Cargo',
        company: 'Empresa',
        text: 'Depoimento do cliente...',
        avatar: '',
        rating: 5
      };
      const updatedItems = [...items, newTestimonial];
      updateSiteData('testimonials', { ...testimonials, items: updatedItems });
      setActiveTestimonial(items.length);
    };

    const removeTestimonial = (index) => {
      const updatedItems = items.filter((_, i) => i !== index);
      updateSiteData('testimonials', { ...testimonials, items: updatedItems });
      setActiveTestimonial(Math.max(0, Math.min(activeTestimonial, updatedItems.length - 1)));
    };

    const updateTestimonial = (field, value) => {
      const updatedItems = [...items];
      updatedItems[activeTestimonial] = { ...updatedItems[activeTestimonial], [field]: value };
      updateSiteData('testimonials', { ...testimonials, items: updatedItems });
    };

    return (
      <div className="space-y-6">
        {/* Título da seção */}
        <div>
          <label className="block text-sm font-medium mb-2">Título da Seção</label>
          <Input
            value={testimonials.title || ''}
            onChange={(e) => updateSiteData('testimonials', { ...testimonials, title: e.target.value })}
            placeholder="Título da seção de depoimentos"
          />
        </div>

        {/* Lista de depoimentos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Depoimentos ({items.length})</span>
                <Button onClick={addTestimonial} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      activeTestimonial === index ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveTestimonial(index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {item.avatar ? (
                          <img 
                            src={item.avatar} 
                            alt={item.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <Users className="w-5 h-5 text-gray-500" />
                          </div>
                        )}
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-500">{item.company}</p>
                          <StarRating rating={item.rating} />
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeTestimonial(index);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Editor do depoimento atual */}
          {items.length > 0 && (
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Editando: {items[activeTestimonial]?.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Nome do Cliente</label>
                      <Input
                        value={items[activeTestimonial]?.name || ''}
                        onChange={(e) => updateTestimonial('name', e.target.value)}
                        placeholder="Nome completo"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Cargo</label>
                      <Input
                        value={items[activeTestimonial]?.role || ''}
                        onChange={(e) => updateTestimonial('role', e.target.value)}
                        placeholder="CEO, Diretor, etc."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Empresa</label>
                    <Input
                      value={items[activeTestimonial]?.company || ''}
                      onChange={(e) => updateTestimonial('company', e.target.value)}
                      placeholder="Nome da empresa"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Depoimento</label>
                    <Textarea
                      value={items[activeTestimonial]?.text || ''}
                      onChange={(e) => updateTestimonial('text', e.target.value)}
                      placeholder="O que o cliente tem a dizer sobre nosso trabalho..."
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Avaliação</label>
                    <StarRating
                      rating={items[activeTestimonial]?.rating || 5}
                      onRatingChange={(rating) => updateTestimonial('rating', rating)}
                      editable={true}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Foto do Cliente</label>
                    <div className="flex items-center gap-4">
                      <Button
                        variant="outline"
                        onClick={() => handleImageUpload((imageData) => updateTestimonial('avatar', imageData))}
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        Carregar Foto
                      </Button>
                      {items[activeTestimonial]?.avatar && (
                        <div className="flex items-center gap-2">
                          <img 
                            src={items[activeTestimonial].avatar} 
                            alt="Preview" 
                            className="w-16 h-16 object-cover rounded-full border"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateTestimonial('avatar', '')}
                            className="text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderCasesEditor = () => {
    if (!siteData?.cases) {
      // Inicializar dados dos casos se não existirem
      const defaultCasesData = {
        title: 'Casos de Sucesso Comprovados',
        subtitle: 'Projetos que transformaram negócios e geraram resultados extraordinários.',
        items: [
          {
            id: 1,
            title: 'E-commerce Inteligente',
            company: 'Fashion Store',
            description: 'Plataforma de e-commerce com recomendações por IA.',
            technologies: ['React', 'Node.js', 'Python', 'TensorFlow'],
            results: ['150% aumento nas vendas', '80% redução no tempo de busca'],
            image: '/api/placeholder/600/400',
            category: 'E-commerce'
          }
        ]
      };
      
      updateSiteData('cases', defaultCasesData);
      return <div>Inicializando dados dos casos de sucesso...</div>;
    }
    
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Título da Seção</label>
          <Input
            value={siteData.cases.title || ''}
            onChange={(e) => updateSiteData('cases', { 
              ...siteData.cases, 
              title: e.target.value 
            })}
            placeholder="Título da seção casos de sucesso"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Subtítulo</label>
          <Textarea
            value={siteData.cases.subtitle || ''}
            onChange={(e) => updateSiteData('cases', { 
              ...siteData.cases, 
              subtitle: e.target.value 
            })}
            placeholder="Subtítulo da seção"
            rows={2}
          />
        </div>

        <div>
          <p className="text-sm text-gray-600">
            Editor de casos em desenvolvimento. Total de casos: {(siteData.cases.items || []).length}
          </p>
        </div>
      </div>
    );
  };

  const renderTestimonialsEditor = () => {
      // Inicializar dados dos casos se não existirem
      const defaultCasesData = {
        title: 'Casos de Sucesso Comprovados',
        subtitle: 'Projetos que transformaram negócios e geraram resultados extraordinários.',
        items: [
          {
            id: 1,
            title: 'E-commerce Inteligente',
            company: 'Fashion Store',
            description: 'Plataforma de e-commerce com recomendações por IA.',
            technologies: ['React', 'Node.js', 'Python', 'TensorFlow'],
            results: ['150% aumento nas vendas', '80% redução no tempo de busca'],
            image: '/api/placeholder/600/400',
            category: 'E-commerce'
          }
        ]
      };
      
      updateSiteData('cases', defaultCasesData);
      return <div>Inicializando dados dos casos de sucesso...</div>;
    }
    
    const cases = siteData.cases.items || [];
    
    return (
      <div className="space-y-6">
        {/* Informações gerais */}
        <Card>
          <CardHeader>
            <CardTitle>Informações Gerais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Título Principal</label>
              <Input
                value={contact.title || ''}
                onChange={(e) => updateContactField(null, 'title', e.target.value)}
                placeholder="Entre em Contato"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Subtítulo</label>
              <Input
                value={contact.subtitle || ''}
                onChange={(e) => updateContactField(null, 'subtitle', e.target.value)}
                placeholder="Vamos conversar sobre seu projeto"
              />
            </div>
          </CardContent>
        </Card>

        {/* Por que escolher nossa empresa */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Por que nos escolher?</span>
              <Button onClick={addWhyChooseItem} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Item
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Título da Seção</label>
              <Input
                value={contact.whyChoose?.title || ''}
                onChange={(e) => updateContactField('whyChoose', 'title', e.target.value)}
                placeholder="Por que escolher nossa empresa?"
              />
            </div>

            <div className="space-y-3">
              {(contact.whyChoose?.items || []).map((item, index) => (
                <div key={index} className="p-4 border rounded-lg bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Item {index + 1}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeWhyChooseItem(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">Ícone</label>
                      <Input
                        value={item.icon || ''}
                        onChange={(e) => updateWhyChooseItem(index, 'icon', e.target.value)}
                        placeholder="⚡"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Título</label>
                      <Input
                        value={item.title || ''}
                        onChange={(e) => updateWhyChooseItem(index, 'title', e.target.value)}
                        placeholder="Título do benefício"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Descrição</label>
                      <Input
                        value={item.description || ''}
                        onChange={(e) => updateWhyChooseItem(index, 'description', e.target.value)}
                        placeholder="Descrição do benefício"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Formulário de contato */}
        <Card>
          <CardHeader>
            <CardTitle>Configurações do Formulário</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Título do Formulário</label>
              <Input
                value={contact.form?.title || ''}
                onChange={(e) => updateContactField('form', 'title', e.target.value)}
                placeholder="Solicite um Orçamento"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Texto do Botão</label>
              <Input
                value={contact.form?.submitText || ''}
                onChange={(e) => updateContactField('form', 'submitText', e.target.value)}
                placeholder="Enviar Solicitação"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Mensagem de Sucesso</label>
              <Textarea
                value={contact.form?.successMessage || ''}
                onChange={(e) => updateContactField('form', 'successMessage', e.target.value)}
                placeholder="Mensagem enviada com sucesso!"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Serviços */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Nossos Serviços</span>
              <Button onClick={addService} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Serviço
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {(contact.services || []).map((service, index) => (
                <div key={index} className="p-4 border rounded-lg bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Serviço {index + 1}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeService(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">Ícone</label>
                      <Input
                        value={service.icon || ''}
                        onChange={(e) => updateService(index, 'icon', e.target.value)}
                        placeholder="💻"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Título</label>
                      <Input
                        value={service.title || ''}
                        onChange={(e) => updateService(index, 'title', e.target.value)}
                        placeholder="Nome do serviço"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Descrição</label>
                      <Input
                        value={service.description || ''}
                        onChange={(e) => updateService(index, 'description', e.target.value)}
                        placeholder="Descrição do serviço"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderHeroEditor = () => {
    const hero = siteData?.hero || {};
    
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Título Principal</label>
          <Input
            value={hero.title || ''}
            onChange={(e) => updateSiteData('hero', { ...hero, title: e.target.value })}
            placeholder="Título da página"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Subtítulo</label>
          <Input
            value={hero.subtitle || ''}
            onChange={(e) => updateSiteData('hero', { ...hero, subtitle: e.target.value })}
            placeholder="Subtítulo"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Descrição</label>
          <Textarea
            value={hero.description || ''}
            onChange={(e) => updateSiteData('hero', { ...hero, description: e.target.value })}
            placeholder="Descrição detalhada"
            rows={4}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Botão Primário - Texto</label>
            <Input
              value={hero.buttons?.primary?.text || ''}
              onChange={(e) => updateSiteData('hero', {
                ...hero,
                buttons: {
                  ...hero.buttons,
                  primary: { ...hero.buttons?.primary, text: e.target.value }
                }
              })}
              placeholder="Texto do botão"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Botão Primário - Link</label>
            <Input
              value={hero.buttons?.primary?.link || ''}
              onChange={(e) => updateSiteData('hero', {
                ...hero,
                buttons: {
                  ...hero.buttons,
                  primary: { ...hero.buttons?.primary, link: e.target.value }
                }
              })}
              placeholder="#contato"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Botão Secundário - Texto</label>
            <Input
              value={hero.buttons?.secondary?.text || ''}
              onChange={(e) => updateSiteData('hero', {
                ...hero,
                buttons: {
                  ...hero.buttons,
                  secondary: { ...hero.buttons?.secondary, text: e.target.value }
                }
              })}
              placeholder="Texto do botão secundário"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Botão Secundário - Link</label>
            <Input
              value={hero.buttons?.secondary?.link || ''}
              onChange={(e) => updateSiteData('hero', {
                ...hero,
                buttons: {
                  ...hero.buttons,
                  secondary: { ...hero.buttons?.secondary, link: e.target.value }
                }
              })}
              placeholder="#portfolio"
            />
          </div>
        </div>
      </div>
    );
  };

  const renderAboutEditor = () => {
    const about = siteData?.about || {};
    
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Título</label>
          <Input
            value={about.title || ''}
            onChange={(e) => updateSiteData('about', { ...about, title: e.target.value })}
            placeholder="Título da seção sobre"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Descrição</label>
          <Textarea
            value={about.description || ''}
            onChange={(e) => updateSiteData('about', { ...about, description: e.target.value })}
            placeholder="Descrição da empresa"
            rows={4}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-4">Métricas</label>
          {(about.metrics || []).map((metric, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 border rounded">
              <div>
                <label className="block text-sm font-medium mb-1">Label</label>
                <Input
                  value={metric.label || ''}
                  onChange={(e) => {
                    const newMetrics = [...(about.metrics || [])];
                    newMetrics[index] = { ...newMetrics[index], label: e.target.value };
                    updateSiteData('about', { ...about, metrics: newMetrics });
                  }}
                  placeholder="Projetos Entregues"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Valor</label>
                <Input
                  value={metric.value || ''}
                  onChange={(e) => {
                    const newMetrics = [...(about.metrics || [])];
                    newMetrics[index] = { ...newMetrics[index], value: e.target.value };
                    updateSiteData('about', { ...about, metrics: newMetrics });
                  }}
                  placeholder="150+"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderServicesEditor = () => {
    const services = siteData?.services || {};
    
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Título</label>
          <Input
            value={services.title || ''}
            onChange={(e) => updateSiteData('services', { ...services, title: e.target.value })}
            placeholder="Título da seção de serviços"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-4">Serviços</label>
          {(services.items || []).map((service, index) => (
            <div key={index} className="p-4 border rounded mb-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Título</label>
                  <Input
                    value={service.title || ''}
                    onChange={(e) => {
                      const newItems = [...(services.items || [])];
                      newItems[index] = { ...newItems[index], title: e.target.value };
                      updateSiteData('services', { ...services, items: newItems });
                    }}
                    placeholder="Nome do serviço"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Descrição</label>
                  <Input
                    value={service.description || ''}
                    onChange={(e) => {
                      const newItems = [...(services.items || [])];
                      newItems[index] = { ...newItems[index], description: e.target.value };
                      updateSiteData('services', { ...services, items: newItems });
                    }}
                    placeholder="Descrição do serviço"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Ícone</label>
                  <Input
                    value={service.icon || ''}
                    onChange={(e) => {
                      const newItems = [...(services.items || [])];
                      newItems[index] = { ...newItems[index], icon: e.target.value };
                      updateSiteData('services', { ...services, items: newItems });
                    }}
                    placeholder="Nome do ícone (Code, Smartphone, etc.)"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Carregando editor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">{error}</p>
        <Button onClick={loadSavedData} className="mt-2">
          Tentar Novamente
        </Button>
      </div>
    );
  }

  const sections = [
    { id: 'hero', name: 'Hero', icon: Layout },
    { id: 'about', name: 'Sobre', icon: Users },
    { id: 'services', name: 'Serviços', icon: Settings },
    { id: 'cases', name: 'Casos de Sucesso', icon: BarChart3 },
    { id: 'testimonials', name: 'Depoimentos', icon: MessageSquare },
    { id: 'contact', name: 'Contato', icon: Mail }
  ];

  const previewModes = [
    { id: 'desktop', name: 'Desktop', icon: Monitor },
    { id: 'tablet', name: 'Tablet', icon: Tablet },
    { id: 'mobile', name: 'Mobile', icon: Smartphone }
  ];

  return (
    <div className="h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Editor do Site</h1>
            {lastSaved && (
              <span className="text-sm text-gray-500">
                Último salvamento: {lastSaved}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            {/* Preview mode selector */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              {previewModes.map((mode) => {
                const IconComponent = mode.icon;
                return (
                  <button
                    key={mode.id}
                    onClick={() => setPreviewMode(mode.id)}
                    className={`p-2 rounded ${
                      previewMode === mode.id
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    title={mode.name}
                  >
                    <IconComponent className="w-4 h-4" />
                  </button>
                );
              })}
            </div>

            <Button
              onClick={handleSave}
              className={`${
                hasUnsavedChanges
                  ? 'bg-orange-600 hover:bg-orange-700'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              <Save className="w-4 h-4 mr-2" />
              {hasUnsavedChanges ? 'Salvar Alterações' : 'Salvo'}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4">
            <h2 className="font-semibold text-gray-900 mb-4">Seções</h2>
            <div className="space-y-2">
              {sections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeSection === section.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    {section.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Editar {sections.find(s => s.id === activeSection)?.name}
                </h2>
                <p className="text-gray-600">
                  Personalize o conteúdo desta seção do seu site.
                </p>
              </div>

              <Card>
                <CardContent className="p-6">
                  {activeSection === 'hero' && renderHeroEditor()}
                  {activeSection === 'about' && renderAboutEditor()}
                  {activeSection === 'services' && renderServicesEditor()}
                  {activeSection === 'cases' && renderCasesEditor()}
                  {activeSection === 'testimonials' && renderTestimonialsEditor()}
                  {activeSection === 'contact' && renderContactEditor()}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteEditorContent;
